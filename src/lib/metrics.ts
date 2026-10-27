import type { BenchmarkRecord, MetricValues, Platform } from '../data/benchmarks';
import { versions } from '../data/benchmarks';

export type MetricKey = 'response' | 'completion' | 'frameRate' | 'averageMemory' | 'peakMemory' | 'appInstructions' | 'renderInstructions';

export interface MetricMeta {
  label: string;
  shortLabel: string;
  unit: string;
  higherIsBetter: boolean;
  decimals: number;
  color: string;
}

export const metricMeta: Record<MetricKey, MetricMeta> = {
  response: { label: '响应时延', shortLabel: '响应', unit: 'ms', higherIsBetter: false, decimals: 2, color: '#5268e8' },
  completion: { label: '完成时延', shortLabel: '完成', unit: 'ms', higherIsBetter: false, decimals: 2, color: '#7b61c9' },
  frameRate: { label: 'PresentFence FPS', shortLabel: 'FPS', unit: 'FPS', higherIsBetter: true, decimals: 2, color: '#1c9b83' },
  averageMemory: { label: '平均内存', shortLabel: '内存', unit: 'MB', higherIsBetter: false, decimals: 2, color: '#d48a35' },
  peakMemory: { label: '峰值内存', shortLabel: '峰值', unit: 'MB', higherIsBetter: false, decimals: 2, color: '#df775f' },
  appInstructions: { label: 'App 指令数', shortLabel: 'App 指令', unit: '', higherIsBetter: false, decimals: 2, color: '#3185b9' },
  renderInstructions: { label: 'render_service 指令数', shortLabel: 'RS 指令', unit: '', higherIsBetter: false, decimals: 2, color: '#61758c' },
};

export const coreMetrics: MetricKey[] = ['response', 'completion', 'frameRate', 'averageMemory'];

export function getMetricValue(record: BenchmarkRecord, version: string, metric: MetricKey): number | undefined {
  const values: MetricValues | undefined = record.values[version];
  if (!values) return undefined;
  if (metric === 'frameRate') return values.presentFence ?? values.rsFps ?? values.averageFps;
  return values[metric];
}

export function calculateChange(current: number | undefined, baseline: number | undefined, metric: MetricKey): number | null {
  if (current === undefined || baseline === undefined || baseline === 0) return null;
  const raw = metricMeta[metric].higherIsBetter
    ? (current - baseline) / baseline
    : (baseline - current) / baseline;
  return raw * 100;
}

export function average(values: Array<number | undefined>): number | undefined {
  const valid = values.filter((value): value is number => value !== undefined && Number.isFinite(value));
  return valid.length ? valid.reduce((sum, value) => sum + value, 0) / valid.length : undefined;
}

export function filterRecords(records: BenchmarkRecord[], platform: 'all' | Platform, query = ''): BenchmarkRecord[] {
  const normalized = query.trim().toLocaleLowerCase();
  return records.filter((record) => {
    const platformMatches = platform === 'all' || record.platform === platform;
    const queryMatches = !normalized || `${record.scenario} ${record.renderMode} ${record.device}`.toLocaleLowerCase().includes(normalized);
    return platformMatches && queryMatches;
  });
}

export interface Aggregate {
  current?: number;
  baseline?: number;
  change: number | null;
  samples: number;
}

export function aggregateMetric(records: BenchmarkRecord[], current: string, baseline: string, metric: MetricKey): Aggregate {
  const pairs = records.map((record) => ({
    current: getMetricValue(record, current, metric),
    baseline: getMetricValue(record, baseline, metric),
  })).filter((pair) => pair.current !== undefined && pair.baseline !== undefined);
  const currentMean = average(pairs.map((pair) => pair.current));
  const baselineMean = average(pairs.map((pair) => pair.baseline));
  return {
    current: currentMean,
    baseline: baselineMean,
    change: calculateChange(currentMean, baselineMean, metric),
    samples: pairs.length,
  };
}

export function overallScore(records: BenchmarkRecord[], current: string, baseline: string): number | null {
  return average(coreMetrics.map((metric) => aggregateMetric(records, current, baseline, metric).change ?? undefined)) ?? null;
}

export interface ComparisonItem {
  record: BenchmarkRecord;
  metric: MetricKey;
  current: number;
  baseline: number;
  change: number;
}

export function comparisonItems(records: BenchmarkRecord[], current: string, baseline: string, metrics = coreMetrics): ComparisonItem[] {
  return records.flatMap((record) => metrics.flatMap((metric) => {
    const currentValue = getMetricValue(record, current, metric);
    const baselineValue = getMetricValue(record, baseline, metric);
    const change = calculateChange(currentValue, baselineValue, metric);
    return currentValue === undefined || baselineValue === undefined || change === null
      ? []
      : [{ record, metric, current: currentValue, baseline: baselineValue, change }];
  }));
}

export function trend(records: BenchmarkRecord[], metric: MetricKey): Array<{ version: string; value: number | null }> {
  return [...versions].reverse().map((version) => ({
    version,
    value: average(records.map((record) => getMetricValue(record, version, metric))) ?? null,
  }));
}

export function scenarioScore(records: BenchmarkRecord[], current: string, baseline: string): number | null {
  return overallScore(records, current, baseline);
}

export function formatValue(value: number | undefined | null, metric: MetricKey, withUnit = false): string {
  if (value === undefined || value === null) return '—';
  const meta = metricMeta[metric];
  const formatted = meta.unit === ''
    ? new Intl.NumberFormat('zh-CN', { notation: 'compact', maximumFractionDigits: 2 }).format(value)
    : value.toLocaleString('zh-CN', { minimumFractionDigits: meta.decimals, maximumFractionDigits: meta.decimals });
  return withUnit && meta.unit ? `${formatted} ${meta.unit}` : formatted;
}

export function formatChange(value: number | null): string {
  if (value === null) return '—';
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function changeClass(value: number | null): 'positive' | 'negative' | 'neutral' {
  if (value === null || Math.abs(value) < 0.005) return 'neutral';
  return value > 0 ? 'positive' : 'negative';
}

export function shortScenario(scenario: string): string {
  return scenario.replace('，去text', '').replace('，加背景色', ' + 背景').replace(' 非lazy', '').replace(' lazy', ' Lazy');
}
