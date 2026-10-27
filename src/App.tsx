import { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, BarChart3, BookOpen, Boxes, ChevronDown, Gauge, GitCompareArrows, Menu, Search, X } from 'lucide-react';
import Overview from './pages/Overview';
import Compare from './pages/Compare';
import ScenarioDetail from './pages/ScenarioDetail';
import Docs from './pages/Docs';
import { filterRecords } from './lib/metrics';
import { latestVersion, records, versions } from './data/benchmarks';
import type { Platform } from './data/benchmarks';

export type Page = 'overview' | 'compare' | 'scenario' | 'docs';

const navigation = [
  { id: 'overview' as const, label: '性能总览', icon: Gauge },
  { id: 'compare' as const, label: '版本对比', icon: GitCompareArrows },
  { id: 'scenario' as const, label: '场景分析', icon: BarChart3 },
  { id: 'docs' as const, label: '指标与口径', icon: BookOpen },
];

const pageCopy: Record<Page, { eyebrow: string; title: string; description: string }> = {
  overview: { eyebrow: 'PERFORMANCE OVERVIEW', title: '性能看护总览', description: '跟踪每个版本的性能变化，及时发现优化与回退。' },
  compare: { eyebrow: 'RELEASE COMPARISON', title: '版本对比', description: '以统一口径比较版本产物，定位具体场景的指标变化。' },
  scenario: { eyebrow: 'SCENARIO ANALYSIS', title: '场景分析', description: '从 benchmark 场景下钻到平台与渲染方式。' },
  docs: { eyebrow: 'METRIC HANDBOOK', title: '指标与统计口径', description: '统一数据定义，让每一次性能结论都可解释、可复现。' },
};

export default function App() {
  const [page, setPage] = useState<Page>('overview');
  const [current, setCurrent] = useState(latestVersion);
  const [baseline, setBaseline] = useState(versions[1]);
  const [platform, setPlatform] = useState<'all' | Platform>('all');
  const [query, setQuery] = useState('');
  const [selectedScenario, setSelectedScenario] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const filtered = useMemo(() => filterRecords(records, platform, query), [platform, query]);
  const copy = pageCopy[page];

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  const navigate = (next: Page) => {
    setPage(next);
    setMobileOpen(false);
  };
  const openScenario = (scenario: string) => {
    setSelectedScenario(scenario);
    navigate('scenario');
  };

  return (
    <div className="app-shell">
      {mobileOpen && <button className="sidebar-scrim" aria-label="关闭导航" onClick={() => setMobileOpen(false)} />}
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Activity size={22} /></div>
          <div><strong>FrameScope</strong><span>性能看护平台</span></div>
          <button className="mobile-close icon-button" onClick={() => setMobileOpen(false)} aria-label="关闭菜单"><X size={19} /></button>
        </div>
        <div className="workspace-label">工作空间</div>
        <div className="project-switch"><Boxes size={17} /><span>KMP & CMP 框架</span><ChevronDown size={14} /></div>
        <nav className="main-nav" aria-label="主导航">
          <span className="nav-section-label">数据分析</span>
          {navigation.slice(0, 3).map(({ id, label, icon: Icon }) => (
            <button key={id} className={page === id ? 'active' : ''} onClick={() => navigate(id)}>
              <Icon size={18} /><span>{label}</span>{id === 'compare' && <span className="nav-dot" />}
            </button>
          ))}
          <span className="nav-section-label secondary">配置与帮助</span>
          {navigation.slice(3).map(({ id, label, icon: Icon }) => (
            <button key={id} className={page === id ? 'active' : ''} onClick={() => navigate(id)}><Icon size={18} /><span>{label}</span></button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="release-mini">
            <div className="release-mini-top"><span className="status-dot" />当前观测版本</div>
            <strong>{latestVersion}</strong>
            <span>8 个场景 · 8 个历史基线</span>
          </div>
          <div className="team-profile"><div className="avatar">FT</div><div><strong>Framework Team</strong><span>跨平台框架组</span></div></div>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <button className="menu-button icon-button" onClick={() => setMobileOpen(true)} aria-label="打开导航"><Menu size={21} /></button>
          <div className="breadcrumb"><span>性能看护</span><span>/</span><strong>{copy.title}</strong></div>
          <label className="global-search"><Search size={17} /><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索场景、设备或渲染方式…" aria-label="搜索 benchmark" />{query && <button onClick={() => setQuery('')} aria-label="清空搜索"><X size={15} /></button>}<kbd>⌘ K</kbd></label>
        </header>

        <main className="content">
          <section className="page-heading">
            <div><span className="eyebrow">{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.description}</p></div>
            <div className="data-freshness"><span className="status-dot" />数据已载入<span className="freshness-divider" />{records.length} 条记录</div>
          </section>

          {page !== 'docs' && (
            <section className="filter-bar" aria-label="版本和平台筛选">
              <div className="filter-title">对比条件</div>
              <label><span>当前版本</span><select value={current} onChange={(event) => { const next = event.target.value; if (next === baseline) setBaseline(current); setCurrent(next); }}>{versions.map((version) => <option key={version}>{version}</option>)}</select></label>
              <GitCompareArrows className="filter-arrow" size={17} />
              <label><span>基线版本</span><select value={baseline} onChange={(event) => setBaseline(event.target.value)}>{versions.filter((version) => version !== current).map((version) => <option key={version}>{version}</option>)}</select></label>
              <div className="filter-separator" />
              <label className="platform-filter"><span>平台</span><select value={platform} onChange={(event) => setPlatform(event.target.value as 'all' | Platform)}><option value="all">全部平台</option><option value="harmony">鸿蒙 · Mate80Pro</option><option value="ios">iOS</option></select></label>
              {(query || platform !== 'all') && <button className="text-button reset-filter" onClick={() => { setQuery(''); setPlatform('all'); }}>重置筛选</button>}
            </section>
          )}

          {platform !== 'ios' && page !== 'docs' && <div className="data-note"><span>i</span>iOS 在 {latestVersion} 列沿用 0.5.0-11 数据，仅作历史参照，不代表本轮新测。</div>}

          {page === 'overview' && <Overview records={filtered} current={current} baseline={baseline} onOpenScenario={openScenario} />}
          {page === 'compare' && <Compare records={filtered} current={current} baseline={baseline} onOpenScenario={openScenario} />}
          {page === 'scenario' && <ScenarioDetail records={filtered} current={current} baseline={baseline} selectedScenario={selectedScenario} onSelectScenario={setSelectedScenario} onClearSearch={() => setQuery('')} />}
          {page === 'docs' && <Docs />}
          <footer className="page-footer">FrameScope · KMP & CMP Benchmark 性能看护 <span>数据来源：基线数据 / 1.2.0-07</span></footer>
        </main>
      </div>
    </div>
  );
}
