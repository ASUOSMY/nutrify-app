'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/nutrify/bottom-nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNutrify } from '@/lib/nutrify-context';
import { TrendingUp, TrendingDown, Award, Flame, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressPage() {
  const { user } = useNutrify();
  const [currentWeight, setCurrentWeight] = useState(user?.weight.toString() || '');

  // Mock data for charts
  const weightData = [
    { date: 'Seg', weight: 75 },
    { date: 'Ter', weight: 74.8 },
    { date: 'Qua', weight: 74.5 },
    { date: 'Qui', weight: 74.3 },
    { date: 'Sex', weight: 74 },
    { date: 'Sáb', weight: 73.8 },
    { date: 'Dom', weight: 73.5 },
  ];

  const caloriesData = [
    { date: 'Seg', consumed: 1800, burned: 300 },
    { date: 'Ter', consumed: 2000, burned: 400 },
    { date: 'Qua', consumed: 1900, burned: 350 },
    { date: 'Qui', consumed: 2100, burned: 450 },
    { date: 'Sex', consumed: 1850, burned: 300 },
    { date: 'Sáb', consumed: 2200, burned: 500 },
    { date: 'Dom', consumed: 1950, burned: 400 },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FA] dark:bg-[#121212] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white p-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold mb-2">Progresso</h1>
          <p className="text-white/80">Acompanhe sua evolução</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Streak */}
        <div className="bg-gradient-to-br from-[#FFC107] to-[#FF9800] text-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-6 h-6" />
                <h3 className="font-bold text-lg">Sequência</h3>
              </div>
              <p className="text-white/90 text-sm">Dias consecutivos cumprindo metas</p>
            </div>
            <div className="text-5xl font-bold">7</div>
          </div>
        </div>

        {/* Weight Tracking */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-6">
          <h3 className="font-bold mb-4">Peso</h3>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Inicial</div>
              <div className="text-xl font-bold">{user?.weight}kg</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Atual</div>
              <div className="text-xl font-bold text-[#4CAF50]">73.5kg</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Meta</div>
              <div className="text-xl font-bold">70kg</div>
            </div>
          </div>

          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis stroke="#888" domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#4CAF50"
                  strokeWidth={3}
                  dot={{ fill: '#4CAF50', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-2">
            <Input
              type="number"
              step="0.1"
              placeholder="Peso atual"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-[#4CAF50] hover:bg-[#2E7D32]">
              Registrar
            </Button>
          </div>
        </div>

        {/* Calories Chart */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-6">
          <h3 className="font-bold mb-4">Calorias Semanais</h3>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={caloriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="consumed"
                  stroke="#4CAF50"
                  strokeWidth={2}
                  name="Consumidas"
                />
                <Line
                  type="monotone"
                  dataKey="burned"
                  stroke="#FFC107"
                  strokeWidth={2}
                  name="Queimadas"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-6">
          <h3 className="font-bold mb-4">Conquistas</h3>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#4CAF50]/10 flex items-center justify-center">
                <Award className="w-8 h-8 text-[#4CAF50]" />
              </div>
              <div className="text-xs font-semibold">7 Dias</div>
              <div className="text-xs text-gray-500">Sequência</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#FFC107]/10 flex items-center justify-center">
                <Flame className="w-8 h-8 text-[#FFC107]" />
              </div>
              <div className="text-xs font-semibold">1000 cal</div>
              <div className="text-xs text-gray-500">Queimadas</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-blue-500/10 flex items-center justify-center">
                <TrendingDown className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-xs font-semibold">-1.5kg</div>
              <div className="text-xs text-gray-500">Perdidos</div>
            </div>
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-6">
          <h3 className="font-bold mb-4">Resumo Semanal</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Treinos Completos</span>
              <span className="font-bold">5/7</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Meta Calórica</span>
              <span className="font-bold text-[#4CAF50]">6/7 dias</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Hidratação</span>
              <span className="font-bold text-blue-500">14L / 14L</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Refeições Registradas</span>
              <span className="font-bold">21/21</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
