"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const phiRef = useRef(0);
  const thetaRef = useRef(0.3);

  useEffect(() => {
    let phi = 2.5;
    let theta = 0.3;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    // Use lower pixel ratio on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const pixelRatio = isMobile ? 1.5 : 2;

    let globe: ReturnType<typeof createGlobe>;

    // Fix white flash on page refresh
    const handleBeforeUnload = () => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "0";
      }
      if (globe) {
        globe.destroy();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: pixelRatio,
      width: width * 2,
      height: width * 2,
      phi: 2.5,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 80000,
      mapBrightness: 6,
      baseColor: [0.05, 0.05, 0.05],
      markerColor: [0.984, 0.443, 0.522],  // rose-400 (#fb7185) in RGB normalized
      glowColor: [0.05, 0.05, 0.05],
      markers: [
        { location: [40.7128, -74.006], size: 0.05 },    // New York
        { location: [51.5074, -0.1278], size: 0.05 },    // London
        { location: [35.6762, 139.6503], size: 0.05 },   // Tokyo
        { location: [1.3521, 103.8198], size: 0.05 },    // Singapore
        { location: [-33.8688, 151.2093], size: 0.05 },  // Sydney
        { location: [24.4539, 54.3773], size: 0.05 },    // Abu Dhabi
        { location: [34.0522, -118.2437], size: 0.05 },  // Los Angeles
        { location: [-23.5505, -46.6333], size: 0.05 },  // Sao Paulo
        { location: [48.8566, 2.3522], size: 0.05 },     // Paris
        { location: [31.2304, 121.4737], size: 0.05 },   // Shanghai
        { location: [22.3193, 114.1694], size: 0.05 },   // Hong Kong
        { location: [37.7749, -122.4194], size: 0.05 },  // San Francisco
        { location: [52.52, 13.405], size: 0.05 },       // Berlin
        { location: [41.8781, -87.6298], size: 0.05 },   // Chicago
        { location: [43.6532, -79.3832], size: 0.05 },   // Toronto
      ],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phi += 0.001;
        }
        state.phi = phi;
        state.theta = theta;
        phiRef.current = phi;
        thetaRef.current = theta;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    const handlePointerDown = (e: PointerEvent) => {
      pointerInteracting.current = { x: e.clientX, y: e.clientY };
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grabbing";
      }
    };

    const handlePointerUp = () => {
      pointerInteracting.current = null;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grab";
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current) {
        const deltaX = e.clientX - pointerInteracting.current.x;
        const deltaY = e.clientY - pointerInteracting.current.y;

        phi += deltaX * 0.005;
        theta += deltaY * 0.005;

        // Clamp theta to prevent flipping
        theta = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, theta));

        pointerInteracting.current = { x: e.clientX, y: e.clientY };
      }
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointermove", handlePointerMove);
    }

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 0);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (canvas) {
        canvas.removeEventListener("pointerdown", handlePointerDown);
      }
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />
    </div>
  );
}
