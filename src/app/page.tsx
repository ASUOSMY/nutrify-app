"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para onboarding na primeira visita
    const hasCompletedOnboarding = localStorage.getItem("nutrify_onboarding_completed");
    
    if (!hasCompletedOnboarding) {
      router.push("/onboarding");
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-green-600">
      <div className="text-center">
        <div className="animate-pulse">
          <h1 className="text-6xl font-bold text-white mb-4">Nutrify</h1>
          <p className="text-xl text-white/90">Carregando...</p>
        </div>
      </div>
    </div>
  );
}
