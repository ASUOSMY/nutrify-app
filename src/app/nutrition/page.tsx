'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/nutrify/bottom-nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNutrify } from '@/lib/nutrify-context';
import { mockFoods } from '@/lib/mock-data';
import { MealType, Food } from '@/lib/types';
import { Plus, Search, Coffee, Sun, Moon, Apple } from 'lucide-react';

export default function NutritionPage() {
  const { user, mealLogs, addMealLog } = useNutrify();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<MealType>('breakfast');
  const [isAddingFood, setIsAddingFood] = useState(false);

  const filteredFoods = mockFoods.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const todayMeals = mealLogs.filter(
    (log) => new Date(log.date).toDateString() === new Date().toDateString()
  );

  const mealsByType = {
    breakfast: todayMeals.filter((m) => m.mealType === 'breakfast'),
    lunch: todayMeals.filter((m) => m.mealType === 'lunch'),
    dinner: todayMeals.filter((m) => m.mealType === 'dinner'),
    snack: todayMeals.filter((m) => m.mealType === 'snack'),
  };

  const handleAddFood = (food: Food, quantity: number = 100) => {
    const multiplier = quantity / food.servingSize;

    addMealLog({
      id: Date.now().toString(),
      userId: user?.id || '',
      date: new Date(),
      mealType: selectedMeal,
      foodId: food.id,
      foodName: food.name,
      quantity,
      unit: food.servingUnit,
      calories: Math.round(food.calories * multiplier),
      protein: Math.round(food.protein * multiplier),
      carbs: Math.round(food.carbs * multiplier),
      fat: Math.round(food.fat * multiplier),
    });

    setIsAddingFood(false);
    setSearchQuery('');
  };

  const getMealIcon = (type: MealType) => {
    switch (type) {
      case 'breakfast':
        return <Coffee className="w-5 h-5" />;
      case 'lunch':
        return <Sun className="w-5 h-5" />;
      case 'dinner':
        return <Moon className="w-5 h-5" />;
      case 'snack':
        return <Apple className="w-5 h-5" />;
    }
  };

  const getMealName = (type: MealType) => {
    switch (type) {
      case 'breakfast':
        return 'Café da Manhã';
      case 'lunch':
        return 'Almoço';
      case 'dinner':
        return 'Jantar';
      case 'snack':
        return 'Lanche';
    }
  };

  const getMealCalories = (type: MealType) => {
    return mealsByType[type].reduce((sum, meal) => sum + meal.calories, 0);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FA] dark:bg-[#121212] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white p-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold mb-2">Nutrição</h1>
          <p className="text-white/80">Registre suas refeições</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Meals */}
        {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((mealType) => (
          <div
            key={mealType}
            className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4CAF50]/10 flex items-center justify-center text-[#4CAF50]">
                    {getMealIcon(mealType)}
                  </div>
                  <div>
                    <h3 className="font-bold">{getMealName(mealType)}</h3>
                    <p className="text-sm text-gray-500">
                      {getMealCalories(mealType)} cal
                    </p>
                  </div>
                </div>

                <Dialog open={isAddingFood && selectedMeal === mealType} onOpenChange={setIsAddingFood}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedMeal(mealType);
                        setIsAddingFood(true);
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Adicionar Alimento</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Buscar alimento..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                      <div className="max-h-96 overflow-y-auto space-y-2">
                        {filteredFoods.map((food) => (
                          <div
                            key={food.id}
                            onClick={() => handleAddFood(food)}
                            className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-[#4CAF50] cursor-pointer transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold">{food.name}</h4>
                                <p className="text-sm text-gray-500">
                                  {food.calories} cal • {food.protein}g prot
                                </p>
                              </div>
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                  food.grade === 'A'
                                    ? 'bg-green-100 text-green-700'
                                    : food.grade === 'B'
                                    ? 'bg-blue-100 text-blue-700'
                                    : food.grade === 'C'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {food.grade}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Meal Items */}
              {mealsByType[mealType].length > 0 ? (
                <div className="space-y-2">
                  {mealsByType[mealType].map((meal) => (
                    <div
                      key={meal.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{meal.foodName}</div>
                        <div className="text-sm text-gray-500">
                          {meal.quantity}{meal.unit}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{meal.calories} cal</div>
                        <div className="text-xs text-gray-500">
                          P: {meal.protein}g • C: {meal.carbs}g • G: {meal.fat}g
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 py-4">
                  Nenhum alimento registrado
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Quick Add Favorites */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-6">
          <h3 className="font-bold mb-4">Alimentos Favoritos</h3>
          <div className="grid grid-cols-2 gap-3">
            {mockFoods.slice(0, 4).map((food) => (
              <button
                key={food.id}
                onClick={() => {
                  setSelectedMeal('snack');
                  handleAddFood(food);
                }}
                className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-[#4CAF50] transition-colors text-left"
              >
                <div className="font-semibold text-sm mb-1">{food.name}</div>
                <div className="text-xs text-gray-500">{food.calories} cal</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
