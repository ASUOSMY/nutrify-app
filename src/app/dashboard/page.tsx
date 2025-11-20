'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useNutrify } from '@/lib/nutrify-context';
import { BottomNav } from '@/components/nutrify/bottom-nav';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Flame,
  Droplet,
  Play,
  Scan,
  Sparkles,
  TrendingUp,
  Apple,
  Zap,
} from 'lucide-react';

// Helper para garantir número válido
const safeNumber = (value: any, fallback: number = 0): number => {
  const num = Number(value);
  return isNaN(num) || !isFinite(num) ? fallback : num;
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, dailyStats, waterIntake, addWater } = useNutrify();

  useEffect(() => {
    if (!user) {
      router.push('/onboarding');
    }
  }, [user, router]);

  if (!user) return null;

  // Garantir que todos os valores são números válidos ANTES de qualquer cálculo
  const dailyCalories = safeNumber(user.dailyCalories, 2000);
  const caloriesConsumed = safeNumber(dailyStats.caloriesConsumed, 0);
  const caloriesBurned = safeNumber(dailyStats.caloriesBurned, 0);
  const protein = safeNumber(dailyStats.protein, 0);
  const carbs = safeNumber(dailyStats.carbs, 0);
  const fat = safeNumber(dailyStats.fat, 0);
  const water = safeNumber(waterIntake, 0);
  
  const macroProtein = safeNumber(user.macros?.protein, 150);
  const macroCarbs = safeNumber(user.macros?.carbs, 200);
  const macroFat = safeNumber(user.macros?.fat, 60);

  // Agora fazer os cálculos com valores seguros
  const caloriesRemaining = Math.max(0, dailyCalories - caloriesConsumed + caloriesBurned);
  const caloriesProgress = dailyCalories > 0 ? (caloriesConsumed / dailyCalories) * 100 : 0;
  
  const waterGoal = 2000; // 2L
  const waterProgress = (water / waterGoal) * 100;

  // Calcular progresso dos macros com segurança
  const proteinProgress = macroProtein > 0 ? (protein / macroProtein) * 100 : 0;
  const carbsProgress = macroCarbs > 0 ? (carbs / macroCarbs) * 100 : 0;
  const fatProgress = macroFat > 0 ? (fat / macroFat) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#F7F9FA] dark:bg-[#121212] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white p-6 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-1">Olá, {user.name}! 👋</h1>
          <p className="text-white/80">Vamos conquistar seus objetivos hoje</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 space-y-4">
        {/* Calories Card */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-[#FFC107]" />
              <h2 className="text-lg font-bold">Calorias</h2>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#4CAF50]">
                {Math.round(caloriesRemaining)}
              </div>
              <div className="text-sm text-gray-500">restantes</div>
            </div>
          </div>

          <Progress value={Math.min(caloriesProgress, 100)} className="h-3 mb-3" />

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-500">Meta</div>
              <div className="font-bold">{Math.round(dailyCalories)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Consumidas</div>
              <div className="font-bold text-[#4CAF50]">{Math.round(caloriesConsumed)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Queimadas</div>
              <div className="font-bold text-[#FFC107]">{Math.round(caloriesBurned)}</div>
            </div>
          </div>
        </div>

        {/* Macros */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-6">
          <h3 className="font-bold mb-4">Macronutrientes</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Proteína</span>
                <span className="font-semibold">
                  {Math.round(protein)}g / {Math.round(macroProtein)}g
                </span>
              </div>
              <Progress
                value={Math.min(proteinProgress, 100)}
                className="h-2"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Carboidratos</span>
                <span className="font-semibold">
                  {Math.round(carbs)}g / {Math.round(macroCarbs)}g
                </span>
              </div>
              <Progress
                value={Math.min(carbsProgress, 100)}
                className="h-2"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Gordura</span>
                <span className="font-semibold">
                  {Math.round(fat)}g / {Math.round(macroFat)}g
                </span>
              </div>
              <Progress
                value={Math.min(fatProgress, 100)}
                className="h-2"
              />
            </div>
          </div>
        </div>

        {/* Workout of the Day */}
        <div className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5" />
            <h3 className="font-bold">Treino do Dia</h3>
          </div>
          <h4 className="text-xl font-bold mb-2">Treino Full Body Iniciante</h4>
          <p className="text-white/80 mb-4">20 min • 150 cal</p>
          <Link href="/workouts">
            <Button className="w-full bg-white text-[#4CAF50] hover:bg-white/90">
              <Play className="w-4 h-4 mr-2" />
              Iniciar Treino
            </Button>
          </Link>
        </div>

        {/* Water Intake */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Droplet className="w-6 h-6 text-blue-500" />
              <h3 className="font-bold">Hidratação</h3>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">{Math.round(water)}ml</div>
              <div className="text-sm text-gray-500">de {waterGoal}ml</div>
            </div>
          </div>

          <Progress value={Math.min(waterProgress, 100)} className="h-3 mb-4" />

          <div className="flex gap-2">
            <Button
              onClick={() => addWater(250)}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              +250ml
            </Button>
            <Button
              onClick={() => addWater(500)}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              +500ml
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/scanner">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform">
              <Scan className="w-8 h-8 mx-auto mb-2 text-[#4CAF50]" />
              <div className="font-semibold">Scanner</div>
              <div className="text-xs text-gray-500">Escanear alimento</div>
            </div>
          </Link>

          <Link href="/coach">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-[#FFC107]" />
              <div className="font-semibold">Coach IA</div>
              <div className="text-xs text-gray-500">Dicas e motivação</div>
            </div>
          </Link>
        </div>

        {/* Premium Banner */}
        {!user.isPremium && (
          <div className="bg-gradient-to-r from-[#FFC107] to-[#FF9800] rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">Upgrade para Premium</h3>
                <p className="text-sm text-white/90 mb-4">
                  Desbloqueie treinos completos, IA ilimitada e muito mais
                </p>
                <Button className="bg-white text-[#FF9800] hover:bg-white/90">
                  Ver Planos
                </Button>
              </div>
              <Sparkles className="w-8 h-8" />
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
