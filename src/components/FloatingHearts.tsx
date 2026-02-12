"use client";

import React, { useState, useEffect } from "react";

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<
    { id: number; left: string; size: string; duration: string; delay: string; symbol: string }[]
  >([]);

  useEffect(() => {
    const symbols = ["♥", "♡", "❤", "💗"];
    setHearts(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${(i * 8.3 + 2) % 100}%`,
        size: `${1.5 + (i % 4) * 0.6}rem`,
        duration: `${14 + (i % 5) * 4}s`,
        delay: `${(i * 1.3) % 8}s`,
        symbol: symbols[i % symbols.length],
      }))
    );
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: heart.left,
            fontSize: heart.size,
            animationDuration: heart.duration,
            animationDelay: heart.delay,
          }}
        >
          {heart.symbol}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
