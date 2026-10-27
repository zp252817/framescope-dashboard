import { describe, expect, it } from 'vitest';
import { records } from '../data/benchmarks';
import { aggregateMetric, calculateChange, comparisonItems, filterRecords, getMetricValue, overallScore, trend } from './metrics';

describe('benchmark metric calculations', () => {
  it('uses positive values for latency and memory improvements', () => {
    expect(calculateChange(45, 50, 'response')).toBe(10);
    expect(calculateChange(50, 45, 'averageMemory')).toBeCloseTo(-11.1111, 3);
  });

  it('uses positive values for FPS improvements', () => {
    expect(calculateChange(121, 120, 'frameRate')).toBeCloseTo(0.8333, 3);
  });

  it('does not treat missing data as zero', () => {
    expect(calculateChange(undefined, 50, 'response')).toBeNull();
    expect(calculateChange(50, undefined, 'response')).toBeNull();
    expect(calculateChange(50, 0, 'response')).toBeNull();
  });

  it('imports every scenario and platform combination', () => {
    expect(records).toHaveLength(24);
    expect(new Set(records.map((record) => record.scenario))).toHaveProperty('size', 8);
    expect(filterRecords(records, 'harmony')).toHaveLength(16);
    expect(filterRecords(records, 'ios')).toHaveLength(8);
  });

  it('filters by scenario and rendering mode', () => {
    expect(filterRecords(records, 'all', '淘宝')).toHaveLength(3);
    expect(filterRecords(records, 'harmony', '统一渲染')).toHaveLength(8);
  });

  it('matches a real response latency value from the sheet', () => {
    const first = records[0];
    expect(getMetricValue(first, '1.2.0-07', 'response')).toBe(44.89);
    expect(calculateChange(getMetricValue(first, '1.2.0-07', 'response'), getMetricValue(first, '1.2.0-02', 'response'), 'response')).toBeCloseTo(-7.5729, 3);
  });

  it('falls back to historical FPS fields without inventing data', () => {
    const first = records[0];
    expect(getMetricValue(first, '1.2.0-07', 'frameRate')).toBe(119.94);
    expect(getMetricValue(first, '0.3.0-perf', 'frameRate')).toBe(120.22);
    expect(getMetricValue(first, '0.3.0-perf', 'appInstructions')).toBe(4961936161);
  });

  it('returns eight chronological trend points and comparable aggregates', () => {
    expect(trend(records, 'response')).toHaveLength(8);
    const aggregate = aggregateMetric(records, '1.2.0-07', '1.2.0-02', 'response');
    expect(aggregate.samples).toBe(24);
    expect(aggregate.change).not.toBeNull();
    expect(overallScore(records, '1.2.0-07', '1.2.0-02')).not.toBeNull();
    expect(comparisonItems(records, '1.2.0-07', '1.2.0-02')).toHaveLength(96);
  });
});
