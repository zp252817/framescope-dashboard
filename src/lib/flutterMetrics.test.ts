import { describe, expect, it } from 'vitest';
import { flutterRecords } from '../data/flutter';
import { filterFlutterRecords, flutterMean, flutterSum, rasterBudgetRate } from './flutterMetrics';

describe('Flutter JSON aggregation', () => {
  it('imports all 68 independent JSON results with one commit', () => {
    expect(flutterRecords).toHaveLength(68);
    expect(new Set(flutterRecords.map((record) => record.commit))).toHaveProperty('size', 1);
    expect(flutterRecords.every((record) => record.status === 'Succeeded')).toBe(true);
  });

  it('keeps Timeline and E2E as separate test records', () => {
    expect(flutterRecords.filter((record) => record.type === 'Timeline')).toHaveLength(37);
    expect(flutterRecords.filter((record) => record.type === 'E2E')).toHaveLength(31);
    expect(filterFlutterRecords(flutterRecords, '', 'gap_audit', 'E2E')).toHaveLength(2);
  });

  it('matches the supplied summary aggregate values', () => {
    expect(flutterMean(flutterRecords, 'averageBuild')).toBeCloseTo(1.978, 3);
    expect(flutterMean(flutterRecords, 'averageRaster')).toBeCloseTo(8.403, 3);
    expect(flutterSum(flutterRecords, 'missedRaster')).toBe(603);
  });

  it('preserves real values from the home scroll JSON', () => {
    const home = flutterRecords.find((record) => record.name === 'home_scroll_perf_ohos__timeline_summary');
    expect(home?.metrics.averageBuild).toBeCloseTo(1.362496, 5);
    expect(home?.metrics.averageRaster).toBeCloseTo(6.895619, 5);
    expect(home?.metrics.frames).toBe(252);
    expect(home?.metrics.gpuMemory).toBeCloseTo(127.06457, 4);
  });

  it('calculates raster budget ratio per test without calling it frame drop rate', () => {
    const record = flutterRecords.find((item) => item.name.includes('backdrop_filter_perf_ohos__e2e'));
    expect(record?.metrics.missedRaster).toBe(231);
    expect(record?.metrics.frames).toBe(231);
    expect(record ? rasterBudgetRate(record) : 0).toBe(100);
  });

  it('filters by app, type, and original or display name', () => {
    expect(filterFlutterRecords(flutterRecords, 'music chat')).toHaveLength(2);
    expect(filterFlutterRecords(flutterRecords, '', 'platform_views')).toHaveLength(5);
    expect(filterFlutterRecords(flutterRecords, '', 'all', 'Timeline')).toHaveLength(37);
  });
});
