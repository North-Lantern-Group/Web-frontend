"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduce(m.matches);
    handler();
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, []);
  return reduce;
}

function useHeartbeat(ms: number, paused: boolean) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setT((x) => x + 1), ms);
    return () => clearInterval(id);
  }, [ms, paused]);
  return t;
}

function seededRand(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return ((s >>> 0) % 10000) / 10000;
  };
}

function buildPath(
  pts: Array<[number, number]>,
  smooth: boolean,
): string {
  if (pts.length === 0) return "";
  if (pts.length === 1) return `M${pts[0]![0]},${pts[0]![1]}`;
  if (!smooth) {
    return `M${pts.map((p) => `${p[0]},${p[1]}`).join(" L")}`;
  }
  // Catmull-Rom to cubic Bezier (tension ~0.5, no overshoot).
  let d = `M${pts[0]![0].toFixed(2)},${pts[0]![1].toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]!;
    const p1 = pts[i]!;
    const p2 = pts[i + 1]!;
    const p3 = pts[Math.min(pts.length - 1, i + 2)]!;
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
  }
  return d;
}

function Sparkline({
  data,
  stroke = "var(--brand-hi)",
  fill = true,
  height = 28,
  smooth = false,
}: {
  data: number[];
  stroke?: string;
  fill?: boolean;
  height?: number;
  smooth?: boolean;
}) {
  const w = 100;
  const h = height;
  const step = data.length > 1 ? w / (data.length - 1) : w;
  const pts: Array<[number, number]> = data.map((v, i) => [i * step, h - 2 - v * (h - 4)]);
  const line = buildPath(pts, smooth);
  const lastX = pts.length ? pts[pts.length - 1]![0] : w;
  const area = pts.length ? `${line} L${lastX},${h} L0,${h} Z` : "";
  const gid = useMemo(() => `nlg-sg-${Math.random().toString(36).slice(2, 8)}`, []);
  return (
    <svg
      className="nlg-sl"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ height }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#${gid})`} />}
      <path d={line} fill="none" stroke={stroke} strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function ConsoleChrome({
  paused,
  setPaused,
  tick,
}: {
  paused: boolean;
  setPaused: (updater: (p: boolean) => boolean) => void;
  tick: number;
}) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [paused]);

  const hh = String(now.getUTCHours()).padStart(2, "0");
  const mm = String(now.getUTCMinutes()).padStart(2, "0");
  const ss = String(now.getUTCSeconds()).padStart(2, "0");

  const health = useMemo(() => {
    const rand = seededRand(1337 + tick);
    return Array.from({ length: 18 }, (_, i) => 0.55 + Math.sin((tick + i) * 0.7) * 0.15 + rand() * 0.12);
  }, [tick]);

  return (
    <div className="nlg-console-chrome">
      <div className="nlg-cc-left">
        <span className={`nlg-hb ${paused ? "off" : ""}`} aria-hidden="true"></span>
        <span className="nlg-cc-title">NLG.OPS</span>
        <span className="nlg-cc-sep">{"//"}</span>
        <span className="nlg-cc-sub">production · read-only demo</span>
      </div>
      <div className="nlg-cc-center">
        <span className="nlg-cc-clock">
          <span className="n">{hh}</span>:<span className="n">{mm}</span>:<span className="n">{ss}</span>
        </span>
        <span className="nlg-cc-zone">UTC</span>
      </div>
      <div className="nlg-cc-right">
        <span className="nlg-cc-health" aria-label="System health">
          <Sparkline data={health} stroke="var(--success)" fill={false} height={14} />
        </span>
        <span className="nlg-cc-status">
          <span className="nlg-ok-dot" aria-hidden="true"></span>nominal
        </span>
        <button
          className="nlg-console-pause"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Resume log updates" : "Pause log updates"}
        >
          {paused ? "resume" : "pause"}
        </button>
      </div>
    </div>
  );
}

const ATL_SERVICES = [
  { id: "JIRA-04", label: "jira.04", baseLast: 12, baseMetric: "142/s", amber: false },
  { id: "JSM-QUEUE", label: "jsm.queue", baseLast: 3, baseMetric: "4 open", amber: false },
  { id: "CONF-OPS", label: "conf.ops", baseLast: 27, baseMetric: "clean", amber: false },
  { id: "AUTO-17", label: "auto.17", baseLast: 8, baseMetric: "1 retry", amber: true },
];

