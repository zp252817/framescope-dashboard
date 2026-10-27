import csv
import json
import re
import sys
from pathlib import Path

VERSIONS = ["1.2.0-07", "1.2.0-02", "1.1.0-13", "1.1.0-06", "0.5.0-28", "0.5.0-11", "0.4.0-23", "0.3.0-perf"]
METRICS = {
    "response": "响应时延(ms)",
    "completion": "完成时延(ms)",
    "averageMemory": "平均内存MB",
    "peakMemory": "峰值内存MB",
}


def number(value):
    value = value.strip().replace(",", "")
    if not value or value == "——":
        return None
    try:
        return float(value)
    except ValueError:
        return None


def indexed_value(row, header, prefix, version):
    aliases = [version, "0.3.0"] if version == "0.3.0-perf" else [version]
    for alias in aliases:
        exact = f"{prefix} {alias}"
        if exact in header:
            return number(row[header[exact]])
        pattern = re.compile(rf"^{re.escape(prefix)}[ (（]+{re.escape(alias)}[)）]?")
        for name, index in header.items():
            if pattern.match(name):
                return number(row[index])
    return None


def main(source, target):
    with open(source, encoding="utf-8") as stream:
        rows = list(csv.reader(stream, delimiter="\t"))
    header = {name: index for index, name in enumerate(rows[1])}
    records = []
    scenario = ""
    for source_row in rows[2:]:
        if len(source_row) < 5:
            continue
        scenario = source_row[0].strip() or scenario
        platform_label = source_row[1].strip()
        if not platform_label:
            continue
        if "自渲染" in platform_label:
            platform, render_mode = "harmony", "自渲染"
        elif "统一渲染" in platform_label:
            platform, render_mode = "harmony", "统一渲染"
        else:
            platform, render_mode = "ios", "默认"
        values = {}
        for version in VERSIONS:
            metrics = {}
            for key, prefix in METRICS.items():
                value = indexed_value(source_row, header, prefix, version)
                if value is not None:
                    metrics[key] = value
            for key, prefixes in {
                "presentFence": ["PresentFence FPS"],
                "rsFps": ["RS FPS"],
                "averageFps": ["平均帧率FPS"],
                "droppedFrames": ["丢帧率"],
                "stableMemory": ["后台稳定内存MB"],
                "appInstructions": ["指令数"],
                "renderInstructions": ["render_service指令数"],
            }.items():
                for prefix in prefixes:
                    value = indexed_value(source_row, header, prefix, version)
                    if value is not None:
                        metrics[key] = value
                        break
            if "droppedFrames" in metrics:
                metrics["droppedFrames"] /= 100
            if metrics:
                values[version] = metrics
        records.append({
            "id": f"scenario-{len(records) + 1}",
            "scenario": scenario,
            "platform": platform,
            "device": "Mate80Pro" if platform == "harmony" else "iOS",
            "renderMode": render_mode,
            "artifacts": {
                "kmp": source_row[2].strip(),
                "cmp": source_row[3].strip(),
                "skiko": source_row[4].strip(),
            },
            "values": values,
        })
    output = """export type Platform = 'harmony' | 'ios';\n\nexport interface MetricValues {\n  response?: number;\n  completion?: number;\n  presentFence?: number;\n  rsFps?: number;\n  averageFps?: number;\n  droppedFrames?: number;\n  averageMemory?: number;\n  peakMemory?: number;\n  stableMemory?: number;\n  appInstructions?: number;\n  renderInstructions?: number;\n}\n\nexport interface BenchmarkRecord {\n  id: string;\n  scenario: string;\n  platform: Platform;\n  device: string;\n  renderMode: string;\n  artifacts: { kmp: string; cmp: string; skiko: string };\n  values: Record<string, MetricValues>;\n}\n\nexport const versions = """ + json.dumps(VERSIONS, ensure_ascii=False) + ";\n\n"
    output += "export const latestVersion = versions[0];\n"
    output += "export const sourceUrl = 'https://docs.qq.com/sheet/DSkhGQUtZZWFFaWdB?tab=ckj1fz';\n\n"
    output += "export const records: BenchmarkRecord[] = " + json.dumps(records, ensure_ascii=False, indent=2) + ";\n"
    Path(target).write_text(output, encoding="utf-8")
    print(f"Imported {len(records)} records across {len(VERSIONS)} versions into {target}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
