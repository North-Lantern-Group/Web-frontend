/* Operations Console: hero right panel
   An elite-feeling live systems view. Four tiles, choreographed by a
   central clock that emits "sync" events every few seconds. Each event
   cascades across tiles with small flash / glow moments to telegraph
   cause and effect.

   Design notes:
   - All numbers are tabular-nums so rows never reflow.
   - Reduced-motion: continuous animation is suspended; the tiles show
     a last-known snapshot.
   - Pause button halts all clocks (user control).
*/

const { useState, useEffect, useRef, useMemo, useCallback } = React;

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReduce(m.matches);
    handler();
    m.addEventListener?.('change', handler);
    return () => m.removeEventListener?.('change', handler);
  }, []);
  return reduce;
}

/* Central tick: emits an incrementing integer every `ms` ms unless paused.
   Tiles subscribe to it to stay in-phase without their own timers. */
function useHeartbeat(ms, paused) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setT(x => x + 1), ms);
    return () => clearInterval(id);
  }, [ms, paused]);
  return t;
}

/* Seeded PRNG so sparklines render identically on every mount. */
function seededRand(seed) {
  let s = seed | 0;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return ((s >>> 0) % 10000) / 10000;
  };
}

/* Small sparkline component. Accepts a data array (0..1) and animates
   in new points by shifting existing points left. */
