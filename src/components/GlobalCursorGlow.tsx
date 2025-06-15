
import React, { useEffect, useRef, useState } from "react";

export const GlobalCursorGlow = () => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const requestRef = useRef(0);

  useEffect(() => {
    const updatePos = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updatePos);
    return () => window.removeEventListener("mousemove", updatePos);
  }, []);

  // Reduce GPU cost: hide on touch devices or if no mousemove for a long time
  useEffect(() => {
    let timer: number;
    if (pos) {
      timer = window.setTimeout(() => setPos(null), 4000);
    }
    return () => clearTimeout(timer);
  }, [pos]);

  // Animate glow smoothly
  const [smoothPos, setSmoothPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!pos) return;
    const animate = () => {
      setSmoothPos(prev => {
        if (!prev) return pos;
        const lerp = (start: number, end: number, amt = 0.25) => start + (end - start) * amt;
        return {
          x: lerp(prev.x, pos.x),
          y: lerp(prev.y, pos.y)
        };
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [pos]);

  if (!smoothPos) return null;
  return (
    <div
      aria-hidden
      style={{
        pointerEvents: "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1
      }}
    >
      <div
        style={{
          position: "absolute",
          left: smoothPos.x - 120,
          top: smoothPos.y - 120,
          width: 240,
          height: 240,
          borderRadius: "9999px",
          background: "radial-gradient(circle, rgba(236,72,153,0.10) 0%, rgba(124,58,237,0.05) 55%, transparent 90%)",
          filter: "blur(22px)",
          transition: "background 0.18s",
          pointerEvents: "none"
        }}
      />
    </div>
  );
};
