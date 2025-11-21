'use client';

import { useState } from 'react';
import { TrendingUp, Calendar, Award } from 'lucide-react';
import { useNutrify } from '@/lib/nutrify-context';
import BottomNav from '@/components/bottom-nav';

export default function ProgressPage() {
  const { userProfile, workouts, challenges } = useNutrify();
  const [weight, setWeight] = useState(userProfile?.weight.toString() || '70');

  const completedWorkouts = workouts.filter(w => w.completed).length;
  const totalWorkouts = workouts.length;
  const workoutProgress = totalWorkouts > 0 ? (completedWorkouts / totalWorkouts) * 100 : 0;

  const activeChallenge = challenges.find(c => !c.completed);
  const challengeProgress = activeChallenge
    ? (activeChallenge.currentDay / activeChallenge.days) * 100
    : 0;

  // Mock data para gráfico semanal
  const weeklyCalories = [1800, 2100, 1950, 2200, 1900, 2050, 1850];
  const maxCalories = Math.max(...weeklyCalories);

  return (
    <div className="min-h-screen bg-[#121212] pb-20">
      {/* Header */}
      <div className="bg-[#1E1E1E] p-6 border-b border-[#2A2A2A]">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-2">Progresso</h1>
          <p className="text-[#B0B0B0]">Acompanhe sua evolução</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-6 space-y-6">
        {/* Weight Tracker */}
        <div className="bg-gradient-to-br from-[#4CAF50]/20 to-[#66BB6A]/10 border border-[#4CAF50]/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#4CAF50]/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#4CAF50]" />
            </div>
            <div>
              <div className="text-sm text-[#B0B0B0]">Peso Atual</div>
              <div className="text-3xl font-bold text-[#4CAF50]">{weight} kg</div>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="flex-1 bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-3 text-white focus:border-[#4CAF50] focus:outline-none"
              placeholder="Peso atual"
            />
            <button className="bg-[#4CAF50] text-white px-6 rounded-xl font-semibold hover:bg-[#66BB6A] transition-colors">
              Salvar
            </button>
          </div>
        </div>

        {/* Weekly Calories Chart */}
        <div className="bg-[#1E1E1E] rounded-2xl p-6 border border-[#2A2A2A]">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-5 h-5 text-[#4CAF50]" />
            <h2 className="font-semibold text-lg">Calorias Semanais</h2>
          </div>
          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyCalories.map((cal, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-[#2A2A2A] rounded-t-lg overflow-hidden flex items-end" style={{ height: '100%' }}>
                  <div
                    className="w-full bg-gradient-to-t from-[#4CAF50] to-[#66BB6A] rounded-t-lg transition-all"
                    style={{ height: `${(cal / maxCalories) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-[#B0B0B0]">
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][index]}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#2A2A2A] text-center">
            <div className="text-sm text-[#B0B0B0]">Média Semanal</div>
            <div className="text-2xl font-bold text-[#4CAF50]">
              {Math.round(weeklyCalories.reduce((a, b) => a + b, 0) / weeklyCalories.length)} cal
            </div>
          </div>
        </div>

        {/* Workout Progress */}
        <div className="bg-[#1E1E1E] rounded-2xl p-6 border border-[#2A2A2A]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Treinos Concluídos</h2>
            <span className="text-[#4CAF50] font-bold">{completedWorkouts}/{totalWorkouts}</span>
          </div>
          <div className="h-3 bg-[#2A2A2A] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] transition-all"
              style={{ width: `${workoutProgress}%` }}
            />
          </div>
          <p className="text-sm text-[#B0B0B0] mt-2">
            {workoutProgress.toFixed(0)}% completo
          </p>
        </div>

        {/* Challenge Progress */}
        {activeChallenge && (
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="font-semibold text-lg">{activeChallenge.name}</div>
                <div className="text-sm text-[#B0B0B0]">
                  Dia {activeChallenge.currentDay} de {activeChallenge.days}
                </div>
              </div>
            </div>
            <div className="h-3 bg-[#2A2A2A] rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                style={{ width: `${challengeProgress}%` }}
              />
            </div>
            <p className="text-sm text-[#B0B0B0]">
              {challengeProgress.toFixed(0)}% completo
            </p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1E1E1E] rounded-2xl p-6 border border-[#2A2A2A] text-center">
            <div className="text-3xl font-bold text-[#4CAF50] mb-1">7</div>
            <div className="text-sm text-[#B0B0B0]">Dias de Streak</div>
          </div>
          <div className="bg-[#1E1E1E] rounded-2xl p-6 border border-[#2A2A2A] text-center">
            <div className="text-3xl font-bold text-[#FFC107] mb-1">2.5</div>
            <div className="text-sm text-[#B0B0B0]">kg Perdidos</div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
