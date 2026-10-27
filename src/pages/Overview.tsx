import { useMemo, useState } from 'react';
import { Activity, ArrowRight, CheckCircle2, Clock3, MemoryStick, TrendingDown, TrendingUp } from 'lucide-react';
import type { EChartsOption } from 'echarts';
import Chart from '../components/Chart';
import ChangeBadge from '../components/ChangeBadge';
import type { BenchmarkRecord } from '../data/benchmarks';
import { latestVersion } from '../data/benchmarks';
import { aggregateMetric, comparisonItems, coreMetrics, formatValue, metricMeta, overallScore, scenarioScore, shortScenario, trend } from '../lib/metrics';
import type { MetricKey } from '../lib/metrics';

interface Props {
  records: BenchmarkRecord[];
  current: string;
  baseline: string;
  onOpenScenario: (scenario: string) => void;
}

export default function Overview({ records, current, baseline, onOpenScenario }: Props) {
  const [trendMetric, setTrendMetric] = useState<MetricKey>('response');
  const score = overallScore(records, current, baseline);
  const response = aggregateMetric(records, current, baseline, 'response');
  const memory = aggregateMetric(records, current, baseline, 'averageMemory');
  const items = useMemo(() => comparisonItems(records, current, baseline), [records, current, baseline]);
  const improved = items.filter((item) => item.change > 0).length;
  const degraded = items.filter((item) => item.change < 0).length;
  const stable = items.length - improved - degraded;
  const health = items.length ? (improved / items.length) * 100 : null;
  const worst = [...items].filter((item) => item.change < 0).sort((a, b) => a.change - b.change).slice(0, 5);
  const ranking = useMemo(() => [...new Set(records.map((record) => record.scenario))].map((scenario) => ({
    scenario,
    score: scenarioScore(records.filter((record) => record.scenario === scenario), current, baseline),
  })).filter((item) => item.score !== null).sort((a, b) => (a.score ?? 0) - (b.score ?? 0)), [records, current, baseline]);
  const trendData = trend(records, trendMetric);

  const trendOption: EChartsOption = {
    animationDuration: 500,
    grid: { left: 18, right: 22, top: 28, bottom: 12, containLabel: true },
    tooltip: { trigger: 'axis', backgroundColor: '#172238', borderWidth: 0, textStyle: { color: '#fff', fontSize: 12 }, valueFormatter: (value) => `${Number(value).toFixed(2)} ${metricMeta[trendMetric].unit}` },
    xAxis: { type: 'category', data: trendData.map((item) => item.version), boundaryGap: false, axisLine: { lineStyle: { color: '#e8ebf1' } }, axisTick: { show: false }, axisLabel: { color: '#8790a3', fontSize: 11, margin: 14 } },
    yAxis: { type: 'value', scale: true, splitNumber: 4, axisLabel: { color: '#8790a3', fontSize: 11 }, splitLine: { lineStyle: { color: '#eef0f4', type: 'dashed' } } },
    series: [{
      name: metricMeta[trendMetric].label,
      type: 'line',
      data: trendData.map((item) => item.value),
      connectNulls: true,
      smooth: 0.25,
      symbol: 'circle',
      symbolSize: 7,
      showSymbol: true,
      lineStyle: { width: 2.5, color: metricMeta[trendMetric].color },
      itemStyle: { color: '#fff', borderColor: metricMeta[trendMetric].color, borderWidth: 2.5 },
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: `${metricMeta[trendMetric].color}28` }, { offset: 1, color: `${metricMeta[trendMetric].color}02` }] } },
      markLine: current !== latestVersion ? undefined : { silent: true, symbol: 'none', lineStyle: { color: '#c9cfda', type: 'dashed' }, label: { show: false }, data: [{ xAxis: baseline }] },
    }],
  };

  const rankingOption: EChartsOption = {
    animationDuration: 500,
    grid: { left: 8, right: 45, top: 5, bottom: 5, containLabel: true },
    tooltip: { trigger: 'item', backgroundColor: '#172238', borderWidth: 0, textStyle: { color: '#fff' }, formatter: (params) => {
      const item = Array.isArray(params) ? params[0] : params;
      return `${item.name}<br/>综合优化率：<b>${Number(item.value).toFixed(2)}%</b>`;
    } },
    xAxis: { type: 'value', splitLine: { show: false }, axisLabel: { show: false } },
    yAxis: { type: 'category', data: ranking.map((item) => shortScenario(item.scenario)), axisTick: { show: false }, axisLine: { show: false }, axisLabel: { color: '#5a6475', fontSize: 11, width: 128, overflow: 'truncate' } },
    series: [{ type: 'bar', barWidth: 12, data: ranking.map((item) => ({ value: Number((item.score ?? 0).toFixed(2)), itemStyle: { color: (item.score ?? 0) >= 0 ? '#2ca58d' : '#e46c6c', borderRadius: (item.score ?? 0) >= 0 ? [0, 4, 4, 0] : [4, 0, 0, 4] } })), label: { show: true, position: 'right', color: '#687386', fontSize: 11, formatter: ({ value }) => `${Number(value) > 0 ? '+' : ''}${Number(value).toFixed(2)}%` } }],
  };

  const donutOption: EChartsOption = {
    animationDuration: 500,
    tooltip: { trigger: 'item', backgroundColor: '#172238', borderWidth: 0, textStyle: { color: '#fff' } },
    legend: { bottom: 0, left: 'center', itemWidth: 8, itemHeight: 8, icon: 'circle', itemGap: 16, textStyle: { color: '#687386', fontSize: 11 } },
    series: [{
      type: 'pie', radius: ['58%', '78%'], center: ['50%', '42%'], avoidLabelOverlap: true,
      itemStyle: { borderColor: '#fff', borderWidth: 3, borderRadius: 5 }, label: { show: false },
      data: [{ name: '优化', value: improved, itemStyle: { color: '#2ca58d' } }, { name: '劣化', value: degraded, itemStyle: { color: '#e46c6c' } }, { name: '持平', value: stable, itemStyle: { color: '#d9dee7' } }],
    }],
    graphic: [{ type: 'text', left: 'center', top: '31%', style: { text: `${items.length}`, fontSize: 25, fontWeight: 600, fill: '#263247' } }, { type: 'text', left: 'center', top: '46%', style: { text: '指标对比', fontSize: 11, fill: '#929aaa' } }],
  };

  if (!records.length) return <EmptyOverview />;

  return (
    <div className="dashboard-stack">
      <section className="summary-grid">
        <article className="summary-card accent-card">
          <div className="summary-top"><span>综合优化率</span><div className="summary-icon purple"><Activity size={18} /></div></div>
          <div className="summary-value">{score === null ? '—' : `${score > 0 ? '+' : ''}${score.toFixed(2)}%`}</div>
          <div className="summary-foot"><ChangeBadge value={score} compact /><span>4 项核心指标均值</span></div>
        </article>
        <article className="summary-card">
          <div className="summary-top"><span>平均响应时延</span><div className="summary-icon blue"><Clock3 size={18} /></div></div>
          <div className="summary-value">{formatValue(response.current, 'response')}<small>ms</small></div>
          <div className="summary-foot"><ChangeBadge value={response.change} compact /><span>基线 {formatValue(response.baseline, 'response')} ms</span></div>
        </article>
        <article className="summary-card">
          <div className="summary-top"><span>平均内存占用</span><div className="summary-icon amber"><MemoryStick size={18} /></div></div>
          <div className="summary-value">{formatValue(memory.current, 'averageMemory')}<small>MB</small></div>
          <div className="summary-foot"><ChangeBadge value={memory.change} compact /><span>基线 {formatValue(memory.baseline, 'averageMemory')} MB</span></div>
        </article>
        <article className="summary-card">
          <div className="summary-top"><span>优化指标占比</span><div className="summary-icon green"><CheckCircle2 size={18} /></div></div>
          <div className="summary-value">{health === null ? '—' : `${health.toFixed(1)}%`}</div>
          <div className="summary-foot health-foot"><span><i className="dot green-dot" />{improved} 优化</span><span><i className="dot red-dot" />{degraded} 劣化</span></div>
        </article>
      </section>

      <section className="overview-main-grid">
        <article className="panel trend-panel">
          <div className="panel-header"><div><h2>核心指标趋势</h2><p>各版本 benchmark 均值变化</p></div><div className="segmented-control">{coreMetrics.map((metric) => <button key={metric} className={trendMetric === metric ? 'active' : ''} onClick={() => setTrendMetric(metric)}>{metricMeta[metric].shortLabel}</button>)}</div></div>
          <Chart option={trendOption} height={285} ariaLabel={`${metricMeta[trendMetric].label}历史版本趋势图`} />
          <div className="chart-insight"><TrendingUp size={14} /><span>{current} 相比 {baseline}</span><ChangeBadge value={aggregateMetric(records, current, baseline, trendMetric).change} compact /></div>
        </article>

        <article className="panel distribution-panel">
          <div className="panel-header"><div><h2>指标表现分布</h2><p>基于当前筛选的核心指标</p></div></div>
          <Chart option={donutOption} height={276} ariaLabel="优化、劣化与持平指标数量分布图" />
          <div className="distribution-caption"><span className={degraded ? 'warning-text' : 'success-text'}>{degraded ? `${degraded} 项指标需要关注` : '当前没有劣化指标'}</span></div>
        </article>
      </section>

      <section className="overview-secondary-grid">
        <article className="panel ranking-panel">
          <div className="panel-header"><div><h2>场景综合表现</h2><p>响应、完成、FPS 与内存的综合优化率</p></div><span className="panel-hint">点击场景查看详情</span></div>
          <Chart option={rankingOption} height={Math.max(260, ranking.length * 34)} onClick={(index) => ranking[index] && onOpenScenario(ranking[index].scenario)} ariaLabel="各场景综合优化率排行" />
        </article>
        <article className="panel release-panel">
          <div className="panel-header"><div><h2>当前版本产物</h2><p>{latestVersion} · 鸿蒙自渲染 / 统一渲染</p></div><span className="release-tag">Latest</span></div>
          <div className="artifact-list">
            {records.find((record) => record.platform === 'harmony') && Object.entries(records.find((record) => record.platform === 'harmony')!.artifacts).map(([name, value]) => <div key={name}><span>{name.toUpperCase()}</span><strong>{value}</strong></div>)}
          </div>
          <div className="release-meta"><div><span>Benchmark 场景</span><strong>8</strong></div><div><span>历史版本</span><strong>8</strong></div><div><span>测试设备</span><strong>Mate80Pro</strong></div></div>
          <button className="primary-button full-button" onClick={() => onOpenScenario(ranking[0]?.scenario ?? records[0].scenario)}>查看场景分析<ArrowRight size={16} /></button>
        </article>
      </section>

      <section className="panel attention-panel">
        <div className="panel-header"><div><h2>重点关注项</h2><p>按劣化幅度排序，优先排查影响较大的指标</p></div><span className="attention-count"><TrendingDown size={14} />{degraded} 项劣化</span></div>
        {worst.length ? <div className="attention-list">{worst.map((item) => <button key={`${item.record.id}-${item.metric}`} onClick={() => onOpenScenario(item.record.scenario)}><div className="attention-scenario"><span className={`platform-icon ${item.record.platform}`}>{item.record.platform === 'harmony' ? 'HM' : 'iOS'}</span><div><strong>{item.record.scenario}</strong><span>{item.record.renderMode} · {metricMeta[item.metric].label}</span></div></div><div className="attention-values"><span>{formatValue(item.baseline, item.metric)}</span><ArrowRight size={13} /><strong>{formatValue(item.current, item.metric)} {metricMeta[item.metric].unit}</strong></div><ChangeBadge value={item.change} /></button>)}</div> : <div className="all-clear"><CheckCircle2 size={24} />当前筛选范围内没有劣化项</div>}
      </section>
    </div>
  );
}

function EmptyOverview() {
  return <div className="empty-state"><Activity size={32} /><h2>没有匹配的 benchmark 数据</h2><p>请调整搜索关键词或平台筛选条件。</p></div>;
}
