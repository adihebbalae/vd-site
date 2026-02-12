"use client";

import React, { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
  name: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<"loading" | "blackout">("loading");

  useEffect(() => {
    const blackoutTimer = setTimeout(() => setStage("blackout"), 4000);
    const completeTimer = setTimeout(() => onComplete(), 5500);
    return () => { clearTimeout(blackoutTimer); clearTimeout(completeTimer); };
  }, [onComplete]);

  return (
    <>
      {/* Greyed-out "page 2" preview in background */}
      <div
        className="fixed inset-0 flex items-center justify-center z-10"
        style={{
          opacity: stage === "loading" ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <div className="w-full max-w-lg mx-4 opacity-[0.18] blur-[2px] pointer-events-none select-none">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400 rounded-t-2xl" />
            <div className="text-center mb-6">
              <div className="text-3xl mb-2">📝</div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">A Few More Questions</h2>
              <p className="text-gray-400 text-xs">Just a couple more, we promise!</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Favorite Food *</label>
                <div className="w-full h-11 rounded-xl border-2 border-gray-200 bg-white px-4 flex items-center">
                  <span className="text-gray-300 text-sm">e.g. Sushi, Pizza...</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Favorite Color</label>
                  <div className="w-full h-11 rounded-xl border-2 border-gray-200 bg-white px-4 flex items-center">
                    <span className="text-gray-300 text-sm">Select...</span>
                    <span className="ml-auto text-gray-300">▾</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Go-to Song</label>
                  <div className="w-full h-11 rounded-xl border-2 border-gray-200 bg-white px-4 flex items-center">
                    <span className="text-gray-300 text-sm">Song name...</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">How did you hear about this?</label>
                <div className="w-full h-11 rounded-xl border-2 border-gray-200 bg-white px-4 flex items-center">
                  <span className="text-gray-300 text-sm">Choose one...</span>
                  <span className="ml-auto text-gray-300">▾</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Questions &amp; Comments</label>
                <div className="w-full h-20 rounded-xl border-2 border-gray-200 bg-white px-4 pt-3">
                  <span className="text-gray-300 text-sm">Anything you&apos;d like to share...</span>
                </div>
              </div>
              <div className="pt-2">
                <div className="w-full h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">Submit →</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60">
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 rounded-full border-[3px] border-gray-200 border-t-slate-600 animate-spin" />
          </div>
          <p className="text-gray-500 font-body text-sm font-medium">Loading...</p>
          <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden mt-4">
            <div className="h-full bg-slate-500 rounded-full animate-[progress_3.8s_ease-in-out_forwards]" />
          </div>
        </div>
      </div>

      {/* Blackout overlay */}
      <div
        className="fixed inset-0 bg-black z-20"
        style={{
          opacity: stage === "blackout" ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: stage === "blackout" ? "auto" : "none",
        }}
      />
    </>
  );
};

export default LoadingScreen;
