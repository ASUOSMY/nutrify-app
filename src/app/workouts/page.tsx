'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Play, Check, Clock } from 'lucide-react';
import { useNutrify } from '@/lib/nutrify-context';
import BottomNav from '@/components/bottom-nav';

export default function WorkoutsPage() {
  const router = useRouter();
  const { workouts, setWorkouts } = useNutrify();
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [activeExercise, setActiveExercise] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);

  const handleCompleteWorkout = (workoutId: string) => {
    const updated = workouts.map(w =>
      w.id === workoutId ? { ...w, completed: true } : w
    );
    setWorkouts(updated);
    setIsWorkoutActive(false);
    setSelectedWorkout(null);
    setActiveExercise(0);
  };

  const currentWorkout = workouts.find(w => w.id === selectedWorkout);

  if (selectedWorkout && currentWorkout) {
    return (
      <div className="min-h-screen bg-[#121212]">
        {/* Header */}
        <div className="bg-[#1E1E1E] p-4 border-b border-[#2A2A2A]">
          <div className="max-w-lg mx-auto flex items-center gap-4">
            <button
              onClick={() => {
                setSelectedWorkout(null);
                setIsWorkoutActive(false);
                setActiveExercise(0);
              }}
              className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#333] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="font-bold">{currentWorkout.name}</h1>
              <p className="text-sm text-[#B0B0B0]">
                Exercício {activeExercise + 1} de {currentWorkout.exercises.length}
              </p>
            </div>
          </div>
        </div>

        {/* Exercise Content */}
        <div className="max-w-lg mx-auto p-6 space-y-6">
          {currentWorkout.exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className={`bg-[#1E1E1E] rounded-2xl p-6 border-2 transition-all ${
                index === activeExercise
                  ? 'border-[#4CAF50]'
                  : index < activeExercise
                  ? 'border-[#2A2A2A] opacity-50'
                  : 'border-[#2A2A2A]'
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index < activeExercise ? 'bg-[#4CAF50]' : 'bg-[#2A2A2A]'
                }`}>
                  {index < activeExercise ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{exercise.name}</h3>
                  <p className="text-sm text-[#B0B0B0] mb-3">{exercise.description}</p>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#4CAF50]/20 flex items-center justify-center">
                        <span className="text-[#4CAF50] font-bold">{exercise.sets}</span>
                      </div>
                      <span className="text-[#B0B0B0]">séries</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#FFC107]/20 flex items-center justify-center">
                        <span className="text-[#FFC107] font-bold text-xs">{exercise.reps}</span>
                      </div>
                      <span className="text-[#B0B0B0]">reps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#B0B0B0]" />
                      <span className="text-[#B0B0B0]">{exercise.rest}s</span>
                    </div>
                  </div>
                </div>
              </div>

              {index === activeExercise && (
                <button
                  onClick={() => {
                    if (activeExercise < currentWorkout.exercises.length - 1) {
                      setActiveExercise(activeExercise + 1);
                    } else {
                      handleCompleteWorkout(currentWorkout.id);
                    }
                  }}
                  className="w-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#4CAF50]/20 transition-all"
                >
                  {activeExercise < currentWorkout.exercises.length - 1 ? 'Próximo Exercício' : 'Concluir Treino'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] pb-20">
      {/* Header */}
      <div className="bg-[#1E1E1E] p-6 border-b border-[#2A2A2A]">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-2">Treinos</h1>
          <p className="text-[#B0B0B0]">Seu plano semanal personalizado</p>
        </div>
      </div>

      {/* Workouts List */}
      <div className="max-w-lg mx-auto p-6 space-y-4">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className={`bg-[#1E1E1E] rounded-2xl p-6 border-2 transition-all ${
              workout.completed
                ? 'border-[#4CAF50] bg-[#4CAF50]/5'
                : 'border-[#2A2A2A] hover:border-[#4CAF50]/50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                workout.completed ? 'bg-[#4CAF50]' : 'bg-[#2A2A2A]'
              }`}>
                {workout.completed ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-[#B0B0B0]" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg">{workout.name}</h3>
                  {workout.completed && (
                    <span className="text-xs bg-[#4CAF50]/20 text-[#4CAF50] px-2 py-1 rounded-full">
                      Concluído
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#B0B0B0] mb-3">{workout.day}</p>
                <div className="flex items-center gap-4 text-sm text-[#B0B0B0] mb-4">
                  <span>{workout.exercises.length} exercícios</span>
                  <span>•</span>
                  <span>{workout.duration} minutos</span>
                </div>
                {!workout.completed && (
                  <button
                    onClick={() => {
                      setSelectedWorkout(workout.id);
                      setIsWorkoutActive(true);
                    }}
                    className="w-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#4CAF50]/20 transition-all"
                  >
                    Iniciar Treino
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
