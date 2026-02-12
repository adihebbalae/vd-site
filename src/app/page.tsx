"use client";

import React, { useState, useCallback } from "react";
import RSVPForm from "@/components/RSVPForm";
import LoadingScreen from "@/components/LoadingScreen";
import ProposalPopup from "@/components/ProposalPopup";
import CelebrationScreen from "@/components/CelebrationScreen";

type Phase = "form" | "loading" | "proposal" | "celebration";

interface FormData {
  name: string;
  major: string;
  year: string;
  email: string;
  phone: string;
  funFact: string;
}

export default function Home() {
  const [phase, setPhase] = useState<Phase>("form");
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleFormSubmit = useCallback((data: FormData) => {
    setFormData(data);
    setPhase("loading");
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setPhase("proposal");
  }, []);

  const handleAccept = useCallback(() => {
    setPhase("celebration");
  }, []);

  // Black background for proposal and celebration phases
  const bgClass = (phase === "proposal" || phase === "loading")
    ? "bg-black" : phase === "celebration" ? "bg-gradient-to-b from-valentine-50 via-white to-valentine-50" : "bg-[#f8f9fa]";

  return (
    <main className={`relative min-h-screen flex items-center justify-center py-10 px-4 transition-colors duration-700 ${bgClass}`}>
      <div className="relative z-10 w-full">
        {phase === "form" && (
          <RSVPForm key="form" onSubmit={handleFormSubmit} />
        )}

        {phase === "loading" && formData && (
          <LoadingScreen
            key="loading"
            onComplete={handleLoadingComplete}
            name={formData.name}
          />
        )}

        {phase === "proposal" && formData && (
          <ProposalPopup
            key="proposal"
            name={formData.name}
            onAccept={handleAccept}
          />
        )}

        {phase === "celebration" && formData && (
          <CelebrationScreen name={formData.name} />
        )}
      </div>
    </main>
  );
}
