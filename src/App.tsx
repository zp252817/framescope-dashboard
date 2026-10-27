import { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, BarChart3, BookOpen, Boxes, ChevronDown, Gauge, GitCompareArrows, Menu, Search, X } from 'lucide-react';
import Overview from './pages/Overview';
import Compare from './pages/Compare';
import ScenarioDetail from './pages/ScenarioDetail';
import Docs from './pages/Docs';
import FlutterOverview from './pages/FlutterOverview';
import FlutterCompare from './pages/FlutterCompare';
import FlutterDetail from './pages/FlutterDetail';
import FlutterDocs from './pages/FlutterDocs';
import { filterRecords } from './lib/metrics';
import { filterFlutterRecords, flutterApps, flutterAppLabels } from './lib/flutterMetrics';
import { latestVersion, records, versions } from './data/benchmarks';
import { flutterMeta, flutterRecords } from './data/flutter';
import type { Platform } from './data/benchmarks';

export type Page = 'overview' | 'compare' | 'scenario' | 'docs';
type Framework = 'kmp' | 'flutter';

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

const flutterPageCopy: Record<Page, { eyebrow: string; title: string; description: string }> = {
  overview: { eyebrow: 'FLUTTER PERFORMANCE', title: 'Flutter 性能总览', description: '独立查看 Flutter OHOS 帧构建、光栅化和帧预算表现。' },
  compare: { eyebrow: 'FLUTTER TEST RESULTS', title: 'Flutter 用例明细', description: '将单项 JSON 统一汇总，快速筛选和定位测试数据。' },
  scenario: { eyebrow: 'FLUTTER TEST DETAIL', title: 'Flutter 用例分析', description: '查看单个用例的耗时分布、帧预算、GC 与测试环境。' },
  docs: { eyebrow: 'FLUTTER METRIC HANDBOOK', title: 'Flutter 指标与口径', description: '独立的数据定义，不与 KMP/CMP 做跨框架横向对比。' },
};

