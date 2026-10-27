import { useEffect, useMemo, useState } from 'react';
import { Box, ChevronRight, Cpu, Layers3, SearchX } from 'lucide-react';
import type { EChartsOption } from 'echarts';
import Chart from '../components/Chart';
import ChangeBadge from '../components/ChangeBadge';
import type { BenchmarkRecord } from '../data/benchmarks';
import { versions } from '../data/benchmarks';
import { coreMetrics, formatValue, getMetricValue, metricMeta } from '../lib/metrics';
import type { MetricKey } from '../lib/metrics';

interface Props {
  records: BenchmarkRecord[];
  current: string;
  baseline: string;
  selectedScenario: string;
  onSelectScenario: (scenario: string) => void;
  onClearSearch: () => void;
}

const detailMetrics: MetricKey[] = [...coreMetrics, 'peakMemory', 'appInstructions', 'renderInstructions'];
const seriesColors = ['#5268e8', '#1c9b83', '#d48a35'];

export default function ScenarioDetail({ records, current, baseline, selectedScenario, onSelectScenario, onClearSearch }: Props) {
  const scenarios = useMemo(() => [...new Set(records.map((record) => record.scenario))], [records]);
  const scenario = scenarios.includes(selectedScenario) ? selectedScenario : scenarios[0] ?? '';
  const [metric, setMetric] = useState<MetricKey>('response');
  useEffect(() => {
    if (scenario && scenario !== selectedScenario) onSelectScenario(scenario);
  }, [scenario, selectedScenario, onSelectScenario]);
  const rows = records.filter((record) => record.scenario === scenario);
  const versionOrder = [...versions].reverse();
  const labels = rows.map((record) => record.platform === 'ios' ? 'iOS' : record.renderMode);

  const trendOption: EChartsOption = {
    animationDuration: 450,
    color: seriesColors,
    grid: { left: 20, right: 24, top: 50, bottom: 15, containLabel: true },
    legend: { top: 4, right: 12, itemWidth: 14, itemHeight: 3, textStyle: { color: '#687386', fontSize: 11 } },
    tooltip: { trigger: 'axis', backgroundColor: '#172238', borderWidth: 0, textStyle: { color: '#fff', fontSize: 12 }, valueFormatter: (value) => `${Number(value).toFixed(2)} ${metricMeta[metric].unit}` },
    xAxis: { type: 'category', data: versionOrder, boundaryGap: false, axisTick: { show: false }, axisLine: { lineStyle: { color: '#e8ebf1' } }, axisLabel: { color: '#8790a3', fontSize: 11, margin: 14 } },
    yAxis: { type: 'value', scale: true, axisLabel: { color: '#8790a3', fontSize: 11 }, splitLine: { lineStyle: { color: '#eef0f4', type: 'dashed' } } },
    series: rows.map((record) => ({ name: record.platform === 'ios' ? 'iOS' : record.renderMode, type: 'line', data: versionOrder.map((version) => getMetricValue(record, version, metric) ?? null), connectNulls: true, smooth: 0.2, symbolSize: 6, lineStyle: { width: 2 }, emphasis: { focus: 'series' } })),
  };

  const compareOption: EChartsOption = {
    animationDuration: 450,
    grid: { left: 18, right: 18, top: 48, bottom: 12, containLabel: true },
    legend: { top: 4, right: 8, textStyle: { color: '#687386', fontSize: 11 } },
    tooltip: { trigger: 'axis', backgroundColor: '#172238', borderWidth: 0, textStyle: { color: '#fff' } },
    xAxis: { type: 'category', data: labels, axisTick: { show: false }, axisLine: { lineStyle: { color: '#e8ebf1' } }, axisLabel: { color: '#687386', fontSize: 11 } },
    yAxis: { type: 'value', scale: true, axisLabel: { color: '#8790a3', fontSize: 11 }, splitLine: { lineStyle: { color: '#eef0f4', type: 'dashed' } } },
    series: [
      { name: current, type: 'bar', barMaxWidth: 36, itemStyle: { color: '#5268e8', borderRadius: [4, 4, 0, 0] }, data: rows.map((record) => getMetricValue(record, current, metric) ?? null) },
      { name: baseline, type: 'bar', barMaxWidth: 36, itemStyle: { color: '#cdd4e2', borderRadius: [4, 4, 0, 0] }, data: rows.map((record) => getMetricValue(record, baseline, metric) ?? null) },
    ],
  };

  if (!rows.length) return <div className="empty-state"><SearchX size={32} /><h2>没有匹配的场景</h2><p>全局搜索可能过滤了场景数据。</p><button className="primary-button" onClick={onClearSearch}>清空搜索</button></div>;

  return (
    <div className="dashboard-stack">
      <section className="scenario-selector panel">
        <div><span className="scenario-kicker">当前分析场景</span><label><select value={scenario} onChange={(event) => onSelectScenario(event.target.value)}>{scenarios.map((name) => <option key={name}>{name}</option>)}</select></label></div>
        <div className="scenario-tags"><span><Layers3 size={14} />{rows.length} 个平台组合</span><span><Box size={14} />8 个历史版本</span></div>
      </section>
      <section className="panel scenario-trend-panel">
        <div className="panel-header"><div><h2>版本演进趋势</h2><p>同一平台与渲染方式下的指标变化</p></div><div className="segmented-control">{coreMetrics.map((key) => <button key={key} className={metric === key ? 'active' : ''} onClick={() => setMetric(key)}>{metricMeta[key].shortLabel}</button>)}</div></div>
        <Chart option={trendOption} height={330} ariaLabel={`${scenario}各平台版本趋势`} />
      </section>
      <section className="detail-grid">
        <article className="panel">
          <div className="panel-header"><div><h2>平台表现对比</h2><p>{metricMeta[metric].label} · {current} vs {baseline}</p></div></div>
          <Chart option={compareOption} height={270} ariaLabel={`${scenario}平台对比柱状图`} />
        </article>
        <article className="panel artifact-detail-panel">
          <div className="panel-header"><div><h2>版本产物</h2><p>各平台当前记录对应的依赖版本</p></div><Cpu size={18} /></div>
          <div className="artifact-detail-list">{rows.map((record) => <div key={record.id}><div className="artifact-platform"><span className={`platform-icon ${record.platform}`}>{record.platform === 'harmony' ? 'HM' : 'iOS'}</span><strong>{record.platform === 'harmony' ? record.renderMode : 'iOS'}</strong></div><dl><div><dt>KMP</dt><dd>{record.artifacts.kmp}</dd></div><div><dt>CMP</dt><dd>{record.artifacts.cmp}</dd></div><div><dt>Skiko</dt><dd>{record.artifacts.skiko}</dd></div></dl></div>)}</div>
        </article>
      </section>
      <section className="panel detail-table-panel">
        <div className="panel-header"><div><h2>全指标明细</h2><p>优化率为正值表示变优，负值表示劣化</p></div></div>
        <div className="table-scroll"><table className="data-table detail-table"><thead><tr><th>指标</th>{rows.map((record) => <th key={record.id} className="numeric">{record.platform === 'ios' ? 'iOS' : record.renderMode}<span className="th-subtitle">{record.device}</span></th>)}</tr></thead><tbody>{detailMetrics.map((key) => <tr key={key}><td><strong>{metricMeta[key].label}</strong><span className="metric-unit">{metricMeta[key].unit || '指令条数'}</span></td>{rows.map((record) => { const currentValue = getMetricValue(record, current, key); const baselineValue = getMetricValue(record, baseline, key); const change = currentValue === undefined || baselineValue === undefined || baselineValue === 0 ? null : (metricMeta[key].higherIsBetter ? (currentValue - baselineValue) / baselineValue : (baselineValue - currentValue) / baselineValue) * 100; return <td key={record.id} className="numeric"><strong className="detail-value">{formatValue(currentValue, key)}</strong><div className="detail-baseline">基线 {formatValue(baselineValue, key)} <ChangeBadge value={change} compact /></div></td>; })}</tr>)}</tbody></table></div>
        <button className="detail-source-link" onClick={() => document.querySelector('.page-footer')?.scrollIntoView({ behavior: 'smooth' })}>数据来源与统计口径<ChevronRight size={14} /></button>
      </section>
    </div>
  );
}
