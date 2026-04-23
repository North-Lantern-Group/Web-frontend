"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const markers = [
  { location: [43.65, -79.38] as [number, number], size: 0.05 },
  { location: [45.42, -75.69] as [number, number], size: 0.08 },
  { location: [49.28, -123.12] as [number, number], size: 0.05 },
  { location: [45.5, -73.57] as [number, number], size: 0.05 },
  { location: [43.26, -79.87] as [number, number], size: 0.05 },
  { location: [51.04, -114.07] as [number, number], size: 0.05 },
];

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = canvas.offsetWidth;
    let phi = 4.65;
    let frame = 0;
    let globe: ReturnType<typeof createGlobe> | undefined;
    let animationFrame = 0;

    const resize = () => {
      width = canvas.offsetWidth;
    };

    resize();
    window.addEventListener("resize", resize);

    globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi,
      theta: 0.43,
      dark: 1,
      diffuse: 1.1,
      mapSamples: 16000,
      mapBrightness: 1.6,
      baseColor: [0.05, 0.12, 0.18],
      markerColor: [0, 0.831, 1],
      glowColor: [0, 0.32, 0.42],
      markers,
    });

    const render = () => {
      if (!reducedMotion) {
        phi += 0.0035;
        frame += 1;
      }

      globe?.update({
        phi,
        theta: 0.43 + Math.sin(frame * 0.01) * 0.03,
        width: width * 2,
        height: width * 2,
      });

      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
      globe?.destroy();
    };
  }, [reducedMotion]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <canvas ref={canvasRef} className="h-full w-full opacity-90" />
      <div className="nlg-ottawa-pulse pointer-events-none absolute left-[55%] top-[41%] h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_24px_rgba(0,212,255,0.9)]" />
    </div>
  );
}
