'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useNutrify } from '@/lib/nutrify-context';
import { Goal, ActivityLevel, Equipment } from '@/lib/types';
import { Target, Activity, Dumbbell, User, Ruler, Weight, Calendar } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding } = useNutrify();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    goal: 'lose_weight' as Goal,
    activityLevel: 'moderate' as ActivityLevel,
    equipment: ['none'] as Equipment[],
    name: '',
    age: '',
    weight: '',
    height: '',
    gender: 'male' as 'male' | 'female',
  });

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      completeOnboarding({
        ...data,
        age: parseInt(data.age),
        weight: parseFloat(data.weight),
        height: parseFloat(data.height),
      });
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-2xl p-8">
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-all ${
                s <= step ? 'bg-[#4CAF50]' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Goal */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="w-16 h-16 mx-auto mb-4 text-[#4CAF50]" />
              <h2 className="text-2xl font-bold mb-2">Qual seu objetivo?</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Vamos personalizar seu plano
              </p>
            </div>

            <RadioGroup
              value={data.goal}
              onValueChange={(value) => setData({ ...data, goal: value as Goal })}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer hover:border-[#4CAF50] transition-colors">
                <RadioGroupItem value="lose_weight" id="lose" />
                <Label htmlFor="lose" className="flex-1 cursor-pointer">
                  <div className="font-semibold">Emagrecer</div>
                  <div className="text-sm text-gray-500">Perder peso de forma saudável</div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer hover:border-[#4CAF50] transition-colors">
                <RadioGroupItem value="gain_muscle" id="gain" />
                <Label htmlFor="gain" className="flex-1 cursor-pointer">
                  <div className="font-semibold">Ganhar Massa</div>
                  <div className="text-sm text-gray-500">Construir músculos</div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer hover:border-[#4CAF50] transition-colors">
                <RadioGroupItem value="get_toned" id="tone" />
                <Label htmlFor="tone" className="flex-1 cursor-pointer">
                  <div className="font-semibold">Definir</div>
                  <div className="text-sm text-gray-500">Tonificar e definir</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Step 2: Activity Level */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <Activity className="w-16 h-16 mx-auto mb-4 text-[#4CAF50]" />
              <h2 className="text-2xl font-bold mb-2">Nível de Atividade</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Qual sua rotina atual?
              </p>
            </div>

            <RadioGroup
              value={data.activityLevel}
              onValueChange={(value) =>
                setData({ ...data, activityLevel: value as ActivityLevel })
              }
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer hover:border-[#4CAF50] transition-colors">
                <RadioGroupItem value="sedentary" id="sed" />
                <Label htmlFor="sed" className="flex-1 cursor-pointer">
                  <div className="font-semibold">Sedentário</div>
                  <div className="text-sm text-gray-500">Pouco ou nenhum exercício</div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer hover:border-[#4CAF50] transition-colors">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="flex-1 cursor-pointer">
                  <div className="font-semibold">Leve</div>
                  <div className="text-sm text-gray-500">Exercício 1-3x/semana</div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer hover:border-[#4CAF50] transition-colors">
                <RadioGroupItem value="moderate" id="mod" />
                <Label htmlFor="mod" className="flex-1 cursor-pointer">
                  <div className="font-semibold">Moderado</div>
                  <div className="text-sm text-gray-500">Exercício 3-5x/semana</div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer hover:border-[#4CAF50] transition-colors">
                <RadioGroupItem value="very_active" id="very" />
                <Label htmlFor="very" className="flex-1 cursor-pointer">
                  <div className="font-semibold">Muito Ativo</div>
                  <div className="text-sm text-gray-500">Exercício 6-7x/semana</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Step 3: Equipment */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <Dumbbell className="w-16 h-16 mx-auto mb-4 text-[#4CAF50]" />
              <h2 className="text-2xl font-bold mb-2">Equipamentos</h2>
              <p className="text-gray-600 dark:text-gray-400">
                O que você tem disponível?
              </p>
            </div>

            <RadioGroup
              value={data.equipment[0]}
              onValueChange={(value) =>
                setData({ ...data, equipment: [value as Equipment] })
              }
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer hover:border-[#4CAF50] transition-colors">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none" className="flex-1 cursor-pointer">
                  <div className="font-semibold">Nenhum</div>
                  <div className="text-sm text-gray-500">Treino em casa sem equipamento</div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer hover:border-[#4CAF50] transition-colors">
                <RadioGroupItem value="dumbbells" id="dumb" />
                <Label htmlFor="dumb" className="flex-1 cursor-pointer">
                  <div className="font-semibold">Halteres</div>
                  <div className="text-sm text-gray-500">Tenho halteres em casa</div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer hover:border-[#4CAF50] transition-colors">
                <RadioGroupItem value="resistance_bands" id="bands" />
                <Label htmlFor="bands" className="flex-1 cursor-pointer">
                  <div className="font-semibold">Elásticos</div>
                  <div className="text-sm text-gray-500">Faixas de resistência</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Step 4: Personal Info */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <User className="w-16 h-16 mx-auto mb-4 text-[#4CAF50]" />
              <h2 className="text-2xl font-bold mb-2">Sobre Você</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Informações básicas
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="Seu nome"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Sexo</Label>
                <RadioGroup
                  value={data.gender}
                  onValueChange={(value) =>
                    setData({ ...data, gender: value as 'male' | 'female' })
                  }
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Masculino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Feminino</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="age">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  value={data.age}
                  onChange={(e) => setData({ ...data, age: e.target.value })}
                  placeholder="25"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Body Metrics */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center">
              <Ruler className="w-16 h-16 mx-auto mb-4 text-[#4CAF50]" />
              <h2 className="text-2xl font-bold mb-2">Medidas</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Para calcular suas metas
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={data.weight}
                  onChange={(e) => setData({ ...data, weight: e.target.value })}
                  placeholder="70"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={data.height}
                  onChange={(e) => setData({ ...data, height: e.target.value })}
                  placeholder="170"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1"
            >
              Voltar
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="flex-1 bg-[#4CAF50] hover:bg-[#2E7D32]"
          >
            {step === 5 ? 'Começar' : 'Próximo'}
          </Button>
        </div>
      </div>
    </div>
  );
}