function TileAtlassian({ tick, pulse }: { tick: number; pulse: number }) {
  const eventsPerMin = 128 + ((tick * 3) % 40);
  return (
    <div className="nlg-tile nlg-tile-atlassian" role="group" aria-label="Atlassian sync status">
      <div className="nlg-tile-head">
        <span>atlassian · sync</span>
        <span className="nlg-tag">4 services</span>
      </div>
      <div className="nlg-tile-body">
        <ul className="nlg-svc-list">
          {ATL_SERVICES.map((s, i) => {
            const last = (s.baseLast + tick * 2) % 60;
            const isSyncing = pulse === i;
            return (
              <li
                key={s.id}
                className={`nlg-svc-row ${isSyncing ? "nlg-syncing" : ""} ${s.amber ? "amber" : ""}`}
              >
                <span className={`nlg-svc-dot ${s.amber ? "amber" : "ok"}`} aria-hidden="true"></span>
                <span className="nlg-svc-name">{s.label}</span>
                <span className="nlg-svc-metric">{s.baseMetric}</span>
                <span className="nlg-svc-last">
                  <span className="n">{String(last).padStart(2, "0")}</span>s
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="nlg-tile-foot">
        <span>events/min</span>
        <span className="nlg-foot-v n">{eventsPerMin}</span>
      </div>
    </div>
  );
}

const STAGES = ["extract", "transform", "load"];

function TilePipeline({ paused, tick }: { paused: boolean; tick: number }) {
  const runLen = 10000;
  const [progress, setProgress] = useState(0);
  const [runId, setRunId] = useState(4832);
  const [throughput, setThroughput] = useState(18432);
  // Accumulated elapsed time within the current run, advanced only while not paused.
  const elapsedRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) {
      lastFrameRef.current = null;
      return;
    }
    let raf = 0;
    let lastThroughputAt = 0;
    const tickRAF = (t: number) => {
      if (lastFrameRef.current == null) {
        lastFrameRef.current = t;
        lastThroughputAt = t;
      }
      const dt = t - lastFrameRef.current;
      lastFrameRef.current = t;

      const next = elapsedRef.current + dt;
      const looped = next >= runLen;
      elapsedRef.current = looped ? next - runLen : next;
      setProgress(elapsedRef.current / runLen);

      if (looped) {
        setRunId((r) => r + 1);
        setThroughput(Math.floor(15000 + Math.random() * 7000));
        lastThroughputAt = t;
      } else if (t - lastThroughputAt > 120) {
        setThroughput((th) => th + Math.floor(3 + Math.random() * 8));
        lastThroughputAt = t;
      }

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
    <div className="nlg-tile nlg-tile-pipeline" role="group" aria-label="ETL pipeline run status">
      <div className="nlg-tile-head">
        <span>etl_revenue</span>
        <span className={`nlg-tag nlg-tag-ok ${progress < 0.99 ? "nlg-running" : ""}`}>
          {progress < 0.98 ? "running" : "ok"}
        </span>
      </div>
      <div className="nlg-tile-body">
        <div className="nlg-run-head">
          <span className="nlg-run-id">
            run <span className="n">#{runId}</span>
          </span>
          <span className="nlg-run-eta">
            eta{" "}
            <span className="n">
              {String(Math.floor(etaSec / 60)).padStart(2, "0")}:{String(etaSec % 60).padStart(2, "0")}
            </span>
          </span>
        </div>

        <div className="nlg-pipe" aria-hidden="true" data-paused={paused ? "true" : "false"}>
          <div className="nlg-pipe-fill" style={{ width: `${(progress * 100).toFixed(2)}%` }}></div>
          <div className="nlg-pipe-ticks">
            {STAGES.map((_, i) => (
              <span
                key={i}
                className="nlg-pipe-tick"
                style={{ left: `${(i / STAGES.length) * 100}%` }}
              ></span>
            ))}
          </div>
          <div className="nlg-pipe-head" style={{ left: `${(progress * 100).toFixed(2)}%` }}></div>
        </div>

        <ul className="nlg-stage-list">
          {STAGES.map((s, i) => (
            <li
              key={s}
              className={`nlg-stage ${i < activeStage ? "done" : i === activeStage ? "active" : "pending"}`}
            >
              <span className="nlg-stage-glyph" aria-hidden="true">
                {i < activeStage ? "✓" : i === activeStage ? "▸" : "·"}
              </span>
              <span className="nlg-stage-name">{s}</span>
              <span className="nlg-stage-time n">
                {i < activeStage ? "done" : i === activeStage ? `${Math.floor((progress - i / 3) * 300)}s` : "..."}
              </span>
            </li>
          ))}
        </ul>

        <div className="nlg-run-foot">
          <div className="nlg-rf-item">
            <span className="nlg-rf-k">rows</span>
            <span className="nlg-rf-v n">{throughput.toLocaleString()}</span>
          </div>
          <div className="nlg-rf-item">
            <span className="nlg-rf-k">rate</span>
            <span className="nlg-rf-v n">
              {rate.toLocaleString()}
              <span className="nlg-rf-unit">/s</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

type LogType = "link" | "classify" | "route" | "summarize" | "draft" | "flag" | "merge" | "review";

type LogLine = { type: LogType; t: string; c: number; warn?: boolean };
type LogLineWithMeta = LogLine & { ts: number; id: number };

const LOG_LINES: LogLine[] = [
  { type: "link", t: "linked epic to initiative roadmap", c: 0.93 },
  { type: "classify", t: "classifying inbound ticket #8842", c: 0.91 },
  { type: "route", t: "routed to JSM queue SUPPORT-T2", c: 0.88 },
  { type: "summarize", t: "summarized confluence page 2F8E21", c: 0.94 },
  { type: "draft", t: "drafted reply on ticket #8841", c: 0.82 },
  { type: "flag", t: "flagged duplicate project: PLAT vs PLATO", c: 0.77, warn: true },
  { type: "merge", t: "proposed merge of duplicate automation", c: 0.85 },
  { type: "classify", t: "classified ticket #8843 as incident·p2", c: 0.89 },
  { type: "route", t: "routed to JSM queue INFRA-T1", c: 0.87 },
  { type: "draft", t: "drafted changelog for CONF-9821", c: 0.81 },
  { type: "review", t: "held for human review: policy change", c: 0.62, warn: true },
];

const TYPE_GLYPH: Record<LogType, string> = {
  link: "⇌",
  classify: "◆",
  route: "⇢",
  summarize: "≡",
  draft: "✎",
  flag: "!",
  merge: "⊕",
  review: "?",
};

function TileAgent({ paused }: { paused: boolean }) {
  const [lines, setLines] = useState<LogLineWithMeta[]>(() =>
    LOG_LINES.slice(0, 6).map((l, i) => ({ ...l, ts: Date.now() - (6 - i) * 3200, id: i })),
  );
  const cursor = useRef(6);
  const actionCount = useRef(1247);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const next: LogLine = LOG_LINES[cursor.current % LOG_LINES.length]!;
      cursor.current += 1;
      actionCount.current += 1;
      const newLine: LogLineWithMeta = { ...next, ts: Date.now(), id: cursor.current };
      setLines((prev) => [...prev.slice(-5), newLine]);
    }, 3200);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div className="nlg-tile nlg-tile-agent" role="group" aria-label="AI agent activity log">
      <div className="nlg-tile-head">
        <span>agent · log</span>
        <span className="nlg-tag nlg-tag-live">
          <span className="nlg-live-dot-sm" aria-hidden="true"></span>live
        </span>
      </div>
      <div className="nlg-log" role="log" aria-live="polite" aria-atomic="false">
        {lines.map((l, i) => {
          const isLatest = i === lines.length - 1;
          const d = new Date(l.ts);
          const stamp = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(
            d.getSeconds(),
          ).padStart(2, "0")}`;
          return (
            <div
              key={l.id}
              className={`nlg-log-line in ${isLatest ? "latest" : ""} ${l.warn ? "warn" : ""}`}
            >
              <span className="nlg-lg-time n">{stamp}</span>
              <span className="nlg-lg-glyph" aria-hidden="true">
                {TYPE_GLYPH[l.type]}
              </span>
              <span className="nlg-lg-text">{l.t}</span>
              <span className="nlg-lg-conf">
                <span className="nlg-conf-bar">
                  <span className="nlg-conf-fill" style={{ width: `${Math.round(l.c * 100)}%` }}></span>
                </span>
                <span className="nlg-conf-n n">{l.c.toFixed(2)}</span>
              </span>
            </div>
          );
        })}
      </div>
      <div className="nlg-tile-foot">
        <span>actions today</span>
        <span className="nlg-foot-v n">{actionCount.current.toLocaleString()}</span>
      </div>
    </div>
  );
}

const REP_POINTS = 28;

function buildReportingFrame(time: number): number[] {
  // Slowly drifting baseline so the chart never sits in one band.
  const baseline = 0.5 + Math.sin(time * 0.08) * 0.06 + Math.cos(time * 0.13) * 0.025;
  // 0..1 envelope alternating between calm and pronounced waves over ~38s.
  const phaseMod = (Math.sin(time * 0.165) + 1) / 2;
  const calmFactor = 0.32 + phaseMod * 0.68;
  const tilt = phaseMod * 0.05; // very gentle directional bias when "active"
  const out: number[] = new Array(REP_POINTS);
  for (let i = 0; i < REP_POINTS; i++) {
    const x = i / (REP_POINTS - 1);
    const slow = Math.sin(time * 0.55 + i * 0.42) * 0.105;
    const med  = Math.sin(time * 1.10 + i * 0.78 + 1.2) * 0.055;
    const fast = Math.sin(time * 2.15 + i * 1.30) * 0.018;
    const v = baseline + (x - 0.5) * tilt + (slow + med) * calmFactor + fast;
    out[i] = Math.max(0.18, Math.min(0.92, v));
  }
  return out;
}

function TileReporting({ paused }: { paused: boolean }) {
  const [data, setData] = useState<number[]>(() => buildReportingFrame(0));
  const [delta, setDelta] = useState(12.4);
  const [refreshAge, setRefreshAge] = useState(31);
  const [refreshing, setRefreshing] = useState(false);
  // Phase advances only while active so pause holds the chart and resume continues smoothly.
  const phaseRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) {
      lastFrameRef.current = null;
      return;
    }
    let raf = 0;
    let lastSampleAt = 0;
    const animate = (t: number) => {
      if (lastFrameRef.current == null) {
        lastFrameRef.current = t;
        lastSampleAt = t;
      }
      const dt = t - lastFrameRef.current;
      lastFrameRef.current = t;
      phaseRef.current += dt;
      // Sample at ~33Hz — visually fluid without overrendering.
      if (t - lastSampleAt >= 30) {
        lastSampleAt = t;
        setData(buildReportingFrame(phaseRef.current / 1000));
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  useEffect(() => {
    if (paused) return;
    const ageId = setInterval(() => {
      setRefreshAge((a) => {
        if (a >= 60) {
          setRefreshing(true);
          setTimeout(() => {
            setRefreshing(false);
            setDelta(() => +(10 + Math.random() * 6).toFixed(1));
          }, 900);
          return 0;
        }
        return a + 1;
      });
    }, 1000);
    return () => clearInterval(ageId);
  }, [paused]);

  const next = 60 - refreshAge;

  return (
    <div
      className={`nlg-tile nlg-tile-reporting ${refreshing ? "nlg-refreshing" : ""}`}
      role="group"
      aria-label="Reporting workspace refresh"
    >
      <div className="nlg-tile-head">
        <span>reporting · refresh</span>
        <span className="nlg-tag">Power BI</span>
      </div>
      <div className="nlg-tile-body">
        <div className="nlg-rep-stat">
          <div className="nlg-rep-stat-top">
            <span className="nlg-rep-name">ops_weekly</span>
            <span className="nlg-rep-delta">
              <span className="nlg-rep-arrow" aria-hidden="true">
                ▲
              </span>
              <span className="n">{delta.toFixed(1)}</span>%
            </span>
          </div>
        </div>

        <div className="nlg-rep-chart">
          <Sparkline data={data} stroke="var(--brand-hi)" fill={true} height={34} smooth />
        </div>

        <div className="nlg-run-foot">
          <div className="nlg-rf-item">
            <span className="nlg-rf-k">refreshed</span>
            <span className="nlg-rf-v n">
              {refreshing
                ? "now"
                : `${String(Math.floor(refreshAge / 60)).padStart(2, "0")}:${String(refreshAge % 60).padStart(2, "0")}`}
            </span>
          </div>
          <div className="nlg-rf-item">
            <span className="nlg-rf-k">next</span>
            <span className="nlg-rf-v n">
              {String(Math.floor(next / 60)).padStart(2, "0")}:{String(Math.max(0, next) % 60).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OperationsConsole() {
  const reduce = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);
  const effectivePaused = paused || reduce;
  const tick = useHeartbeat(2500, effectivePaused);

  const pulseIdx = tick % ATL_SERVICES.length;

  return (
    <div className="nlg-console-wrap">
      <div className="nlg-console" aria-label="Live operations console, illustrative demo">
        <span className="nlg-corner tl" aria-hidden="true"></span>
        <span className="nlg-corner tr" aria-hidden="true"></span>
        <span className="nlg-corner bl" aria-hidden="true"></span>
        <span className="nlg-corner br" aria-hidden="true"></span>

        <span className="nlg-scan-sweep" aria-hidden="true"></span>

        <ConsoleChrome paused={effectivePaused} setPaused={setPaused} tick={tick} />

        <div className="nlg-console-grid">
          <TileAtlassian tick={tick} pulse={pulseIdx} />
          <TilePipeline paused={effectivePaused} tick={tick} />
          <TileAgent paused={effectivePaused} />
          <TileReporting paused={effectivePaused} />
        </div>
      </div>
    </div>
  );
}
