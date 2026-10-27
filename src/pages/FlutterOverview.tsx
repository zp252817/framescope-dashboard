import { useMemo, useState } from 'react';
import { Activity, ArrowRight, CheckCircle2, Clock3, Cpu, Frame, Gauge, TriangleAlert } from 'lucide-react';
import type { EChartsOption } from 'echarts';
import Chart from '../components/Chart';
import { flutterApps, flutterAppLabels, flutterMean, flutterMetricMeta, flutterNumber, flutterSum, rasterBudgetRate } from '../lib/flutterMetrics';
import type { FlutterMetricKey } from '../lib/flutterMetrics';
import type { FlutterRecord } from '../data/flutter';
import { flutterMeta } from '../data/flutter';

interface Props { records: FlutterRecord[]; onOpenRecord: (id: string) => void }

export default function FlutterOverview({ records, onOpenRecord }: Props) {
  const [rankMetric, setRankMetric] = useState<FlutterMetricKey>('averageRaster');
  const averageBuild = flutterMean(records, 'averageBuild');
  const averageRaster = flutterMean(records, 'averageRaster');
  const missedRaster = flutterSum(records, 'missedRaster');
  const missedBuild = flutterSum(records, 'missedBuild');
  const clean = records.filter((record) => record.metrics.missedBuild + record.metrics.missedRaster === 0).length;
  const timeline = records.filter((record) => record.type === 'Timeline').length;
  const ranking = useMemo(() => [...records].sort((a, b) => b.metrics[rankMetric]! - a.metrics[rankMetric]!).slice(0, 10).reverse(), [records, rankMetric]);
  const attention = useMemo(() => [...records].sort((a, b) => rasterBudgetRate(b) - rasterBudgetRate(a) || b.metrics.missedRaster - a.metrics.missedRaster).slice(0, 6), [records]);
  const categoryData = flutterApps.filter((app) => records.some((record) => record.app === app)).map((app) => {
    const rows = records.filter((record) => record.app === app);
    return { app, build: flutterMean(rows, 'averageBuild') ?? 0, raster: flutterMean(rows, 'averageRaster') ?? 0 };
  });

  const categoryOption: EChartsOption = {
    animationDuration: 450, grid: { left: 18, right: 18, top: 48, bottom: 10, containLabel: true },
    legend: { top: 5, right: 10, textStyle: { color: '#7d8798', fontSize: 11 } },
    tooltip: { trigger: 'axis', backgroundColor: '#172238', borderWidth: 0, textStyle: { color: '#fff' }, valueFormatter: (value) => `${Number(value).toFixed(2)} ms` },
    xAxis: { type: 'category', data: categoryData.map((item) => flutterAppLabels[item.app]), axisTick: { show: false }, axisLine: { lineStyle: { color: '#e8ebf1' } }, axisLabel: { color: '#8790a3', fontSize: 10, interval: 0 } },
    yAxis: { type: 'value', axisLabel: { color: '#8790a3', fontSize: 10 }, splitLine: { lineStyle: { color: '#eef0f4', type: 'dashed' } } },
    series: [
      { name: '平均帧构建', type: 'bar', barMaxWidth: 30, itemStyle: { color: '#5268e8', borderRadius: [4, 4, 0, 0] }, data: categoryData.map((item) => item.build) },
      { name: '平均光栅化', type: 'bar', barMaxWidth: 30, itemStyle: { color: '#2ca58d', borderRadius: [4, 4, 0, 0] }, data: categoryData.map((item) => item.raster) },
    ],
  };
  const rankingOption: EChartsOption = {
    animationDuration: 450, grid: { left: 8, right: 50, top: 5, bottom: 5, containLabel: true },
    tooltip: { trigger: 'item', backgroundColor: '#172238', borderWidth: 0, textStyle: { color: '#fff' }, formatter: (params) => { const item = Array.isArray(params) ? params[0] : params; return `${item.name}<br/>${flutterMetricMeta[rankMetric].label}：<b>${Number(item.value).toFixed(2)} ms</b>`; } },
    xAxis: { type: 'value', splitLine: { show: false }, axisLabel: { show: false } },
    yAxis: { type: 'category', data: ranking.map((record) => record.displayName), axisTick: { show: false }, axisLine: { show: false }, axisLabel: { color: '#687386', fontSize: 10, width: 170, overflow: 'truncate' } },
    series: [{ type: 'bar', barWidth: 12, data: ranking.map((record) => ({ value: Number(record.metrics[rankMetric]!.toFixed(3)), itemStyle: { color: '#6478e7', borderRadius: [0, 4, 4, 0] } })), label: { show: true, position: 'right', color: '#7c8798', fontSize: 10, formatter: '{c} ms' } }],
  };
  const healthOption: EChartsOption = {
    animationDuration: 450, tooltip: { trigger: 'item' },
    legend: { bottom: 0, left: 'center', icon: 'circle', itemWidth: 8, itemHeight: 8, textStyle: { color: '#7d8798', fontSize: 10 } },
    series: [{ type: 'pie', radius: ['58%', '77%'], center: ['50%', '41%'], itemStyle: { borderColor: '#fff', borderWidth: 3, borderRadius: 4 }, label: { show: false }, data: [{ name: '无超预算帧', value: clean, itemStyle: { color: '#2ca58d' } }, { name: '存在超预算帧', value: records.length - clean, itemStyle: { color: '#e3a04f' } }] }],
    graphic: [{ type: 'text', left: 'center', top: '31%', style: { text: `${records.length}`, fontSize: 25, fontWeight: 600, fill: '#273248' } }, { type: 'text', left: 'center', top: '46%', style: { text: '测试用例', fontSize: 10, fill: '#929aaa' } }],
  };

  if (!records.length) return <div className="empty-state"><Activity size={32} /><h2>没有匹配的 Flutter 用例</h2><p>请调整搜索、分组或用例类型。</p></div>;

  return <div className="dashboard-stack">
    <section className="summary-grid">
      <article className="summary-card accent-card"><div className="summary-top"><span>平均帧构建</span><div className="summary-icon purple"><Clock3 size={18} /></div></div><div className="summary-value">{flutterNumber(averageBuild, 'averageBuild')}<small>ms</small></div><div className="summary-foot"><span>68 个单项用例均值</span></div></article>
      <article className="summary-card"><div className="summary-top"><span>平均光栅化耗时</span><div className="summary-icon green"><Gauge size={18} /></div></div><div className="summary-value">{flutterNumber(averageRaster, 'averageRaster')}<small>ms</small></div><div className="summary-foot"><span>UI 渲染线程平均耗时</span></div></article>
      <article className="summary-card"><div className="summary-top"><span>超预算光栅化帧</span><div className="summary-icon amber"><Frame size={18} /></div></div><div className="summary-value">{missedRaster.toLocaleString()}<small>帧</small></div><div className="summary-foot"><span>构建超预算 {missedBuild.toLocaleString()} 帧</span></div></article>
      <article className="summary-card"><div className="summary-top"><span>测试执行成功率</span><div className="summary-icon green"><CheckCircle2 size={18} /></div></div><div className="summary-value">100<small>%</small></div><div className="summary-foot"><span>{records.length} / {records.length} Succeeded</span></div></article>
    </section>
    <div className="flutter-meta-strip"><span><Cpu size={14} />Flutter <strong>{flutterMeta.version}</strong></span><span>Dart <strong>{flutterMeta.dart}</strong></span><span>{flutterMeta.system}</span><span className="flutter-commit">Commit <strong>{records[0].commit.slice(0, 12)}</strong></span></div>
    <section className="overview-main-grid">
      <article className="panel"><div className="panel-header"><div><h2>用例分组耗时</h2><p>各测试分组的帧构建与光栅化均值</p></div><span className="release-tag">单批次</span></div><Chart option={categoryOption} height={290} ariaLabel="Flutter 各测试分组耗时柱状图" /></article>
      <article className="panel distribution-panel"><div className="panel-header"><div><h2>帧预算健康度</h2><p>按是否存在超预算帧统计</p></div></div><Chart option={healthOption} height={250} ariaLabel="Flutter 用例帧预算健康度分布" /><div className="distribution-caption"><span className="warning-text">{records.length - clean} 个用例建议关注</span></div></article>
    </section>
    <section className="overview-secondary-grid flutter-ranking-grid">
      <article className="panel ranking-panel"><div className="panel-header"><div><h2>高耗时用例</h2><p>按当前指标展示耗时最高的 10 个用例</p></div><div className="segmented-control">{(['averageRaster', 'p99Raster', 'averageBuild'] as const).map((metric) => <button key={metric} className={rankMetric === metric ? 'active' : ''} onClick={() => setRankMetric(metric)}>{flutterMetricMeta[metric].short}</button>)}</div></div><Chart option={rankingOption} height={340} onClick={(index) => onOpenRecord(ranking[index].id)} ariaLabel="Flutter 高耗时用例排行" /></article>
      <article className="panel release-panel"><div className="panel-header"><div><h2>测试覆盖</h2><p>2026-10-15 至 2026-10-16</p></div><span className="release-tag">OHOS</span></div><div className="flutter-coverage"><div><strong>{records.length}</strong><span>全部用例</span></div><div><strong>{timeline}</strong><span>Timeline</span></div><div><strong>{records.length - timeline}</strong><span>E2E</span></div></div><div className="flutter-app-list">{categoryData.map((item) => <div key={item.app}><span>{flutterAppLabels[item.app]}</span><strong>{records.filter((record) => record.app === item.app).length} 个用例</strong></div>)}</div></article>
    </section>
    <section className="panel attention-panel"><div className="panel-header"><div><h2>帧预算关注项</h2><p>按超预算光栅化帧占总帧数比例排序</p></div><span className="attention-count"><TriangleAlert size={14} />{records.length - clean} 个关注项</span></div><div className="attention-list flutter-attention-list">{attention.map((record) => <button key={record.id} onClick={() => onOpenRecord(record.id)}><div className="attention-scenario"><span className="platform-icon flutter">FL</span><div><strong>{record.displayName}</strong><span>{flutterAppLabels[record.app]} · {record.type}</span></div></div><div className="attention-values"><span>光栅均值</span><strong>{record.metrics.averageRaster.toFixed(2)} ms</strong><span>超预算 {record.metrics.missedRaster} / {record.metrics.frames}</span></div><span className={`budget-rate ${rasterBudgetRate(record) > 0 ? 'has-jank' : ''}`}>{rasterBudgetRate(record).toFixed(2)}%</span><ArrowRight size={14} /></button>)}</div></section>
  </div>;
}
