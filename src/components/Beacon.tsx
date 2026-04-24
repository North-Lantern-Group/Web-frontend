"use client";

import { useEffect, useRef, useState } from "react";

export default function Beacon() {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ tiltX: 0, tiltY: 0, scrollY: 0 });
  const current = useRef({ tiltX: 0, tiltY: 0, scrollY: 0 });
  const [visible, setVisible] = useState(false);
  const [beat, setBeat] = useState<string>("");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (!detail) return;
      setBeat(detail);
      const id = window.setTimeout(() => setBeat(""), 1800);
      return () => window.clearTimeout(id);
    };
    window.addEventListener("nlg-belief-beat", handler as EventListener);
    return () => window.removeEventListener("nlg-belief-beat", handler as EventListener);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      if (ref.current) ref.current.style.transform = "";
      return;
    }

    const animate = () => {
      const lerp = 0.1;
      current.current.tiltX += (target.current.tiltX - current.current.tiltX) * lerp;
      current.current.tiltY += (target.current.tiltY - current.current.tiltY) * lerp;
      current.current.scrollY += (target.current.scrollY - current.current.scrollY) * lerp;

      if (ref.current) {
        ref.current.style.transform = `translate3d(0, ${current.current.scrollY.toFixed(2)}px, 0) perspective(1200px) rotateX(${current.current.tiltY.toFixed(2)}deg) rotateY(${current.current.tiltX.toFixed(2)}deg)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const handler = () => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const offset = (viewportCenter - elementCenter) * 0.05;
      target.current.scrollY = Math.max(-32, Math.min(32, offset));
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [reduceMotion]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    target.current.tiltX = x * 2;
    target.current.tiltY = y * -2;
  };

  const onMouseLeave = () => {
    target.current.tiltX = 0;
    target.current.tiltY = 0;
  };

  return (
    <div
      ref={ref}
      className={`nlg-beacon ${visible ? "nlg-beacon-visible" : ""} ${beat ? `nlg-beacon-beat-${beat}` : ""}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-hidden="true"
    >
      <div className="nlg-beacon-halo" />
      <div className="nlg-beacon-frame">
        <div className="nlg-beacon-noise" />
        <div className="nlg-beacon-zone nlg-beacon-zone-top" />
        <div className="nlg-beacon-zone nlg-beacon-zone-mid" />
        <div className="nlg-beacon-zone nlg-beacon-zone-res" />
        <div className="nlg-beacon-spine" />
        <div className="nlg-beacon-scan" />
        <div className="nlg-beacon-packet" />
        <div className="nlg-beacon-ring nlg-beacon-ring-upper" />
        <div className="nlg-beacon-ring nlg-beacon-ring-lower" />
        <div className="nlg-beacon-corner nlg-beacon-corner-tl" />
        <div className="nlg-beacon-corner nlg-beacon-corner-tr" />
        <div className="nlg-beacon-corner nlg-beacon-corner-bl" />
        <div className="nlg-beacon-corner nlg-beacon-corner-br" />
        <div className="nlg-beacon-edge" />
        <div className="nlg-beacon-caption">NLG.LAYER</div>
        <div className="nlg-beacon-serial">LNT-03 · REV 2.4.1 · 2026</div>
      </div>
    </div>
  );
}
