"use client";

import React from "react";
import ConfettiEffect from "./ConfettiEffect";

interface CelebrationScreenProps {
  name: string;
}

const CelebrationScreen: React.FC<CelebrationScreenProps> = ({ name }) => {
  const firstName = name.split(" ")[0];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-b from-valentine-50 via-white to-valentine-50">
      <ConfettiEffect active={true} />

      <div className="text-center px-6 relative z-10 animate-[scaleIn_0.5s_ease-out]">
        {/* Hearts ring */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="absolute text-2xl animate-pulse"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${Math.cos((i * Math.PI * 2) / 6) * 55}px, ${Math.sin((i * Math.PI * 2) / 6) * 55}px)`,
              }}
            >
              {["💖", "💕", "💗", "💝", "❤️", "💘"][i]}
            </div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center text-6xl animate-heartbeat">
            💖
          </div>
        </div>

        {/* Yay text */}
        <h1 className="text-6xl md:text-8xl font-display font-bold celebration-text mb-4 animate-[fadeIn_0.4s_ease-out_0.2s_both]">
          Yay!!
        </h1>

        <p className="text-lg md:text-xl text-valentine-600 font-body max-w-md mx-auto mb-4 animate-[fadeIn_0.3s_ease-out_0.4s_both]">
          Looking forward to Saturday!!!
        </p>

        <p className="text-valentine-400 font-body text-base animate-[fadeIn_0.3s_ease-out_0.7s_both]">
          Happy Valentine&apos;s Day 💕
        </p>

        {/* Sparkles */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute text-valentine-300 animate-sparkle"
            style={{
              left: `${20 + i * 20}%`,
              top: `${15 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>
    </div>
  );
};

export default CelebrationScreen;
