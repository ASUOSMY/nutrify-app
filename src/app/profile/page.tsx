'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BottomNav } from '@/components/nutrify/bottom-nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNutrify } from '@/lib/nutrify-context';
import { User, Settings, LogOut, Crown, Mail, Phone, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser } = useNutrify();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    weight: user?.weight.toString() || '',
    height: user?.height.toString() || '',
  });

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        name: editData.name,
        weight: parseFloat(editData.weight) || user.weight,
        height: parseFloat(editData.height) || user.height,
      });
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nutrify_user');
    localStorage.removeItem('nutrify_onboarding_completed');
    localStorage.removeItem('nutrify_meals');
    localStorage.removeItem('nutrify_water');
    setUser(null);
    router.push('/onboarding');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F7F9FA] dark:bg-[#121212] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white p-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold mb-2">Perfil</h1>
          <p className="text-white/80">Gerencie suas informações</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                {user.isPremium ? (
                  <div className="flex items-center gap-1 text-[#FFC107]">
                    <Crown className="w-4 h-4" />
                    <span className="text-sm font-semibold">Premium</span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">Plano Gratuito</span>
                )}
              </div>
            </div>
          </div>

          {!isEditing ? (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-600 dark:text-gray-400">Idade</span>
                  <span className="font-semibold">{user.age} anos</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-600 dark:text-gray-400">Peso</span>
                  <span className="font-semibold">{user.weight} kg</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-600 dark:text-gray-400">Altura</span>
                  <span className="font-semibold">{user.height} cm</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-600 dark:text-gray-400">Sexo</span>
                  <span className="font-semibold capitalize">
                    {user.gender === 'male' ? 'Masculino' : 'Feminino'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-600 dark:text-gray-400">Objetivo</span>
                  <span className="font-semibold">
                    {user.goal === 'lose_weight'
                      ? 'Emagrecer'
                      : user.goal === 'gain_muscle'
                      ? 'Ganhar Massa'
                      : 'Definir'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600 dark:text-gray-400">Nível de Atividade</span>
                  <span className="font-semibold capitalize">
                    {user.activityLevel === 'sedentary'
                      ? 'Sedentário'
                      : user.activityLevel === 'light'
                      ? 'Leve'
                      : user.activityLevel === 'moderate'
                      ? 'Moderado'
                      : 'Muito Ativo'}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => setIsEditing(true)}
                className="w-full mt-6 bg-[#4CAF50] hover:bg-[#2E7D32]"
              >
                Editar Perfil
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={editData.weight}
                    onChange={(e) => setEditData({ ...editData, weight: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={editData.height}
                    onChange={(e) => setEditData({ ...editData, height: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-[#4CAF50] hover:bg-[#2E7D32]"
                >
                  Salvar
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Goals Card */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-6">
          <h3 className="font-bold mb-4">Metas Diárias</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Calorias</span>
              <span className="font-semibold">{Math.round(user.dailyCalories)} kcal</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Proteína</span>
              <span className="font-semibold">{Math.round(user.macros?.protein || 0)}g</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Carboidratos</span>
              <span className="font-semibold">{Math.round(user.macros?.carbs || 0)}g</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Gordura</span>
              <span className="font-semibold">{Math.round(user.macros?.fat || 0)}g</span>
            </div>
          </div>
        </div>

        {/* Premium Banner */}
        {!user.isPremium && (
          <div className="bg-gradient-to-r from-[#FFC107] to-[#FF9800] rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-start gap-4">
              <Crown className="w-8 h-8 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Upgrade para Premium</h3>
                <p className="text-sm text-white/90 mb-4">
                  Acesse treinos completos, IA ilimitada, planos personalizados e muito mais
                </p>
                <Button className="bg-white text-[#FF9800] hover:bg-white/90">
                  Ver Planos Premium
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg overflow-hidden">
          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="flex-1 text-left font-medium">Configurações</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span className="flex-1 text-left font-medium">Sair</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