export default function App() {
  const [framework, setFramework] = useState<Framework>('kmp');
  const [page, setPage] = useState<Page>('overview');
  const [current, setCurrent] = useState(latestVersion);
  const [baseline, setBaseline] = useState(versions[1]);
  const [platform, setPlatform] = useState<'all' | Platform>('all');
  const [flutterApp, setFlutterApp] = useState('all');
  const [flutterType, setFlutterType] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedScenario, setSelectedScenario] = useState('');
  const [selectedFlutterId, setSelectedFlutterId] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const filtered = useMemo(() => filterRecords(records, platform, query), [platform, query]);
  const filteredFlutter = useMemo(() => filterFlutterRecords(flutterRecords, query, flutterApp, flutterType), [query, flutterApp, flutterType]);
  const copy = (framework === 'flutter' ? flutterPageCopy : pageCopy)[page];

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
  const openFlutterRecord = (id: string) => {
    setSelectedFlutterId(id);
    navigate('scenario');
  };
  const switchFramework = (next: Framework) => {
    setFramework(next);
    setQuery('');
    setFlutterApp('all');
    setFlutterType('all');
  };
  const resetFilters = () => {
    setQuery('');
    setPlatform('all');
    setFlutterApp('all');
    setFlutterType('all');
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
        <div className="workspace-label">独立框架工作空间</div>
        <label className={`project-switch ${framework === 'flutter' ? 'flutter-active' : ''}`}><Boxes size={17} /><select aria-label="选择框架" value={framework} onChange={(event) => switchFramework(event.target.value as Framework)}><option value="kmp">KMP & CMP 框架</option><option value="flutter">Flutter 框架</option></select><ChevronDown size={14} /></label>
        <nav className="main-nav" aria-label="主导航">
          <span className="nav-section-label">数据分析</span>
          {navigation.slice(0, 3).map(({ id, label, icon: Icon }) => (
            <button key={id} className={page === id ? 'active' : ''} onClick={() => navigate(id)}>
              <Icon size={18} /><span>{framework === 'flutter' && id === 'compare' ? '用例明细' : framework === 'flutter' && id === 'scenario' ? '用例分析' : label}</span>{id === 'compare' && framework === 'kmp' && <span className="nav-dot" />}
            </button>
          ))}
          <span className="nav-section-label secondary">配置与帮助</span>
          {navigation.slice(3).map(({ id, label, icon: Icon }) => (
            <button key={id} className={page === id ? 'active' : ''} onClick={() => navigate(id)}><Icon size={18} /><span>{label}</span></button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="release-mini">
            <div className="release-mini-top"><span className="status-dot" />{framework === 'flutter' ? '当前 Flutter 批次' : '当前观测版本'}</div>
            <strong className={framework === 'flutter' ? 'flutter-release-version' : ''}>{framework === 'flutter' ? flutterMeta.version : latestVersion}</strong>
            <span>{framework === 'flutter' ? '68 个用例 · 5 个测试分组' : '8 个场景 · 8 个历史基线'}</span>
          </div>
          <div className="team-profile"><div className="avatar">FT</div><div><strong>Framework Team</strong><span>跨平台框架组</span></div></div>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <button className="menu-button icon-button" onClick={() => setMobileOpen(true)} aria-label="打开导航"><Menu size={21} /></button>
          <div className="breadcrumb"><span>{framework === 'flutter' ? 'Flutter' : 'KMP & CMP'} / 独立数据</span><span>/</span><strong>{copy.title}</strong></div>
          <label className="global-search"><Search size={17} /><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={framework === 'flutter' ? '搜索 Flutter 用例、分组或类型…' : '搜索场景、设备或渲染方式…'} aria-label="搜索 benchmark" />{query && <button onClick={() => setQuery('')} aria-label="清空搜索"><X size={15} /></button>}<kbd>⌘ K</kbd></label>
        </header>

        <main className="content">
          <section className="page-heading">
            <div><span className="eyebrow">{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.description}</p></div>
            <div className="data-freshness"><span className="status-dot" />数据已载入<span className="freshness-divider" />{framework === 'flutter' ? flutterRecords.length : records.length} 条记录</div>
          </section>

          {page !== 'docs' && framework === 'kmp' && (
            <section className="filter-bar" aria-label="版本和平台筛选">
              <div className="filter-title">对比条件</div>
              <label><span>当前版本</span><select value={current} onChange={(event) => { const next = event.target.value; if (next === baseline) setBaseline(current); setCurrent(next); }}>{versions.map((version) => <option key={version}>{version}</option>)}</select></label>
              <GitCompareArrows className="filter-arrow" size={17} />
              <label><span>基线版本</span><select value={baseline} onChange={(event) => setBaseline(event.target.value)}>{versions.filter((version) => version !== current).map((version) => <option key={version}>{version}</option>)}</select></label>
              <div className="filter-separator" />
              <label className="platform-filter"><span>平台</span><select value={platform} onChange={(event) => setPlatform(event.target.value as 'all' | Platform)}><option value="all">全部平台</option><option value="harmony">鸿蒙 · Mate80Pro</option><option value="ios">iOS</option></select></label>
              {(query || platform !== 'all') && <button className="text-button reset-filter" onClick={resetFilters}>重置筛选</button>}
            </section>
          )}

          {page !== 'docs' && framework === 'flutter' && (
            <section className="filter-bar" aria-label="Flutter 用例筛选">
              <div className="filter-title">用例筛选</div>
              <label><span>测试分组</span><select value={flutterApp} onChange={(event) => setFlutterApp(event.target.value)}><option value="all">全部分组</option>{flutterApps.map((app) => <option key={app} value={app}>{flutterAppLabels[app]}</option>)}</select></label>
              <div className="filter-separator" />
              <label><span>用例类型</span><select value={flutterType} onChange={(event) => setFlutterType(event.target.value)}><option value="all">Timeline + E2E</option><option value="Timeline">Timeline</option><option value="E2E">E2E</option></select></label>
              <span className="single-batch-badge">单批次 · {flutterMeta.batch}</span>
              {(query || flutterApp !== 'all' || flutterType !== 'all') && <button className="text-button reset-filter" onClick={resetFilters}>重置筛选</button>}
            </section>
          )}

          {framework === 'kmp' && platform !== 'ios' && page !== 'docs' && <div className="data-note"><span>i</span>iOS 在 {latestVersion} 列沿用 0.5.0-11 数据，仅作历史参照，不代表本轮新测。</div>}
          {framework === 'flutter' && page !== 'docs' && <div className="data-note flutter-note"><span>i</span>Flutter 当前仅有单批次数据，不展示版本趋势；与 KMP/CMP 数据完全独立，不做跨框架横向对比。</div>}

          {framework === 'kmp' && page === 'overview' && <Overview records={filtered} current={current} baseline={baseline} onOpenScenario={openScenario} />}
          {framework === 'kmp' && page === 'compare' && <Compare records={filtered} current={current} baseline={baseline} onOpenScenario={openScenario} />}
          {framework === 'kmp' && page === 'scenario' && <ScenarioDetail records={filtered} current={current} baseline={baseline} selectedScenario={selectedScenario} onSelectScenario={setSelectedScenario} onClearSearch={() => setQuery('')} />}
          {framework === 'kmp' && page === 'docs' && <Docs />}
          {framework === 'flutter' && page === 'overview' && <FlutterOverview records={filteredFlutter} onOpenRecord={openFlutterRecord} />}
          {framework === 'flutter' && page === 'compare' && <FlutterCompare records={filteredFlutter} onOpenRecord={openFlutterRecord} />}
          {framework === 'flutter' && page === 'scenario' && <FlutterDetail records={filteredFlutter} selectedId={selectedFlutterId} onSelect={setSelectedFlutterId} onClearSearch={() => setQuery('')} />}
          {framework === 'flutter' && page === 'docs' && <FlutterDocs />}
          <footer className="page-footer">FrameScope · {framework === 'flutter' ? 'Flutter OHOS Benchmark 独立视图' : 'KMP & CMP Benchmark 性能看护'}<span>{framework === 'flutter' ? '数据来源：68 份单项 JSON / 20261016' : '数据来源：基线数据 / 1.2.0-07'}</span></footer>
        </main>
      </div>
    </div>
  );
}
