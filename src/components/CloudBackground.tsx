"use client";

import { useEffect, useRef, useState } from "react";

interface Cloud {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  offsetX: number;
  offsetY: number;
  layer: number; // For parallax depth
}

export default function CloudBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    // Generate initial clouds with layers for depth
    const initialClouds: Cloud[] = [];
    for (let i = 0; i < 18; i++) {
      const layer = Math.floor(i / 6); // 0, 1, 2 - back, mid, front
      initialClouds.push({
        id: i,
        x: Math.random() * 120 - 10,
        y: 10 + Math.random() * 70,
        size: 180 + Math.random() * 280 + layer * 50,
        speed: 0.015 + Math.random() * 0.025 + layer * 0.01,
        opacity: 0.5 + Math.random() * 0.4 + layer * 0.1,
        offsetX: 0,
        offsetY: 0,
        layer,
      });
    }
    setClouds(initialClouds);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      setClouds((prevClouds) =>
        prevClouds.map((cloud) => {
          // Parallax: front clouds move more with mouse
          const mouseInfluence = (cloud.layer + 1) * 50;
          const targetOffsetX = mousePos.x * mouseInfluence;
          const targetOffsetY = mousePos.y * mouseInfluence * 0.5;

          // Smooth interpolation towards target
          const newOffsetX = cloud.offsetX + (targetOffsetX - cloud.offsetX) * 0.08;
          const newOffsetY = cloud.offsetY + (targetOffsetY - cloud.offsetY) * 0.08;

          // Slowly drift clouds
          let newX = cloud.x + cloud.speed;
          if (newX > 115) newX = -15;

          return {
            ...cloud,
            x: newX,
            offsetX: newOffsetX,
            offsetY: newOffsetY,
          };
        })
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 20%, #bae6fd 50%, #7dd3fc 80%, #38bdf8 100%)",
      }}
    >
      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.9) 0%, transparent 50%)",
        }}
      />

      {/* Back layer clouds */}
      {clouds.filter(c => c.layer === 0).map((cloud) => (
        <div
          key={cloud.id}
          className="absolute rounded-full"
          style={{
            left: `calc(${cloud.x}% + ${cloud.offsetX}px)`,
            top: `calc(${cloud.y}% + ${cloud.offsetY}px)`,
            width: cloud.size,
            height: cloud.size * 0.5,
            opacity: cloud.opacity * 0.6,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 70%)`,
            filter: "blur(15px)",
          }}
        />
      ))}

      {/* Mid layer clouds */}
      {clouds.filter(c => c.layer === 1).map((cloud) => (
        <div
          key={cloud.id}
          className="absolute rounded-full"
          style={{
            left: `calc(${cloud.x}% + ${cloud.offsetX}px)`,
            top: `calc(${cloud.y}% + ${cloud.offsetY}px)`,
            width: cloud.size,
            height: cloud.size * 0.55,
            opacity: cloud.opacity * 0.8,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(ellipse at 50% 55%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 70%)`,
            filter: "blur(8px)",
          }}
        />
      ))}

      {/* Front layer clouds - most prominent */}
      {clouds.filter(c => c.layer === 2).map((cloud) => (
        <div
          key={cloud.id}
          className="absolute"
          style={{
            left: `calc(${cloud.x}% + ${cloud.offsetX}px)`,
            top: `calc(${cloud.y}% + ${cloud.offsetY}px)`,
            width: cloud.size,
            height: cloud.size * 0.6,
            opacity: cloud.opacity,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Main cloud body */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(ellipse at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 70%)`,
              filter: "blur(4px)",
            }}
          />
          {/* Cloud highlight */}
          <div
            className="absolute rounded-full"
            style={{
              left: "20%",
              top: "15%",
              width: "60%",
              height: "50%",
              background: `radial-gradient(ellipse at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)`,
              filter: "blur(2px)",
            }}
          />
          {/* Cloud puffs */}
          <div
            className="absolute rounded-full"
            style={{
              left: "-10%",
              top: "30%",
              width: "50%",
              height: "60%",
              background: `radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)`,
              filter: "blur(6px)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              right: "-5%",
              top: "25%",
              width: "45%",
              height: "55%",
              background: `radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)`,
              filter: "blur(6px)",
            }}
          />
        </div>
      ))}

      {/* Sun glow effect */}
      <div
        className="absolute"
        style={{
          top: "3%",
          right: "12%",
          width: 280,
          height: 280,
          background: "radial-gradient(circle, rgba(255,255,230,0.9) 0%, rgba(255,255,200,0.5) 25%, rgba(255,250,180,0.2) 50%, transparent 70%)",
          filter: "blur(25px)",
        }}
      />

      {/* Bottom fade to white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.85) 70%, rgba(255,255,255,1) 100%)",
        }}
      />
    </div>
  );
}
