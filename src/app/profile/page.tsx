'use client';

import { useState } from 'react';
import { User, Settings, Crown, LogOut, ChevronRight, Scale, Ruler, Calendar, Target } from 'lucide-react';
import BottomNav from '@/components/bottom-nav';

export default function ProfilePage() {
  const [userData] = useState({
    name: 'Usuário',
    email: 'usuario@nutrify.com',
    weight: 75,
    height: 175,
    age: 28,
    goal: 'Emagrecer',
    isPremium: false,
  });

  return (
    <div className="min-h-screen bg-[#121212] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1E1E1E] to-[#121212] p-6 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
            <p className="text-[#B0B0B0] text-sm">{userData.email}</p>
            {!userData.isPremium && (
              <div className="flex items-center gap-1 mt-2 text-[#FFC107] text-xs">
                <Crown className="w-3 h-3" />
                <span>Plano Gratuito</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 -mt-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1E1E1E] p-4 rounded-xl border border-[#2A2A2A]">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-[#4CAF50]" />
              <span className="text-xs text-[#B0B0B0]">Peso</span>
            </div>
            <p className="text-xl font-bold text-white">{userData.weight} kg</p>
          </div>
          <div className="bg-[#1E1E1E] p-4 rounded-xl border border-[#2A2A2A]">
            <div className="flex items-center gap-2 mb-2">
              <Ruler className="w-4 h-4 text-[#4CAF50]" />
              <span className="text-xs text-[#B0B0B0]">Altura</span>
            </div>
            <p className="text-xl font-bold text-white">{userData.height} cm</p>
          </div>
          <div className="bg-[#1E1E1E] p-4 rounded-xl border border-[#2A2A2A]">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-[#4CAF50]" />
              <span className="text-xs text-[#B0B0B0]">Idade</span>
            </div>
            <p className="text-xl font-bold text-white">{userData.age} anos</p>
          </div>
          <div className="bg-[#1E1E1E] p-4 rounded-xl border border-[#2A2A2A]">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-[#4CAF50]" />
              <span className="text-xs text-[#B0B0B0]">Objetivo</span>
            </div>
            <p className="text-sm font-bold text-white">{userData.goal}</p>
          </div>
        </div>
      </div>

      {/* Premium Banner */}
      {!userData.isPremium && (
        <div className="mx-6 mb-6">
          <div className="bg-gradient-to-r from-[#FFC107] to-[#FFD54F] p-6 rounded-2xl">
            <div className="flex items-start gap-3">
              <Crown className="w-8 h-8 text-[#121212]" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#121212] mb-1">
                  Upgrade para Premium
                </h3>
                <p className="text-sm text-[#121212]/80 mb-3">
                  Desbloqueie treinos avançados, planos personalizados e muito mais!
                </p>
                <button className="bg-[#121212] text-[#FFC107] px-6 py-2 rounded-xl font-semibold text-sm hover:bg-[#1E1E1E] transition-colors">
                  Ver Planos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Options */}
      <div className="px-6 space-y-2">
        <h2 className="text-sm font-semibold text-[#B0B0B0] mb-3 uppercase tracking-wider">
          Configurações
        </h2>

        <button className="w-full bg-[#1E1E1E] p-4 rounded-xl border border-[#2A2A2A] flex items-center justify-between hover:border-[#4CAF50] transition-colors">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-[#4CAF50]" />
            <span className="text-white">Editar Perfil</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#B0B0B0]" />
        </button>

        <button className="w-full bg-[#1E1E1E] p-4 rounded-xl border border-[#2A2A2A] flex items-center justify-between hover:border-[#4CAF50] transition-colors">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-[#4CAF50]" />
            <span className="text-white">Alterar Meta</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#B0B0B0]" />
        </button>

        <button className="w-full bg-[#1E1E1E] p-4 rounded-xl border border-[#2A2A2A] flex items-center justify-between hover:border-[#4CAF50] transition-colors">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-[#4CAF50]" />
            <span className="text-white">Preferências</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#B0B0B0]" />
        </button>

        <button className="w-full bg-[#1E1E1E] p-4 rounded-xl border border-[#2A2A2A] flex items-center justify-between hover:border-red-500 transition-colors mt-6">
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-red-500" />
            <span className="text-red-500">Sair</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#B0B0B0]" />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
