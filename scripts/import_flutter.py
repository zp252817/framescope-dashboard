import csv
import json
import sys
from pathlib import Path

METRICS = {
    "averageBuild": "average_frame_build_time_millis",
    "p90Build": "90th_percentile_frame_build_time_millis",
    "p99Build": "99th_percentile_frame_build_time_millis",
    "worstBuild": "worst_frame_build_time_millis",
    "averageRaster": "average_frame_rasterizer_time_millis",
    "p90Raster": "90th_percentile_frame_rasterizer_time_millis",
    "p99Raster": "99th_percentile_frame_rasterizer_time_millis",
    "worstRaster": "worst_frame_rasterizer_time_millis",
    "missedBuild": "missed_frame_build_budget_count",
    "missedRaster": "missed_frame_rasterizer_budget_count",
    "frames": "frame_count",
    "oldGc": "old_gen_gc_count",
    "newGc": "new_gen_gc_count",
    "gpuMemory": "average_gpu_memory_mb",
}


def canonical(value):
    return value.removesuffix("_result").replace("_ohos", "").replace("_perf", "")


def display_name(test, app):
    value = test.replace("__timeline_summary", "").replace("__e2e_summary", "")
    value = value.replace("_ohos", "").replace("_perf", "").replace(f"{app}__", "")
    return value.replace("_", " ").strip()


def main(source, target):
    root = Path(source)
    summary_path = next(root.rglob("summary.csv"))
    with summary_path.open(encoding="utf-8-sig") as stream:
        summary_rows = list(csv.DictReader(stream))
    json_files = {canonical(path.stem): path for path in root.rglob("*.json")}
    records = []
    for index, row in enumerate(summary_rows):
        path = json_files.get(canonical(row["Test"]))
        if path is None:
            raise ValueError(f"No JSON result for {row['Test']}")
        payload = json.loads(path.read_text(encoding="utf-8"))
        result = payload["ResultData"]
        metrics = {key: result[source_key] for key, source_key in METRICS.items() if source_key in result}
        date = row["Date"]
        records.append({
            "id": f"flutter-{index + 1:03d}",
            "app": row["App"],
            "name": row["Test"],
            "displayName": display_name(row["Test"], row["App"]),
            "type": row["Type"],
            "status": row["Status"],
            "date": f"{date[:4]}-{date[4:6]}-{date[6:]}",
            "commit": payload["CommitSha"].strip(),
            "sourceFile": path.name,
            "metrics": metrics,
        })
    output = """export interface FlutterMetrics {\n  averageBuild: number;\n  p90Build: number;\n  p99Build: number;\n  worstBuild: number;\n  averageRaster: number;\n  p90Raster: number;\n  p99Raster: number;\n  worstRaster: number;\n  missedBuild: number;\n  missedRaster: number;\n  frames: number;\n  oldGc: number;\n  newGc: number;\n  gpuMemory?: number;\n}\n\nexport interface FlutterRecord {\n  id: string;\n  app: string;\n  name: string;\n  displayName: string;\n  type: 'Timeline' | 'E2E';\n  status: string;\n  date: string;\n  commit: string;\n  sourceFile: string;\n  metrics: FlutterMetrics;\n}\n\nexport const flutterMeta = {\n  version: '3.35.8-ohos-1.0.4',\n  dart: '3.9.2',\n  device: 'FMR0224122000105',\n  system: 'OpenHarmony 7.0.0.43 · API 26',\n  batch: '20261016',\n};\n\n"""
    output += "export const flutterRecords: FlutterRecord[] = " + json.dumps(records, ensure_ascii=False, indent=2) + ";\n"
    Path(target).write_text(output, encoding="utf-8")
    print(f"Imported {len(records)} Flutter JSON results into {target}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
