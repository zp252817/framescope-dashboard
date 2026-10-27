import type { FlutterMetrics, FlutterRecord } from '../data/flutter';

export type FlutterMetricKey = keyof FlutterMetrics;

export const flutterMetricMeta: Record<FlutterMetricKey, { label: string; short: string; unit: string; decimals: number }> = {
  averageBuild: { label: '平均帧构建', short: '构建均值', unit: 'ms', decimals: 2 },
  p90Build: { label: 'P90 帧构建', short: '构建 P90', unit: 'ms', decimals: 2 },
  p99Build: { label: 'P99 帧构建', short: '构建 P99', unit: 'ms', decimals: 2 },
  worstBuild: { label: '最差帧构建', short: '构建最差', unit: 'ms', decimals: 2 },
  averageRaster: { label: '平均光栅化', short: '光栅均值', unit: 'ms', decimals: 2 },
  p90Raster: { label: 'P90 光栅化', short: '光栅 P90', unit: 'ms', decimals: 2 },
  p99Raster: { label: 'P99 光栅化', short: '光栅 P99', unit: 'ms', decimals: 2 },
  worstRaster: { label: '最差光栅化', short: '光栅最差', unit: 'ms', decimals: 2 },
  missedBuild: { label: '超预算构建帧', short: '构建超预算', unit: '帧', decimals: 0 },
  missedRaster: { label: '超预算光栅化帧', short: '光栅超预算', unit: '帧', decimals: 0 },
  frames: { label: '总帧数', short: '帧数', unit: '帧', decimals: 0 },
  oldGc: { label: 'Old GC', short: 'Old GC', unit: '次', decimals: 0 },
  newGc: { label: 'New GC', short: 'New GC', unit: '次', decimals: 0 },
  gpuMemory: { label: '平均 GPU 内存', short: 'GPU 内存', unit: 'MB', decimals: 2 },
};

export function flutterMean(records: FlutterRecord[], metric: FlutterMetricKey): number | undefined {
  const values = records.map((record) => record.metrics[metric]).filter((value): value is number => typeof value === 'number');
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : undefined;
}

export function flutterSum(records: FlutterRecord[], metric: FlutterMetricKey): number {
  return records.reduce((sum, record) => sum + (record.metrics[metric] ?? 0), 0);
}

export function filterFlutterRecords(records: FlutterRecord[], query: string, app = 'all', type = 'all'): FlutterRecord[] {
  const normalized = query.trim().toLocaleLowerCase();
  return records.filter((record) => (app === 'all' || record.app === app) && (type === 'all' || record.type === type) && (!normalized || `${record.name} ${record.displayName} ${record.app} ${record.type}`.toLocaleLowerCase().includes(normalized)));
}

export function flutterValue(record: FlutterRecord, metric: FlutterMetricKey): string {
  const value = record.metrics[metric];
  if (value === undefined) return '—';
  return value.toLocaleString('zh-CN', { minimumFractionDigits: flutterMetricMeta[metric].decimals, maximumFractionDigits: flutterMetricMeta[metric].decimals });
}

export function flutterNumber(value: number | undefined, metric: FlutterMetricKey): string {
  if (value === undefined) return '—';
  return value.toLocaleString('zh-CN', { minimumFractionDigits: flutterMetricMeta[metric].decimals, maximumFractionDigits: flutterMetricMeta[metric].decimals });
}

export function rasterBudgetRate(record: FlutterRecord): number {
  return record.metrics.frames ? (record.metrics.missedRaster / record.metrics.frames) * 100 : 0;
}

export const flutterApps = ['complex_layout', 'flutter_gallery', 'platform_views', 'macrobenchmarks', 'gap_audit'];
export const flutterAppLabels: Record<string, string> = {
  complex_layout: 'Complex Layout',
  flutter_gallery: 'Flutter Gallery',
  platform_views: 'Platform Views',
  macrobenchmarks: 'Macrobenchmarks',
  gap_audit: 'Gap Audit',
};