function Sparkline({ data, stroke = "var(--brand-hi)", fill = true, height = 28 }) {
  const w = 100, h = height;
  const step = data.length > 1 ? w / (data.length - 1) : w;
  const pts = data.map((v, i) => `${(i * step).toFixed(2)},${(h - 2 - v * (h - 4)).toFixed(2)}`);
  const line = `M${pts.join(" L")}`;
  const area = `${line} L${w},${h} L0,${h} Z`;
  const gid = useMemo(() => `sg-${Math.random().toString(36).slice(2, 8)}`, []);
  return (
    <svg className="sl" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true" style={{ height }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={stroke} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#${gid})`}/>}
      <path d={line} fill="none" stroke={stroke} strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

/* ─────────────────────── Console chrome ─────────────────────── */
function ConsoleChrome({ paused, setPaused, tick }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [paused]);

  const hh = String(now.getUTCHours()).padStart(2, '0');
  const mm = String(now.getUTCMinutes()).padStart(2, '0');
  const ss = String(now.getUTCSeconds()).padStart(2, '0');

  // Health sparkline jitters subtly with each heartbeat
  const health = useMemo(() => {
    const rand = seededRand(1337 + tick);
    return Array.from({ length: 18 }, (_, i) => 0.55 + Math.sin((tick + i) * 0.7) * 0.15 + rand() * 0.12);
  }, [tick]);

  return (
    <div className="console-chrome">
      <div className="cc-left">
        <span className={`hb ${paused ? 'off' : ''}`} aria-hidden="true"></span>
        <span className="cc-title">NLG.OPS</span>
        <span className="cc-sep">//</span>
        <span className="cc-sub">production · read-only demo</span>
      </div>
      <div className="cc-center" aria-live="off">
        <span className="cc-clock">
          <span className="n">{hh}</span>:<span className="n">{mm}</span>:<span className="n">{ss}</span>
        </span>
        <span className="cc-zone">UTC</span>
      </div>
      <div className="cc-right">
        <span className="cc-health" aria-label="System health">
          <Sparkline data={health} stroke="var(--success)" fill={false} height={14}/>
        </span>
        <span className="cc-status"><span className="ok-dot" aria-hidden="true"></span>nominal</span>
        <button className="console-pause"
                onClick={() => setPaused(p => !p)}
                aria-label={paused ? "Resume log updates" : "Pause log updates"}>
          {paused ? "resume" : "pause"}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────── Tile 1: Atlassian Sync ─────────────────────── */
const ATL_SERVICES = [
  { id: "JIRA-04",    label: "jira.04",     tag: "Jira Cloud",     baseLast: 12, baseMetric: "142/s",  trend: [0.4, 0.45, 0.5, 0.42, 0.55, 0.6, 0.58, 0.65, 0.62, 0.7, 0.68, 0.75] },
  { id: "JSM-QUEUE",  label: "jsm.queue",   tag: "Service Mgmt",   baseLast: 3,  baseMetric: "4 open", trend: [0.3, 0.35, 0.4, 0.38, 0.42, 0.45, 0.43, 0.48, 0.46, 0.5, 0.48, 0.52] },
  { id: "CONF-OPS",   label: "conf.ops",    tag: "Confluence",     baseLast: 27, baseMetric: "clean",  trend: [0.5, 0.55, 0.52, 0.58, 0.6, 0.55, 0.62, 0.6, 0.65, 0.63, 0.68, 0.7] },
  { id: "AUTO-17",    label: "auto.17",     tag: "Automation",     baseLast: 8,  baseMetric: "1 retry", trend: [0.3, 0.28, 0.35, 0.32, 0.4, 0.5, 0.7, 0.4, 0.35, 0.4, 0.38, 0.42], amber: true },
];

function TileAtlassian({ tick, pulse }) {
  // `pulse` is the index of the service currently syncing this heartbeat
  const eventsPerMin = 128 + (tick * 3) % 40;
  return (
    <div className="tile tile-atlassian" role="group" aria-label="Atlassian sync status">
      <div className="tile-head">
        <span>atlassian · sync</span>
        <span className="tag">4 services</span>
      </div>
      <div className="tile-body">
        <ul className="svc-list">
          {ATL_SERVICES.map((s, i) => {
            const last = (s.baseLast + tick * 2) % 60;
            const isSyncing = pulse === i;
            return (
              <li key={s.id} className={`svc-row ${isSyncing ? 'syncing' : ''} ${s.amber ? 'amber' : ''}`}>
                <span className={`svc-dot ${s.amber ? 'amber' : 'ok'}`} aria-hidden="true"></span>
                <span className="svc-name">{s.label}</span>
                <span className="svc-metric">{s.baseMetric}</span>
                <span className="svc-last"><span className="n">{String(last).padStart(2,'0')}</span>s</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="tile-foot">
        <span className="foot-k">events/min</span>
        <span className="foot-v n">{eventsPerMin}</span>
      </div>
    </div>
  );
}

/* ─────────────────────── Tile 2: Pipeline ─────────────────────── */
const STAGES = ["extract", "transform", "load"];

function TilePipeline({ paused, tick }) {
  // 10-second run cycle; stages light at 0%, 33%, 66%, done at 100%, then new run
  const runLen = 10000;
  const [progress, setProgress] = useState(0);
  const [runId, setRunId] = useState(4832);
  const [throughput, setThroughput] = useState(18432);
  const startedAt = useRef(performance.now());

  useEffect(() => {
    if (paused) return;
    let raf;
    const tickRAF = (t) => {
      const elapsed = (t - startedAt.current) % runLen;
      const p = elapsed / runLen;
      setProgress(p);
      if (p < 0.01 && performance.now() - startedAt.current > 500) {
        setRunId(r => r + 1);
        setThroughput(Math.floor(15000 + Math.random() * 7000));
        startedAt.current = t;
      }
      setThroughput(th => th + Math.floor(3 + Math.random() * 8));
      raf = requestAnimationFrame(tickRAF);
    };
    raf = requestAnimationFrame(tickRAF);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const activeStage = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2;
  const etaMs = Math.max(0, runLen - progress * runLen);
  const etaSec = Math.ceil(etaMs / 1000);
  const rate = 1100 + ((tick * 31) % 400);

  return (
    <div className="tile tile-pipeline" role="group" aria-label="ETL pipeline run status">
      <div className="tile-head">
        <span>etl_revenue</span>
        <span className={`tag tag-ok ${progress < 0.99 ? 'running' : ''}`}>
          {progress < 0.98 ? "running" : "ok"}
        </span>
      </div>
      <div className="tile-body">
        <div className="run-head">
          <span className="run-id">run <span className="n">#{runId}</span></span>
          <span className="run-eta">eta <span className="n">{String(Math.floor(etaSec / 60)).padStart(2,'0')}:{String(etaSec % 60).padStart(2,'0')}</span></span>
        </div>

        <div className="pipe" aria-hidden="true">
          <div className="pipe-fill" style={{ width: `${(progress * 100).toFixed(2)}%` }}></div>
          <div className="pipe-ticks">
            {STAGES.map((_, i) => <span key={i} className="pipe-tick" style={{ left: `${(i / STAGES.length) * 100}%` }}></span>)}
          </div>
          <div className="pipe-head" style={{ left: `${(progress * 100).toFixed(2)}%` }}></div>
        </div>

        <ul className="stage-list">
          {STAGES.map((s, i) => (
            <li key={s} className={`stage ${i < activeStage ? 'done' : i === activeStage ? 'active' : 'pending'}`}>
              <span className="stage-glyph" aria-hidden="true">
                {i < activeStage ? "✓" : i === activeStage ? "▸" : "·"}
              </span>
              <span className="stage-name">{s}</span>
              <span className="stage-time n">
                {i < activeStage ? "done" : i === activeStage ? `${Math.floor((progress - i/3) * 300)}s` : "—"}
              </span>
            </li>
          ))}
        </ul>

        <div className="run-foot">
          <div className="rf-item">
            <span className="rf-k">rows</span>
            <span className="rf-v n">{throughput.toLocaleString()}</span>
          </div>
          <div className="rf-item">
            <span className="rf-k">rate</span>
            <span className="rf-v n">{rate.toLocaleString()}<span className="rf-unit">/s</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Tile 3: Agent Log ─────────────────────── */
const LOG_LINES = [
  { type: "link",     t: "linked epic to initiative roadmap",          c: 0.93 },
  { type: "classify", t: "classifying inbound ticket #8842",           c: 0.91 },
  { type: "route",    t: "routed to JSM queue SUPPORT-T2",             c: 0.88 },
  { type: "summarize",t: "summarized confluence page 2F8E21",          c: 0.94 },
  { type: "draft",    t: "drafted reply on ticket #8841",              c: 0.82 },
  { type: "flag",     t: "flagged duplicate project: PLAT vs PLATO",   c: 0.77, warn: true },
  { type: "merge",    t: "proposed merge of duplicate automation",     c: 0.85 },
  { type: "classify", t: "classified ticket #8843 as incident·p2",     c: 0.89 },
  { type: "route",    t: "routed to JSM queue INFRA-T1",               c: 0.87 },
  { type: "draft",    t: "drafted changelog for CONF-9821",            c: 0.81 },
  { type: "review",   t: "held for human review: policy change",       c: 0.62, warn: true },
];

const TYPE_GLYPH = {
  link:      "⇌",
  classify:  "◆",
  route:     "⇢",
  summarize: "≡",
  draft:     "✎",
  flag:      "!",
  merge:     "⊕",
  review:    "?",
};

function TileAgent({ paused }) {
  const [lines, setLines] = useState(() => LOG_LINES.slice(0, 6).map((l, i) => ({ ...l, ts: Date.now() - (6 - i) * 3200, id: i })));
  const cursor = useRef(6);
  const actionCount = useRef(1247);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const next = LOG_LINES[cursor.current % LOG_LINES.length];
      cursor.current += 1;
      actionCount.current += 1;
      setLines(prev => [...prev.slice(-5), { ...next, ts: Date.now(), id: cursor.current }]);
    }, 3200);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div className="tile tile-agent" role="group" aria-label="AI agent activity log">
      <div className="tile-head">
        <span>agent · log</span>
        <span className="tag tag-live"><span className="live-dot-sm" aria-hidden="true"></span>live</span>
      </div>
      <div className="log" role="log" aria-live="polite" aria-atomic="false">
        {lines.map((l, i) => {
          const isLatest = i === lines.length - 1;
          const d = new Date(l.ts);
          const stamp = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
          return (
            <div key={l.id} className={`log-line in ${isLatest ? 'latest' : ''} ${l.warn ? 'warn' : ''}`}>
              <span className="lg-time n">{stamp}</span>
              <span className={`lg-glyph ${l.type}`} aria-hidden="true">{TYPE_GLYPH[l.type]}</span>
              <span className="lg-text">{l.t}</span>
              <span className="lg-conf">
                <span className="conf-bar">
                  <span className="conf-fill" style={{ width: `${Math.round(l.c * 100)}%` }}></span>
                </span>
                <span className="conf-n n">{l.c.toFixed(2)}</span>
              </span>
            </div>
          );
        })}
      </div>
      <div className="tile-foot">
        <span className="foot-k">actions today</span>
        <span className="foot-v n">{actionCount.current.toLocaleString()}</span>
      </div>
    </div>
  );
}

/* ─────────────────────── Tile 4: Reporting ─────────────────────── */
function TileReporting({ paused, tick }) {
  // Rolling sparkline: 24 points; push new, shift old
  const [data, setData] = useState(() => {
    const r = seededRand(42);
    return Array.from({ length: 24 }, (_, i) => 0.3 + r() * 0.5 + Math.sin(i * 0.35) * 0.1);
  });
  const [delta, setDelta] = useState(12.4);
  const [refreshAge, setRefreshAge] = useState(31);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (paused) return;
    const pointId = setInterval(() => {
      setData(prev => {
        const r = seededRand(prev.length * 100 + Date.now());
        const last = prev[prev.length - 1];
        const drift = (r() - 0.45) * 0.12;
        const next = Math.max(0.15, Math.min(0.95, last + drift));
        return [...prev.slice(1), next];
      });
    }, 1500);

    const ageId = setInterval(() => {
      setRefreshAge(a => {
        if (a >= 60) {
          setRefreshing(true);
          setTimeout(() => {
            setRefreshing(false);
            setDelta(d => +(10 + Math.random() * 6).toFixed(1));
          }, 900);
          return 0;
        }
        return a + 1;
      });
    }, 1000);

    return () => { clearInterval(pointId); clearInterval(ageId); };
  }, [paused]);

  const last = data[data.length - 1];
  const next = 60 - refreshAge;

  return (
    <div className={`tile tile-reporting ${refreshing ? 'refreshing' : ''}`} role="group" aria-label="Reporting workspace refresh">
      <div className="tile-head">
        <span>reporting · refresh</span>
        <span className="tag">Power BI</span>
      </div>
      <div className="tile-body">
        <div className="rep-stat">
          <div className="rep-stat-top">
            <span className="rep-name">ops_weekly</span>
            <span className="rep-delta">
              <span className="rep-arrow" aria-hidden="true">▲</span>
              <span className="n">{delta.toFixed(1)}</span>%
            </span>
          </div>
        </div>

        <div className="rep-chart">
          <Sparkline data={data} stroke="var(--brand-hi)" fill={true} height={34}/>
        </div>

        <div className="run-foot rep-foot">
          <div className="rf-item">
            <span className="rf-k">refreshed</span>
            <span className="rf-v n">{refreshing ? "now" : `${String(Math.floor(refreshAge / 60)).padStart(2,'0')}:${String(refreshAge % 60).padStart(2,'0')}`}</span>
          </div>
          <div className="rf-item">
            <span className="rf-k">next</span>
            <span className="rf-v n">{String(Math.floor(next / 60)).padStart(2,'0')}:{String(Math.max(0, next) % 60).padStart(2,'0')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Composed Console ─────────────────────── */
function OperationsConsole() {
  const reduce = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);
  const effectivePaused = paused || reduce;
  const tick = useHeartbeat(2500, effectivePaused);

  // Cross-tile choreography: which service is "syncing" this heartbeat
  const pulseIdx = tick % ATL_SERVICES.length;

  return (
    <div className="console-wrap">
      <div className="console" aria-label="Live operations console, illustrative demo">
        {/* Corner brackets */}
        <span className="corner tl" aria-hidden="true"></span>
        <span className="corner tr" aria-hidden="true"></span>
        <span className="corner bl" aria-hidden="true"></span>
        <span className="corner br" aria-hidden="true"></span>

        {/* Scan sweep */}
        <span className="scan-sweep" aria-hidden="true"></span>

        <ConsoleChrome paused={effectivePaused} setPaused={setPaused} tick={tick}/>

        <div className="console-grid">
          <TileAtlassian tick={tick} pulse={pulseIdx}/>
          <TilePipeline paused={effectivePaused} tick={tick}/>
          <TileAgent paused={effectivePaused}/>
          <TileReporting paused={effectivePaused} tick={tick}/>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { OperationsConsole, usePrefersReducedMotion });
