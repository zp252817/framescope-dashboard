import { useMemo, useState } from 'react';
import { ArrowDownUp, ArrowRight, Download, SearchX } from 'lucide-react';
import type { FlutterRecord } from '../data/flutter';
import { flutterAppLabels, flutterMetricMeta, flutterValue, rasterBudgetRate } from '../lib/flutterMetrics';
import type { FlutterMetricKey } from '../lib/flutterMetrics';

interface Props { records: FlutterRecord[]; onOpenRecord: (id: string) => void }
const tableMetrics: FlutterMetricKey[] = ['averageBuild', 'p90Build', 'p99Build', 'averageRaster', 'p90Raster', 'p99Raster', 'missedBuild', 'missedRaster'];

export default function FlutterCompare({ records, onOpenRecord }: Props) {
  const [sort, setSort] = useState<'name' | 'raster' | 'budget'>('name');
  const visible = useMemo(() => [...records].sort((a, b) => sort === 'raster' ? b.metrics.averageRaster - a.metrics.averageRaster : sort === 'budget' ? rasterBudgetRate(b) - rasterBudgetRate(a) : a.app.localeCompare(b.app) || a.displayName.localeCompare(b.displayName)), [records, sort]);
  const exportCsv = () => {
    const header = ['分组', '用例', '类型', '状态', ...tableMetrics.map((metric) => `${flutterMetricMeta[metric].label}(${flutterMetricMeta[metric].unit})`), '总帧数', 'Old GC', 'New GC'];
    const rows = visible.map((record) => [record.app, record.name, record.type, record.status, ...tableMetrics.map((metric) => record.metrics[metric]), record.metrics.frames, record.metrics.oldGc, record.metrics.newGc]);
    const csv = `\ufeff${[header, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n')}`;
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'flutter-benchmark-20261016.csv'; link.click(); URL.revokeObjectURL(url);
  };
  return <section className="panel comparison-panel">
    <div className="comparison-toolbar"><div><h2 className="table-panel-title">Flutter 单项用例汇总</h2><p className="table-panel-subtitle">68 份 JSON 已统一为同一数据口径</p></div><button className="secondary-button" onClick={exportCsv} disabled={!visible.length}><Download size={15} />导出汇总 CSV</button></div>
    <div className="table-tools"><div className="table-context">所有指标均来自原始 JSON <span className="unit-label">耗时单位：ms</span></div><div className="table-actions"><button className={`filter-toggle ${sort === 'raster' ? 'active' : ''}`} onClick={() => setSort(sort === 'raster' ? 'name' : 'raster')}><ArrowDownUp size={14} />按光栅耗时</button><button className={`filter-toggle ${sort === 'budget' ? 'active' : ''}`} onClick={() => setSort(sort === 'budget' ? 'name' : 'budget')}><ArrowDownUp size={14} />按超预算占比</button></div></div>
    {visible.length ? <div className="table-scroll"><table className="data-table flutter-data-table"><thead><tr><th>用例 / 分组</th><th>类型</th>{tableMetrics.map((metric) => <th key={metric} className="numeric">{flutterMetricMeta[metric].short}</th>)}<th className="numeric">帧数</th><th /></tr></thead><tbody>{visible.map((record) => <tr key={record.id} onClick={() => onOpenRecord(record.id)}><td><strong>{record.displayName}</strong><span className="table-subline">{flutterAppLabels[record.app]}</span></td><td><span className={`test-type ${record.type.toLowerCase()}`}>{record.type}</span></td>{tableMetrics.map((metric) => <td key={metric} className={`numeric ${metric === 'averageRaster' ? 'current-value' : ''}`}>{flutterValue(record, metric)}</td>)}<td className="numeric">{record.metrics.frames.toLocaleString()}</td><td><ArrowRight className="row-arrow" size={15} /></td></tr>)}</tbody></table></div> : <div className="empty-state compact"><SearchX size={28} /><h3>没有匹配的 Flutter 用例</h3><p>请调整搜索或筛选条件。</p></div>}
    <div className="table-footer"><span>共 {visible.length} 条用例</span><span>所有测试执行状态均为 Succeeded</span></div>
  </section>;
}
