"use client";

import { useEffect, useCallback, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiEffectProps {
  active: boolean;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ active }) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fireConfetti = useCallback(() => {
    // Big burst from center
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#FF1493", "#FF69B4", "#FFB6C1", "#FF85B3", "#FFC0CB", "#ff4da6", "#ff80bf"],
      shapes: ["circle", "square"],
      scalar: 1.2,
    });

    // Left side burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ["#FF1493", "#FF69B4", "#FFB6C1", "#ff4da6"],
      });
    }, 200);

    // Right side burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ["#FF1493", "#FF69B4", "#FFB6C1", "#ff4da6"],
      });
    }, 400);
  }, []);

  useEffect(() => {
    if (active) {
      // Initial big burst
      fireConfetti();

      // Continue confetti for a few seconds
      let count = 0;
      intervalRef.current = setInterval(() => {
        count++;
        if (count > 5) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return;
        }

        confetti({
          particleCount: 30,
          spread: 100,
          origin: { x: Math.random(), y: Math.random() * 0.4 },
          colors: ["#FF1493", "#FF69B4", "#FFB6C1", "#FF85B3", "#FFC0CB"],
          scalar: 0.9,
        });
      }, 600);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, fireConfetti]);

  return null; // canvas-confetti creates its own canvas
};

export default ConfettiEffect;
