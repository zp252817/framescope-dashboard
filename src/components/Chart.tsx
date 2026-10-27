import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

interface ChartProps {
  option: EChartsOption;
  height?: number;
  onClick?: (index: number) => void;
  ariaLabel: string;
}

export default function Chart({ option, height = 280, onClick, ariaLabel }: ChartProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);
  const clickRef = useRef(onClick);
  clickRef.current = onClick;

  useEffect(() => {
    if (!elementRef.current) return;
    const chart = echarts.init(elementRef.current);
    chartRef.current = chart;
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(elementRef.current);
    chart.on('click', (params) => {
      if (typeof params.dataIndex === 'number') clickRef.current?.(params.dataIndex);
    });
    return () => {
      observer.disconnect();
      chart.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    chartRef.current?.setOption(option, true);
  }, [option]);

  return <div ref={elementRef} className="chart" style={{ height }} role="img" aria-label={ariaLabel} />;
}
