"use client";

import React, { useState, useEffect } from "react";

interface ProposalPopupProps {
  name: string;
  onAccept: () => void;
}

const rejectionMessages = [
  { emoji: "😢", text: "Are you sure?" },
  { emoji: "😭", text: "Fine, I didn't wanna go anyway" },
  { emoji: "🥺", text: "So... you hate me?" },
  { emoji: "😤", text: "I'm not talking to you" },
  { emoji: "😿", text: "" },
  { emoji: "🥀", text: "" },
  { emoji: "😩", text: "So....." },
  { emoji: "💔", text: "" },
  { emoji: "🫠", text: "Hey... ;)" },
  { emoji: "🐶", text: "Buddy." },
];

const ProposalPopup: React.FC<ProposalPopupProps> = ({ name, onAccept }) => {
  const [rejectionCount, setRejectionCount] = useState(0);
  const [showRejection, setShowRejection] = useState(false);
  const [showAccept, setShowAccept] = useState(false);
  const [currentRejectionMsg, setCurrentRejectionMsg] = useState(rejectionMessages[0]);
  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0 });
  const [noButtonHidden, setNoButtonHidden] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [visible, setVisible] = useState(false);

  const firstName = name.split(" ")[0];

  // Slow fade-in on mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const handleYes = () => {
    setShowAccept(true);
    setTimeout(() => onAccept(), 1600);
  };

  const handleNo = () => {
    const msgIndex = rejectionCount % rejectionMessages.length;
    setCurrentRejectionMsg(rejectionMessages[msgIndex]);
    setShowRejection(true);
    setShaking(true);
    setRejectionCount((prev) => prev + 1);
    setNoButtonOffset({ x: 0, y: 0 });

    // Screen shake for 400ms
    setTimeout(() => setShaking(false), 400);

    // At high rejections, hide the No button temporarily
    if (rejectionCount >= 4) {
      setNoButtonHidden(true);
      setTimeout(() => setNoButtonHidden(false), 2200);
    }

    setTimeout(() => setShowRejection(false), 2000);
  };

  const handleNoHover = () => {
    if (rejectionCount >= 1) {
      const intensity = Math.min(rejectionCount * 100, 500);
      const x = (Math.random() - 0.5) * intensity * 2;
      const y = (Math.random() - 0.5) * intensity;
      setNoButtonOffset({ x, y });
    }
  };

  const yesScale = Math.min(1 + rejectionCount * 0.15, 2.0);
  const noScale = Math.max(1 - rejectionCount * 0.12, 0.2);

  const noButtonText = rejectionCount === 0 ? "No..." 
    : rejectionCount <= 2 ? "No..?" 
    : rejectionCount <= 4 ? "n-no.." 
    : rejectionCount <= 6 ? "..." 
    : "🥲";

  return (
    <div
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 ${shaking ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 1.2s ease-in",
      }}
    >
      {showAccept ? (
        <div className="text-center animate-[scaleIn_0.3s_ease-out]">
          <div className="text-8xl mb-6 animate-heartbeat">🥰</div>
          <p className="text-3xl md:text-4xl font-display font-bold text-valentine-400">
            Really?!
          </p>
          <p className="text-lg text-valentine-300 mt-3 animate-[fadeIn_0.5s_ease-out_0.4s_both]">
            I knew you&apos;d say yes 💕
          </p>
        </div>
      ) : showRejection ? (
        <div
          key={rejectionCount}
          className="glass rounded-3xl p-10 md:p-12 max-w-md mx-4 text-center shadow-2xl animate-[scaleIn_0.2s_ease-out]"
        >
          <div className="text-7xl mb-5">{currentRejectionMsg.emoji}</div>
          {currentRejectionMsg.text && (
            <p className="text-xl md:text-2xl font-display font-bold text-valentine-800">
              {currentRejectionMsg.text}
            </p>
          )}
        </div>
      ) : (
        <div
          className="glass rounded-3xl p-10 md:p-14 max-w-lg mx-4 text-center shadow-2xl relative overflow-hidden animate-[scaleIn_0.2s_ease-out]"
        >
          <div className="absolute top-4 left-6 text-valentine-200 text-2xl animate-pulse">♥</div>
          <div className="absolute top-6 right-8 text-valentine-200 text-lg animate-pulse">♥</div>
          <div className="absolute bottom-4 left-10 text-valentine-200 text-xl animate-pulse">♥</div>
          <div className="absolute bottom-6 right-6 text-valentine-200 text-2xl animate-pulse">♥</div>

          <div className="text-6xl md:text-7xl mb-6 animate-heartbeat">💕</div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-valentine-800 mb-3 leading-relaxed">
            {firstName}, will you be my Valentine?
          </h2>

          {rejectionCount > 0 && (
            <p className="text-sm text-valentine-400 mb-6">
              {rejectionCount === 1 && "I see how it is..."}
              {rejectionCount === 2 && "hello????"}
              {rejectionCount === 3 && `Try again`}
              {rejectionCount === 4 && `Damn why you lowkey good at clicking that button`}
              {rejectionCount === 5 && `:(`}
              {rejectionCount === 6 && `6...`}
              {rejectionCount === 7 && `7`}
              {rejectionCount >=  8 && `:()`}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              className="btn-yes"
              onClick={handleYes}
              style={{
                transform: `scale(${yesScale})`,
                transition: "transform 0.15s",
              }}
            >
              Yes! 💖
            </button>

            {!noButtonHidden && (
              <button
                className="btn-no"
                onClick={() => { handleNoHover(); handleNo(); }}
                onMouseEnter={handleNoHover}
                style={{
                  transform: `scale(${noScale}) translate(${noButtonOffset.x}px, ${noButtonOffset.y}px)`,
                  transition: "transform 0.12s",
                  willChange: "transform",
                  opacity: noScale < 0.4 ? 0.5 : 1,
                }}
              >
                {noButtonText}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalPopup;
