'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNutrify } from '@/lib/nutrify-context';
import { calculateBMR, calculateTDEE, calculateTargetCalories, calculateMacros } from '@/lib/nutrify-calculations';
import { Goal, ActivityLevel, Equipment } from '@/lib/nutrify-types';
import { mockWorkouts, mockChallenges } from '@/lib/nutrify-mock-data';

export default function OnboardingPage() {
  const router = useRouter();
  const { setUserProfile, setIsOnboarded, setWorkouts, setChallenges } = useNutrify();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Form data
  const [goal, setGoal] = useState<Goal>('lose');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [equipment, setEquipment] = useState<Equipment[]>(['bodyweight']);
  const [name, setName] = useState('');
  const [age, setAge] = useState('25');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    const bmr = calculateBMR(Number(weight), Number(height), Number(age), gender);
    const tdee = calculateTDEE(bmr, activityLevel);
    const targetCalories = calculateTargetCalories(tdee, goal);
    const macros = calculateMacros(targetCalories, goal);

    const profile = {
      name,
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
      gender,
      goal,
      activityLevel,
      equipment,
      targetCalories,
      targetProtein: macros.protein,
      targetCarbs: macros.carbs,
      targetFat: macros.fat,
    };

    setUserProfile(profile);
    setWorkouts(mockWorkouts);
    setChallenges(mockChallenges);
    setIsOnboarded(true);
    router.push('/dashboard');
  };

  const toggleEquipment = (eq: Equipment) => {
    if (equipment.includes(eq)) {
      setEquipment(equipment.filter(e => e !== eq));
    } else {
      setEquipment([...equipment, eq]);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      {/* Progress Bar */}
      <div className="bg-[#1E1E1E] p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-[#B0B0B0]">Passo {step} de {totalSteps}</span>
            <span className="text-sm text-[#4CAF50]">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto pb-24">
        <div className="max-w-lg mx-auto">
          {/* Step 1: Goal */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Qual seu objetivo?</h1>
                <p className="text-[#B0B0B0]">Vamos personalizar seu plano</p>
              </div>

              <div className="space-y-4">
                {[
                  { value: 'lose' as Goal, emoji: '🔥', title: 'Emagrecer', desc: 'Perder gordura e definir' },
                  { value: 'gain' as Goal, emoji: '💪', title: 'Ganhar Massa', desc: 'Aumentar músculos' },
                  { value: 'maintain' as Goal, emoji: '⚖️', title: 'Manter Forma', desc: 'Manter peso atual' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setGoal(option.value)}
                    className={`w-full p-6 rounded-2xl border-2 transition-all ${
                      goal === option.value
                        ? 'border-[#4CAF50] bg-[#4CAF50]/10'
                        : 'border-[#2A2A2A] bg-[#1E1E1E] hover:border-[#4CAF50]/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{option.emoji}</div>
                      <div className="text-left">
                        <div className="font-semibold text-lg">{option.title}</div>
                        <div className="text-sm text-[#B0B0B0]">{option.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Activity Level */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Nível de Atividade</h1>
                <p className="text-[#B0B0B0]">Qual sua rotina atual?</p>
              </div>

              <div className="space-y-4">
                {[
                  { value: 'sedentary' as ActivityLevel, title: 'Sedentário', desc: 'Pouco ou nenhum exercício' },
                  { value: 'light' as ActivityLevel, title: 'Leve', desc: '1-3 dias por semana' },
                  { value: 'moderate' as ActivityLevel, title: 'Moderado', desc: '3-5 dias por semana' },
                  { value: 'active' as ActivityLevel, title: 'Ativo', desc: '6-7 dias por semana' },
                  { value: 'very_active' as ActivityLevel, title: 'Muito Ativo', desc: 'Atleta ou trabalho físico' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setActivityLevel(option.value)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all ${
                      activityLevel === option.value
                        ? 'border-[#4CAF50] bg-[#4CAF50]/10'
                        : 'border-[#2A2A2A] bg-[#1E1E1E] hover:border-[#4CAF50]/50'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-semibold">{option.title}</div>
                      <div className="text-sm text-[#B0B0B0]">{option.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Equipment */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Equipamentos</h1>
                <p className="text-[#B0B0B0]">O que você tem disponível?</p>
              </div>

              <div className="space-y-4">
                {[
                  { value: 'bodyweight' as Equipment, emoji: '🤸', title: 'Peso Corporal', desc: 'Sem equipamento' },
                  { value: 'dumbbells' as Equipment, emoji: '🏋️', title: 'Halteres', desc: 'Pesos livres' },
                  { value: 'resistance_bands' as Equipment, emoji: '🎗️', title: 'Faixas Elásticas', desc: 'Bandas de resistência' },
                  { value: 'full_gym' as Equipment, emoji: '🏢', title: 'Academia', desc: 'Acesso completo' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleEquipment(option.value)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all ${
                      equipment.includes(option.value)
                        ? 'border-[#4CAF50] bg-[#4CAF50]/10'
                        : 'border-[#2A2A2A] bg-[#1E1E1E] hover:border-[#4CAF50]/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{option.emoji}</div>
                      <div className="text-left">
                        <div className="font-semibold">{option.title}</div>
                        <div className="text-sm text-[#B0B0B0]">{option.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Personal Data */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Dados Pessoais</h1>
                <p className="text-[#B0B0B0]">Para calcular suas metas</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#B0B0B0] mb-2">Nome</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-4 text-white placeholder:text-[#666] focus:border-[#4CAF50] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#B0B0B0] mb-2">Idade</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-4 text-white focus:border-[#4CAF50] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#B0B0B0] mb-2">Sexo</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                      className="w-full bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-4 text-white focus:border-[#4CAF50] focus:outline-none"
                    >
                      <option value="male">Masculino</option>
                      <option value="female">Feminino</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#B0B0B0] mb-2">Peso (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-4 text-white focus:border-[#4CAF50] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#B0B0B0] mb-2">Altura (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-4 text-white focus:border-[#4CAF50] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Summary */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Tudo Pronto! 🎉</h1>
                <p className="text-[#B0B0B0]">Suas metas foram calculadas</p>
              </div>

              <div className="bg-gradient-to-br from-[#4CAF50]/20 to-[#66BB6A]/10 border border-[#4CAF50]/30 rounded-2xl p-6 space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#4CAF50] mb-2">
                    {calculateTargetCalories(
                      calculateTDEE(
                        calculateBMR(Number(weight), Number(height), Number(age), gender),
                        activityLevel
                      ),
                      goal
                    )}
                  </div>
                  <div className="text-[#B0B0B0]">Calorias diárias</div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#4CAF50]/20">
                  {(() => {
                    const macros = calculateMacros(
                      calculateTargetCalories(
                        calculateTDEE(
                          calculateBMR(Number(weight), Number(height), Number(age), gender),
                          activityLevel
                        ),
                        goal
                      ),
                      goal
                    );
                    return (
                      <>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#4CAF50]">{macros.protein}g</div>
                          <div className="text-xs text-[#B0B0B0]">Proteína</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#FFC107]">{macros.carbs}g</div>
                          <div className="text-xs text-[#B0B0B0]">Carboidratos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#FF9800]">{macros.fat}g</div>
                          <div className="text-xs text-[#B0B0B0]">Gorduras</div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="bg-[#1E1E1E] rounded-2xl p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#B0B0B0]">Objetivo:</span>
                  <span className="font-semibold">
                    {goal === 'lose' ? 'Emagrecer' : goal === 'gain' ? 'Ganhar Massa' : 'Manter Forma'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B0B0B0]">Atividade:</span>
                  <span className="font-semibold capitalize">{activityLevel.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B0B0B0]">Equipamentos:</span>
                  <span className="font-semibold">{equipment.length} selecionados</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1E1E1E] border-t border-[#2A2A2A] p-4">
        <div className="max-w-lg mx-auto flex gap-4">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#2A2A2A] text-white hover:bg-[#333] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Voltar
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={step === 4 && !name}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white font-semibold hover:shadow-lg hover:shadow-[#4CAF50]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === totalSteps ? 'Começar' : 'Continuar'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
