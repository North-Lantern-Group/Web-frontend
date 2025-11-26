"use client";

import { useEffect, useRef, useState } from "react";

export default function ParticleCompass() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const gradientPosRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setDimensions({ width: rect.width, height: rect.height });
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    const timeout = setTimeout(updateDimensions, 100);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    const width = dimensions.width;
    const height = dimensions.height;

    // Initialize gradient position to center
    gradientPosRef.current = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      // Smoothly interpolate gradient position toward mouse
      if (mouse.x > 0 && mouse.y > 0) {
        gradientPosRef.current.x += (mouse.x - gradientPosRef.current.x) * 0.08;
        gradientPosRef.current.y += (mouse.y - gradientPosRef.current.y) * 0.08;
      }

      const gx = gradientPosRef.current.x;
      const gy = gradientPosRef.current.y;

      // Draw smooth gradient that follows cursor
      const gradient = ctx.createRadialGradient(gx, gy, 0, gx, gy, 350);
      gradient.addColorStop(0, "rgba(0, 212, 255, 0.18)");
      gradient.addColorStop(0.3, "rgba(139, 92, 246, 0.10)");
      gradient.addColorStop(0.6, "rgba(0, 212, 255, 0.04)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          width: dimensions.width || '100%',
          height: dimensions.height || '100%',
          transform: "translateZ(0)",
          willChange: "transform"
        }}
      />
    </div>
  );
}
