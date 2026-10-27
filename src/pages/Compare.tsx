import { useMemo, useState } from 'react';
import { ArrowDownUp, ArrowRight, Download, Filter, SearchX } from 'lucide-react';
import ChangeBadge from '../components/ChangeBadge';
import type { BenchmarkRecord } from '../data/benchmarks';
import { comparisonItems, coreMetrics, formatValue, metricMeta } from '../lib/metrics';
import type { MetricKey } from '../lib/metrics';

interface Props {
  records: BenchmarkRecord[];
  current: string;
  baseline: string;
  onOpenScenario: (scenario: string) => void;
}

export default function Compare({ records, current, baseline, onOpenScenario }: Props) {
  const [metric, setMetric] = useState<MetricKey>('response');
  const [onlyDegraded, setOnlyDegraded] = useState(false);
  const [sort, setSort] = useState<'scenario' | 'change'>('scenario');
  const items = useMemo(() => comparisonItems(records, current, baseline, [metric]), [records, current, baseline, metric]);
  const visible = useMemo(() => items.filter((item) => !onlyDegraded || item.change < 0).sort((a, b) => sort === 'change' ? a.change - b.change : a.record.scenario.localeCompare(b.record.scenario, 'zh-CN') || a.record.renderMode.localeCompare(b.record.renderMode, 'zh-CN')), [items, onlyDegraded, sort]);
  const improved = items.filter((item) => item.change > 0).length;
  const degraded = items.filter((item) => item.change < 0).length;
  const average = items.length ? items.reduce((sum, item) => sum + item.change, 0) / items.length : null;

  const exportCsv = () => {
    const rows = [['场景', '平台', '渲染方式', '指标', `${current} 当前值`, `${baseline} 基线值`, '优化率(%)'], ...visible.map((item) => [item.record.scenario, item.record.platform === 'harmony' ? '鸿蒙' : 'iOS', item.record.renderMode, metricMeta[metric].label, item.current, item.baseline, item.change.toFixed(4)])];
    const csv = `\ufeff${rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n')}`;
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `benchmark-${current}-vs-${baseline}-${metric}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-stack">
      <section className="compare-summary">
        <div><span>对比记录</span><strong>{items.length}</strong><small>场景 × 平台组合</small></div>
        <div><span>平均优化率</span><strong className={average !== null && average < 0 ? 'negative-text' : 'positive-text'}>{average === null ? '—' : `${average > 0 ? '+' : ''}${average.toFixed(2)}%`}</strong><small>{metricMeta[metric].label}</small></div>
        <div><span>优化 / 劣化</span><strong><b className="positive-text">{improved}</b><em>/</em><b className="negative-text">{degraded}</b></strong><small>正数代表优化</small></div>
      </section>
      <section className="panel comparison-panel">
        <div className="comparison-toolbar">
          <div className="metric-tabs">{[...coreMetrics, 'peakMemory' as const, 'appInstructions' as const].map((key) => <button key={key} className={metric === key ? 'active' : ''} onClick={() => setMetric(key)}>{metricMeta[key].label}</button>)}</div>
          <button className="secondary-button" onClick={exportCsv} disabled={!visible.length}><Download size={15} />导出 CSV</button>
        </div>
        <div className="table-tools">
          <div className="table-context">当前 <strong>{current}</strong><ArrowRight size={14} />基线 <strong>{baseline}</strong><span className="unit-label">单位：{metricMeta[metric].unit || '条'}</span></div>
          <div className="table-actions"><button className={`filter-toggle ${onlyDegraded ? 'active' : ''}`} onClick={() => setOnlyDegraded(!onlyDegraded)}><Filter size={14} />只看劣化</button><button className={`filter-toggle ${sort === 'change' ? 'active' : ''}`} onClick={() => setSort(sort === 'change' ? 'scenario' : 'change')}><ArrowDownUp size={14} />{sort === 'change' ? '按劣化排序' : '默认排序'}</button></div>
        </div>
        {visible.length ? <div className="table-scroll"><table className="data-table"><thead><tr><th>Benchmark 场景</th><th>平台 / 渲染方式</th><th className="numeric">当前值</th><th className="numeric">基线值</th><th className="numeric">优化率</th><th aria-label="查看详情" /></tr></thead><tbody>{visible.map((item) => <tr key={item.record.id} onClick={() => onOpenScenario(item.record.scenario)}><td><strong>{item.record.scenario}</strong></td><td><div className="platform-cell"><span className={`platform-icon ${item.record.platform}`}>{item.record.platform === 'harmony' ? 'HM' : 'iOS'}</span><div><strong>{item.record.platform === 'harmony' ? '鸿蒙 Mate80Pro' : 'iOS'}</strong><span>{item.record.renderMode}</span></div></div></td><td className="numeric current-value">{formatValue(item.current, metric)}</td><td className="numeric baseline-value">{formatValue(item.baseline, metric)}</td><td className="numeric"><ChangeBadge value={item.change} /></td><td><ArrowRight className="row-arrow" size={16} /></td></tr>)}</tbody></table></div> : <div className="empty-state compact"><SearchX size={28} /><h3>没有符合条件的对比项</h3><p>{onlyDegraded ? '当前范围内没有劣化数据，可关闭“只看劣化”。' : '请调整搜索或筛选条件。'}</p></div>}
        <div className="table-footer"><span>共 {visible.length} 条记录</span><span>优化率 = {metricMeta[metric].higherIsBetter ? '(当前值 − 基线值) / 基线值' : '(基线值 − 当前值) / 基线值'}</span></div>
      </section>
    </div>
  );
}
