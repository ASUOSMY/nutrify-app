'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dumbbell, Sparkles } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Verificar se usuário já fez onboarding
    const onboarded = localStorage.getItem('nutrify_onboarded');
    if (onboarded === 'true') {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] via-[#1a2e1a] to-[#121212] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[#4CAF50] blur-3xl opacity-30 rounded-full"></div>
            <Dumbbell className="w-20 h-20 text-[#4CAF50] relative" />
          </div>
        </div>

        {/* Título */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#4CAF50] to-[#81C784] bg-clip-text text-transparent">
            Nutrify
          </h1>
          <p className="text-xl text-[#B0B0B0]">
            Sua jornada de transformação começa aqui
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 my-12">
          <div className="bg-[#1E1E1E] p-4 rounded-2xl border border-[#2A2A2A]">
            <div className="text-3xl mb-2">🍎</div>
            <p className="text-sm text-[#B0B0B0]">Nutrição Inteligente</p>
          </div>
          <div className="bg-[#1E1E1E] p-4 rounded-2xl border border-[#2A2A2A]">
            <div className="text-3xl mb-2">💪</div>
            <p className="text-sm text-[#B0B0B0]">Treinos Personalizados</p>
          </div>
          <div className="bg-[#1E1E1E] p-4 rounded-2xl border border-[#2A2A2A]">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-sm text-[#B0B0B0]">Progresso Visual</p>
          </div>
          <div className="bg-[#1E1E1E] p-4 rounded-2xl border border-[#2A2A2A]">
            <div className="text-3xl mb-2">🤖</div>
            <p className="text-sm text-[#B0B0B0]">Coach IA</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => router.push('/onboarding')}
          className="w-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-[#4CAF50]/20 hover:shadow-[#4CAF50]/40 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Começar Agora
        </button>

        <p className="text-xs text-[#B0B0B0] mt-4">
          Transforme seu corpo e mente em 21 dias
        </p>
      </div>
    </div>
  );
}
