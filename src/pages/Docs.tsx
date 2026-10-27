import { ArrowDownRight, ArrowUpRight, ExternalLink, FileSpreadsheet, Info, Sigma, TimerReset } from 'lucide-react';
import { metricMeta, coreMetrics } from '../lib/metrics';
import { sourceUrl } from '../data/benchmarks';

export default function Docs() {
  return (
    <div className="docs-layout">
      <section className="docs-main">
        <article className="panel doc-hero"><div className="doc-hero-icon"><Sigma size={25} /></div><div><h2>同一个数字，同一套解释</h2><p>看板统一使用“优化率”描述版本变化。无论原始指标是越大越好还是越小越好，<strong>正数始终代表优化，负数始终代表劣化。</strong></p></div></article>
        <article className="panel doc-section"><div className="doc-section-title"><span>01</span><div><h2>优化率计算</h2><p>根据指标方向采用不同公式，消除阅读歧义。</p></div></div><div className="formula-grid"><div><div className="formula-title negative-direction"><ArrowDownRight size={17} />越小越好</div><code>(基线值 − 当前值) / 基线值 × 100%</code><p>适用于响应/完成时延、内存、指令数。</p></div><div><div className="formula-title positive-direction"><ArrowUpRight size={17} />越大越好</div><code>(当前值 − 基线值) / 基线值 × 100%</code><p>适用于 PresentFence FPS 等帧率指标。</p></div></div><div className="formula-example"><span>示例</span>响应时延从 <strong>50 ms</strong> 降至 <strong>45 ms</strong>，优化率为 <strong className="positive-text">+10.00%</strong>。</div></article>
        <article className="panel doc-section"><div className="doc-section-title"><span>02</span><div><h2>核心指标定义</h2><p>总览中的综合优化率由以下四项指标等权平均。</p></div></div><div className="definition-list">{coreMetrics.map((metric) => <div key={metric}><span className="definition-color" style={{ background: metricMeta[metric].color }} /><div><strong>{metricMeta[metric].label}</strong><p>{metric === 'response' ? '从操作触发到页面开始响应的时间，越低越好。' : metric === 'completion' ? '从操作触发到场景加载完成的时间，越低越好。' : metric === 'frameRate' ? '优先采用 PresentFence FPS；历史版本缺失时依次采用 RS FPS 或平均 FPS。' : 'benchmark 执行期间的平均内存占用，越低越好。'}</p></div><span className="direction-tag">{metricMeta[metric].higherIsBetter ? '越高越好' : '越低越好'}</span></div>)}</div></article>
        <article className="panel doc-section"><div className="doc-section-title"><span>03</span><div><h2>测试与数据边界</h2><p>阅读趋势前，需要了解数据采集方式和缺失值处理。</p></div></div><div className="doc-notes"><div><TimerReset size={19} /><div><strong>时延统计</strong><p>每个场景执行 10 轮，去除第 1 轮，再去掉最高、最低各 1 次，取剩余 7 轮均值。</p></div></div><div><Info size={19} /><div><strong>缺失与占位数据</strong><p>缺失值不参与均值和综合优化率计算。iOS 在 1.2.0-07 列沿用 0.5.0-11 数据，并非本轮新测。</p></div></div></div></article>
      </section>
      <aside className="docs-side">
        <article className="panel source-card"><FileSpreadsheet size={22} /><h3>原始数据来源</h3><p>腾讯文档 · 基线数据<br />工作表：1.2.0-07</p><a href={sourceUrl} target="_blank" rel="noreferrer">打开原始表格<ExternalLink size={14} /></a></article>
        <article className="panel scope-card"><h3>当前数据范围</h3><dl><div><dt>Benchmark 场景</dt><dd>8</dd></div><div><dt>平台组合记录</dt><dd>24</dd></div><div><dt>历史版本</dt><dd>8</dd></div><div><dt>鸿蒙测试设备</dt><dd>Mate80Pro</dd></div></dl></article>
        <article className="doc-tip"><Info size={16} /><p>版本综合表现用于快速发现问题，具体结论仍应结合场景、渲染方式和原始数值判断。</p></article>
      </aside>
    </div>
  );
}
