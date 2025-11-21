'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Flame, Droplet, Dumbbell, Sparkles, ScanBarcode, TrendingUp } from 'lucide-react';
import { useNutrify } from '@/lib/nutrify-context';
import BottomNav from '@/components/bottom-nav';

export default function DashboardPage() {
  const router = useRouter();
  const { userProfile, dailyLog, workouts } = useNutrify();
  const [mounted, setMounted] = useState(false);
  const [waterGlasses, setWaterGlasses] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (!userProfile) {
      router.push('/onboarding');
    }
  }, [userProfile, router]);

  if (!mounted || !userProfile) {
    return null;
  }

  const consumedCalories = dailyLog?.meals.reduce((sum, meal) => sum + meal.calories, 0) || 0;
  const remainingCalories = userProfile.targetCalories - consumedCalories;
  const consumedProtein = dailyLog?.meals.reduce((sum, meal) => sum + meal.protein, 0) || 0;
  const consumedCarbs = dailyLog?.meals.reduce((sum, meal) => sum + meal.carbs, 0) || 0;
  const consumedFat = dailyLog?.meals.reduce((sum, meal) => sum + meal.fat, 0) || 0;

  const todayWorkout = workouts.find(w => !w.completed);

  return (
    <div className="min-h-screen bg-[#121212] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1E1E1E] to-[#121212] p-6 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Olá, {userProfile.name}! 👋</h1>
              <p className="text-[#B0B0B0] text-sm">Vamos conquistar o dia</p>
            </div>
            <button
              onClick={() => router.push('/profile')}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] flex items-center justify-center text-white font-bold text-lg"
            >
              {userProfile.name.charAt(0).toUpperCase()}
            </button>
          </div>

          {/* Calories Card */}
          <div className="bg-gradient-to-br from-[#4CAF50]/20 to-[#66BB6A]/10 border border-[#4CAF50]/30 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#4CAF50]/20 flex items-center justify-center">
                <Flame className="w-6 h-6 text-[#4CAF50]" />
              </div>
              <div>
                <div className="text-sm text-[#B0B0B0]">Calorias Restantes</div>
                <div className="text-3xl font-bold text-[#4CAF50]">{remainingCalories}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#4CAF50]/20">
              <div>
                <div className="text-xs text-[#B0B0B0] mb-1">Proteína</div>
                <div className="text-lg font-semibold">
                  {consumedProtein}<span className="text-sm text-[#B0B0B0]">/{userProfile.targetProtein}g</span>
                </div>
                <div className="h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-[#4CAF50]"
                    style={{ width: `${Math.min((consumedProtein / userProfile.targetProtein) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="text-xs text-[#B0B0B0] mb-1">Carbos</div>
                <div className="text-lg font-semibold">
                  {consumedCarbs}<span className="text-sm text-[#B0B0B0]">/{userProfile.targetCarbs}g</span>
                </div>
                <div className="h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-[#FFC107]"
                    style={{ width: `${Math.min((consumedCarbs / userProfile.targetCarbs) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="text-xs text-[#B0B0B0] mb-1">Gordura</div>
                <div className="text-lg font-semibold">
                  {consumedFat}<span className="text-sm text-[#B0B0B0]">/{userProfile.targetFat}g</span>
                </div>
                <div className="h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-[#FF9800]"
                    style={{ width: `${Math.min((consumedFat / userProfile.targetFat) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-6 space-y-6">
        {/* Today's Workout */}
        {todayWorkout && (
          <div className="bg-[#1E1E1E] rounded-2xl p-6 border border-[#2A2A2A]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#4CAF50]/20 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-[#4CAF50]" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-[#B0B0B0]">Treino de Hoje</div>
                <div className="font-semibold">{todayWorkout.name}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#B0B0B0] mb-4">
              <span>{todayWorkout.exercises.length} exercícios</span>
              <span>•</span>
              <span>{todayWorkout.duration} min</span>
            </div>
            <button
              onClick={() => router.push('/workouts')}
              className="w-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#4CAF50]/20 transition-all"
            >
              Iniciar Treino
            </button>
          </div>
        )}

        {/* Hydration */}
        <div className="bg-[#1E1E1E] rounded-2xl p-6 border border-[#2A2A2A]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Droplet className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#B0B0B0]">Hidratação</div>
              <div className="font-semibold">{waterGlasses} / 8 copos</div>
            </div>
          </div>
          <div className="grid grid-cols-8 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setWaterGlasses(Math.max(0, i === waterGlasses - 1 ? i : i + 1))}
                className={`aspect-square rounded-lg transition-all ${
                  i < waterGlasses
                    ? 'bg-blue-500'
                    : 'bg-[#2A2A2A] hover:bg-[#333]'
                }`}
              >
                <Droplet className={`w-4 h-4 mx-auto ${i < waterGlasses ? 'text-white' : 'text-[#666]'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => router.push('/coach')}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6 text-left hover:scale-105 transition-transform"
          >
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <div className="font-semibold mb-1">Coach IA</div>
            <div className="text-xs text-[#B0B0B0]">Tire suas dúvidas</div>
          </button>

          <button
            onClick={() => router.push('/scanner')}
            className="bg-gradient-to-br from-[#FFC107]/20 to-[#FF9800]/10 border border-[#FFC107]/30 rounded-2xl p-6 text-left hover:scale-105 transition-transform"
          >
            <div className="w-12 h-12 rounded-full bg-[#FFC107]/20 flex items-center justify-center mb-3">
              <ScanBarcode className="w-6 h-6 text-[#FFC107]" />
            </div>
            <div className="font-semibold mb-1">Scanner</div>
            <div className="text-xs text-[#B0B0B0]">Escanear alimento</div>
          </button>
        </div>

        {/* Progress Teaser */}
        <button
          onClick={() => router.push('/progress')}
          className="w-full bg-[#1E1E1E] rounded-2xl p-6 border border-[#2A2A2A] text-left hover:border-[#4CAF50]/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4CAF50]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#4CAF50]" />
            </div>
            <div className="flex-1">
              <div className="font-semibold mb-1">Ver Progresso</div>
              <div className="text-sm text-[#B0B0B0]">Acompanhe sua evolução</div>
            </div>
          </div>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
