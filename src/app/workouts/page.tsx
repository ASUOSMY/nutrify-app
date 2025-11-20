'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BottomNav } from '@/components/nutrify/bottom-nav';
import { Button } from '@/components/ui/button';
import { mockWorkouts } from '@/lib/mock-data';
import { Dumbbell, Clock, Flame, Play, CheckCircle2 } from 'lucide-react';

export default function WorkoutsPage() {
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([]);

  const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  return (
    <div className="min-h-screen bg-[#F7F9FA] dark:bg-[#121212] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white p-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold mb-2">Treinos</h1>
          <p className="text-white/80">Seu plano semanal personalizado</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Week Overview */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-6">
          <h2 className="font-bold mb-4">Semana Atual</h2>
          <div className="flex justify-between">
            {weekDays.map((day, index) => {
              const hasWorkout = mockWorkouts.some((w) => w.day === index + 1);
              const isCompleted = completedWorkouts.includes(`day-${index + 1}`);

              return (
                <div key={day} className="text-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                      isCompleted
                        ? 'bg-[#4CAF50] text-white'
                        : hasWorkout
                        ? 'bg-[#4CAF50]/20 text-[#4CAF50]'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : hasWorkout ? (
                      <Dumbbell className="w-4 h-4" />
                    ) : (
                      '-'
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{day}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workouts List */}
        <div className="space-y-4">
          <h2 className="font-bold text-lg">Treinos Disponíveis</h2>

          {mockWorkouts.map((workout) => {
            const isCompleted = completedWorkouts.includes(workout.id);

            return (
              <div
                key={workout.id}
                className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{workout.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {workout.description}
                      </p>
                    </div>
                    {isCompleted && (
                      <CheckCircle2 className="w-6 h-6 text-[#4CAF50] flex-shrink-0 ml-2" />
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{workout.totalDuration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      <span>{workout.caloriesBurn} cal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Dumbbell className="w-4 h-4" />
                      <span className="capitalize">{workout.difficulty}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    {workout.equipment.map((eq) => (
                      <span
                        key={eq}
                        className="px-3 py-1 bg-[#4CAF50]/10 text-[#4CAF50] text-xs rounded-full"
                      >
                        {eq === 'none' ? 'Sem equipamento' : eq}
                      </span>
                    ))}
                  </div>

                  <Link href={`/workouts/${workout.id}`}>
                    <Button
                      className={`w-full ${
                        isCompleted
                          ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          : 'bg-[#4CAF50] hover:bg-[#2E7D32]'
                      }`}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isCompleted ? 'Treinar Novamente' : 'Iniciar Treino'}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-6">
          <h3 className="font-bold mb-4">Estatísticas da Semana</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#4CAF50]">
                {completedWorkouts.length}
              </div>
              <div className="text-sm text-gray-500">Treinos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#FFC107]">
                {completedWorkouts.length * 150}
              </div>
              <div className="text-sm text-gray-500">Calorias</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">
                {completedWorkouts.length * 20}
              </div>
              <div className="text-sm text-gray-500">Minutos</div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
