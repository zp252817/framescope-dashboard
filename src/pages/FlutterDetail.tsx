import { useMemo } from 'react';
import { Box, CheckCircle2, Code2, Cpu, FileJson2, Frame, SearchX } from 'lucide-react';
import type { EChartsOption } from 'echarts';
import Chart from '../components/Chart';
import type { FlutterRecord } from '../data/flutter';
import { flutterMeta } from '../data/flutter';
import { flutterAppLabels, flutterValue, rasterBudgetRate } from '../lib/flutterMetrics';

interface Props { records: FlutterRecord[]; selectedId: string; onSelect: (id: string) => void; onClearSearch: () => void }

export default function FlutterDetail({ records, selectedId, onSelect, onClearSearch }: Props) {
  const record = records.find((item) => item.id === selectedId) ?? records[0];
  const option: EChartsOption | null = useMemo(() => record ? {
    animationDuration: 450, grid: { left: 18, right: 20, top: 50, bottom: 12, containLabel: true },
    legend: { top: 5, right: 10, textStyle: { color: '#7d8798', fontSize: 11 } },
    tooltip: { trigger: 'axis', backgroundColor: '#172238', borderWidth: 0, textStyle: { color: '#fff' }, valueFormatter: (value) => `${Number(value).toFixed(2)} ms` },
    xAxis: { type: 'category', data: ['平均值', 'P90', 'P99', '最差值'], axisTick: { show: false }, axisLine: { lineStyle: { color: '#e8ebf1' } }, axisLabel: { color: '#687386', fontSize: 11 } },
    yAxis: { type: 'value', axisLabel: { color: '#8790a3', fontSize: 10 }, splitLine: { lineStyle: { color: '#eef0f4', type: 'dashed' } } },
    series: [
      { name: '帧构建', type: 'bar', barMaxWidth: 42, itemStyle: { color: '#5268e8', borderRadius: [4, 4, 0, 0] }, data: [record.metrics.averageBuild, record.metrics.p90Build, record.metrics.p99Build, record.metrics.worstBuild] },
      { name: '光栅化', type: 'bar', barMaxWidth: 42, itemStyle: { color: '#2ca58d', borderRadius: [4, 4, 0, 0] }, data: [record.metrics.averageRaster, record.metrics.p90Raster, record.metrics.p99Raster, record.metrics.worstRaster] },
    ],
  } : null, [record]);
  if (!record || !option) return <div className="empty-state"><SearchX size={32} /><h2>没有匹配的用例</h2><p>全局搜索可能过滤了当前用例。</p><button className="primary-button" onClick={onClearSearch}>清空搜索</button></div>;
  return <div className="dashboard-stack">
    <section className="scenario-selector panel"><div><span className="scenario-kicker">当前 Flutter 用例</span><label><select value={record.id} onChange={(event) => onSelect(event.target.value)}>{records.map((item) => <option key={item.id} value={item.id}>{item.displayName} · {item.type}</option>)}</select></label></div><div className="scenario-tags"><span><Box size={14} />{flutterAppLabels[record.app]}</span><span className={`test-type ${record.type.toLowerCase()}`}>{record.type}</span><span className="success-tag"><CheckCircle2 size={13} />{record.status}</span></div></section>
    <section className="flutter-detail-stats"><div><ClockIcon /><span>平均帧构建</span><strong>{flutterValue(record, 'averageBuild')} ms</strong></div><div><Cpu size={17} /><span>平均光栅化</span><strong>{flutterValue(record, 'averageRaster')} ms</strong></div><div><Frame size={17} /><span>光栅超预算占比</span><strong>{rasterBudgetRate(record).toFixed(2)}%</strong></div><div><CheckCircle2 size={17} /><span>采样帧数</span><strong>{record.metrics.frames.toLocaleString()}</strong></div></section>
    <section className="detail-grid flutter-detail-grid"><article className="panel"><div className="panel-header"><div><h2>耗时分布</h2><p>帧构建与光栅化的均值、分位值和最差值</p></div><span className="unit-label">单位：ms</span></div><Chart option={option} height={325} ariaLabel={`${record.displayName}帧构建与光栅化耗时分布`} /></article><article className="panel"><div className="panel-header"><div><h2>帧预算与 GC</h2><p>该用例原始采样统计</p></div></div><div className="flutter-stat-list"><div><span>超预算构建帧</span><strong>{record.metrics.missedBuild} / {record.metrics.frames}</strong></div><div><span>超预算光栅化帧</span><strong>{record.metrics.missedRaster} / {record.metrics.frames}</strong></div><div><span>Old Gen GC</span><strong>{record.metrics.oldGc} 次</strong></div><div><span>New Gen GC</span><strong>{record.metrics.newGc} 次</strong></div><div><span>平均 GPU 内存</span><strong>{record.metrics.gpuMemory === undefined ? '未采集' : `${record.metrics.gpuMemory.toFixed(2)} MB`}</strong></div></div></article></section>
    <section className="panel flutter-source-panel"><div><Code2 size={18} /><span>Commit SHA</span><strong>{record.commit}</strong></div><div><Cpu size={18} /><span>Flutter / Dart</span><strong>{flutterMeta.version} · {flutterMeta.dart}</strong></div><div><FileJson2 size={18} /><span>原始结果文件</span><strong>{record.sourceFile}</strong></div><div><Box size={18} /><span>测试环境</span><strong>{flutterMeta.system} · {record.date}</strong></div></section>
  </div>;
}

function ClockIcon() { return <Cpu size={17} />; }
