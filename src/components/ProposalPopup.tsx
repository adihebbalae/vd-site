"use client";

import React, { useState, useEffect } from "react";

interface ProposalPopupProps {
  name: string;
  onAccept: () => void;
}

const rejectionMessages = [
  { emoji: "😢", text: "So you hate me?" },
  { emoji: "🥺", text: "Come on, give it another shot!" },
  { emoji: "😭", text: "I believe in second chances... and third... and fourth..." },
  { emoji: "💔", text: "Are you sure about that?" },
  { emoji: "😿", text: "My heart can't take this..." },
  { emoji: "🥀", text: "You're really gonna do this to me?" },
  { emoji: "😩", text: "I promise I'll be the best valentine ever!" },
  { emoji: "🫠", text: "I'm literally melting from sadness..." },
  { emoji: "😤", text: "Okay but like... reconsider?" },
  { emoji: "🐶", text: "Even this puppy face can't convince you?" },
];

const ProposalPopup: React.FC<ProposalPopupProps> = ({ name, onAccept }) => {
  const [rejectionCount, setRejectionCount] = useState(0);
  const [showRejection, setShowRejection] = useState(false);
  const [currentRejectionMsg, setCurrentRejectionMsg] = useState(rejectionMessages[0]);
  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const firstName = name.split(" ")[0];

  // Slow fade-in on mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const handleNo = () => {
    const msgIndex = rejectionCount % rejectionMessages.length;
    setCurrentRejectionMsg(rejectionMessages[msgIndex]);
    setShowRejection(true);
    setRejectionCount((prev) => prev + 1);
    setNoButtonOffset({ x: 0, y: 0 });
    setTimeout(() => setShowRejection(false), 1800);
  };

  const handleNoHover = () => {
    if (rejectionCount >= 2) {
      const intensity = Math.min(rejectionCount * 80, 400);
      const x = (Math.random() - 0.5) * intensity * 2;
      const y = (Math.random() - 0.5) * intensity;
      setNoButtonOffset({ x, y });
    }
  };

  const yesScale = Math.min(1 + rejectionCount * 0.12, 1.8);
  const noScale = Math.max(1 - rejectionCount * 0.1, 0.3);

  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 1.2s ease-in",
      }}
    >
      {showRejection ? (
        <div
          key={rejectionCount}
          className="glass rounded-3xl p-10 md:p-12 max-w-md mx-4 text-center shadow-2xl animate-[scaleIn_0.2s_ease-out]"
        >
          <div className="text-7xl mb-5">{currentRejectionMsg.emoji}</div>
          <p className="text-xl md:text-2xl font-display font-bold text-valentine-800">
            {currentRejectionMsg.text}
          </p>
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
              {rejectionCount === 1 && "Pretty please? 🥺"}
              {rejectionCount === 2 && "I'm not giving up! 💪"}
              {rejectionCount >= 3 && `Asked ${rejectionCount + 1} times and counting... 😤`}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              className="btn-yes"
              onClick={onAccept}
              style={{
                transform: `scale(${yesScale})`,
                transition: "transform 0.15s",
              }}
            >
              Yes! 💖
            </button>

            <button
              className="btn-no"
              onClick={() => { handleNoHover(); handleNo(); }}
              onMouseEnter={handleNoHover}
              style={{
                transform: `scale(${noScale}) translate(${noButtonOffset.x}px, ${noButtonOffset.y}px)`,
                transition: "transform 0.12s",
                willChange: "transform",
              }}
            >
              No...
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalPopup;
