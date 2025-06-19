
import React, { useEffect, useState } from "react";

/**
 * A glowing animated orb that follows vertical scroll and moves along a subtle, curvy path,
 * lighting up the area it passes for fun scrolling feedback.
 */
export const ScrollOrb = () => {
  const [scroll, setScroll] = useState(0);
  const [windowHeight, setWindowHeight] = useState(1000);
  const [docHeight, setDocHeight] = useState(3000);

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
      setDocHeight(document.body.scrollHeight);
    }
    function handleScroll() {
      setScroll(window.scrollY);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Normalized scroll [0, 1]
  const t = Math.max(0, Math.min(1, scroll / (docHeight - windowHeight)));
  // Orb moves vertically from 15% to 85% of viewport height, and dances left/right slightly
  const top = `${15 + t * 70}vh`;
  const left = `calc(50vw + ${Math.sin(t * Math.PI * 2) * 120}px)`;

  return (
    <div 
      aria-hidden 
      className="pointer-events-none fixed left-0 top-0 w-full h-full z-40"
      style={{ mixBlendMode: "lighten" }}
    >
      <div
        style={{
          position: "absolute",
          top,
          left,
          width: 170,
          height: 170,
          marginLeft: -85,
          marginTop: -85,
          pointerEvents: "none",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236,72,153,0.19) 0%, rgba(236,72,153,0.11) 45%, rgba(124,58,237,0) 80%)",
          filter: "blur(1.5px)",
          boxShadow: "0 0 64px 16px rgba(236,72,153,0.24), 0 0 0 2px rgba(236,72,153,0.07)",
          transition: "top 0.19s cubic-bezier(.2,1.5,.4,1), left 0.19s cubic-bezier(.2,1.5,.4,1)"
        }}
      >
        <span
          style={{
            display: "block",
            width: 32,
            height: 32,
            borderRadius: "50%",
            margin: "68px auto 0",
            background: "radial-gradient(circle at 50% 50%, #fff 0%, #f472b6 50%, #a21caf 100%)",
            boxShadow: "0 0 12px 6px #f472b6, 0 0 16px 8px #a21caf70",
            opacity: 0.81,
            animation: "orb-pulse 2.2s ease-in-out infinite",
          }}
        />
      </div>
      <style>
        {`
        @keyframes orb-pulse {
          0% { transform: scale(1);}
          50% { transform: scale(1.12);}
          100% { transform: scale(1);}
        }
        `}
      </style>
    </div>
  );
};
