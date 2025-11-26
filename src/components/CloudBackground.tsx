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
}

export default function CloudBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    // Generate initial clouds
    const initialClouds: Cloud[] = [];
    for (let i = 0; i < 12; i++) {
      initialClouds.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 150 + Math.random() * 200,
        speed: 0.02 + Math.random() * 0.03,
        opacity: 0.4 + Math.random() * 0.3,
        offsetX: 0,
        offsetY: 0,
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
          // Calculate mouse influence (closer clouds move more)
          const mouseInfluence = (cloud.size / 350) * 30;
          const targetOffsetX = mousePos.x * mouseInfluence;
          const targetOffsetY = mousePos.y * mouseInfluence;

          // Smooth interpolation towards target
          const newOffsetX = cloud.offsetX + (targetOffsetX - cloud.offsetX) * 0.05;
          const newOffsetY = cloud.offsetY + (targetOffsetY - cloud.offsetY) * 0.05;

          // Slowly drift clouds
          let newX = cloud.x + cloud.speed;
          if (newX > 110) newX = -10;

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
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        background: "linear-gradient(180deg, #e0f2fe 0%, #bae6fd 30%, #7dd3fc 60%, #38bdf8 100%)",
      }}
    >
      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.8) 0%, transparent 60%)",
        }}
      />

      {/* Clouds */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute rounded-full"
          style={{
            left: `calc(${cloud.x}% + ${cloud.offsetX}px)`,
            top: `calc(${cloud.y}% + ${cloud.offsetY}px)`,
            width: cloud.size,
            height: cloud.size * 0.6,
            opacity: cloud.opacity,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 70%)`,
            filter: "blur(8px)",
            transition: "left 0.1s ease-out, top 0.1s ease-out",
          }}
        />
      ))}

      {/* Additional cloud puffs for more realistic look */}
      {clouds.slice(0, 6).map((cloud, i) => (
        <div
          key={`puff-${cloud.id}`}
          className="absolute rounded-full"
          style={{
            left: `calc(${cloud.x + 5}% + ${cloud.offsetX * 0.8}px)`,
            top: `calc(${cloud.y - 3}% + ${cloud.offsetY * 0.8}px)`,
            width: cloud.size * 0.7,
            height: cloud.size * 0.5,
            opacity: cloud.opacity * 0.8,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 70%)`,
            filter: "blur(12px)",
            transition: "left 0.15s ease-out, top 0.15s ease-out",
          }}
        />
      ))}

      {/* Sun glow effect */}
      <div
        className="absolute"
        style={{
          top: "5%",
          right: "15%",
          width: 200,
          height: 200,
          background: "radial-gradient(circle, rgba(255,255,220,0.8) 0%, rgba(255,255,200,0.4) 30%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}
