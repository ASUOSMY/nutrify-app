'use client';

import { useState, useMemo, useEffect } from 'react';
import { Plus, Search, Utensils, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNutrify } from '@/lib/nutrify-context';
import { mockMeals } from '@/lib/nutrify-mock-data';
import BottomNav from '@/components/bottom-nav';

const ITEMS_PER_PAGE = 5;

export default function NutritionPage() {
  const { userProfile, dailyLog, setDailyLog } = useNutrify();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const meals = dailyLog?.meals || [];
  const consumedCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const consumedProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const consumedCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const consumedFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

  // Memoize filtered meals to prevent recalculation
  const filteredMockMeals = useMemo(() => {
    return mockMeals.filter(meal =>
      meal.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredMockMeals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedMeals = filteredMockMeals.slice(startIndex, endIndex);

  // Adjust current page if it exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Reset to page 1 when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const addMeal = (meal: typeof mockMeals[0]) => {
    const newMeal = {
      ...meal,
      id: `meal_${Date.now()}`,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setDailyLog({
      date: new Date().toISOString().split('T')[0],
      meals: [...meals, newMeal],
      waterIntake: dailyLog?.waterIntake || 0,
      workoutCompleted: dailyLog?.workoutCompleted || false
    });

    setShowAddMeal(false);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const mealsByType = {
    breakfast: meals.filter(m => m.mealType === 'breakfast'),
    lunch: meals.filter(m => m.mealType === 'lunch'),
    dinner: meals.filter(m => m.mealType === 'dinner'),
    snack: meals.filter(m => m.mealType === 'snack'),
  };

  return (
    <div className="min-h-screen bg-[#121212] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1E1E1E] to-[#121212] p-6 pb-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-6">Nutrição</h1>

          {/* Summary Card */}
          <div className="bg-gradient-to-br from-[#4CAF50]/20 to-[#66BB6A]/10 border border-[#4CAF50]/30 rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="text-sm text-[#B0B0B0] mb-1">Calorias Consumidas</div>
              <div className="text-4xl font-bold text-[#4CAF50]">
                {consumedCalories}
                <span className="text-lg text-[#B0B0B0]"> / {userProfile?.targetCalories}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#4CAF50]/20">
              <div className="text-center">
                <div className="text-xs text-[#B0B0B0] mb-1">Proteína</div>
                <div className="text-lg font-bold text-[#4CAF50]">{consumedProtein}g</div>
                <div className="text-xs text-[#B0B0B0]">/ {userProfile?.targetProtein}g</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-[#B0B0B0] mb-1">Carbos</div>
                <div className="text-lg font-bold text-[#FFC107]">{consumedCarbs}g</div>
                <div className="text-xs text-[#B0B0B0]">/ {userProfile?.targetCarbs}g</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-[#B0B0B0] mb-1">Gordura</div>
                <div className="text-lg font-bold text-[#FF9800]">{consumedFat}g</div>
                <div className="text-xs text-[#B0B0B0]">/ {userProfile?.targetFat}g</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meals Log */}
      <div className="max-w-lg mx-auto px-6 space-y-6">
        {/* Breakfast */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-lg">☀️ Café da Manhã</h2>
            <button
              onClick={() => setShowAddMeal(true)}
              className="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center hover:bg-[#66BB6A] transition-colors"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
          {mealsByType.breakfast.length > 0 ? (
            <div className="space-y-2">
              {mealsByType.breakfast.map(meal => (
                <div key={meal.id} className="bg-[#1E1E1E] rounded-xl p-4 border border-[#2A2A2A]">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold">{meal.name}</div>
                      <div className="text-xs text-[#B0B0B0]">{meal.portion}</div>
                    </div>
                    <div className="text-[#4CAF50] font-bold">{meal.calories} cal</div>
                  </div>
                  <div className="flex gap-3 text-xs text-[#B0B0B0]">
                    <span>P: {meal.protein}g</span>
                    <span>C: {meal.carbs}g</span>
                    <span>G: {meal.fat}g</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#1E1E1E] rounded-xl p-4 border border-dashed border-[#2A2A2A] text-center text-[#B0B0B0] text-sm">
              Nenhuma refeição registrada
            </div>
          )}
        </div>

        {/* Lunch */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-lg">🍽️ Almoço</h2>
            <button
              onClick={() => setShowAddMeal(true)}
              className="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center hover:bg-[#66BB6A] transition-colors"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
          {mealsByType.lunch.length > 0 ? (
            <div className="space-y-2">
              {mealsByType.lunch.map(meal => (
                <div key={meal.id} className="bg-[#1E1E1E] rounded-xl p-4 border border-[#2A2A2A]">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold">{meal.name}</div>
                      <div className="text-xs text-[#B0B0B0]">{meal.portion}</div>
                    </div>
                    <div className="text-[#4CAF50] font-bold">{meal.calories} cal</div>
                  </div>
                  <div className="flex gap-3 text-xs text-[#B0B0B0]">
                    <span>P: {meal.protein}g</span>
                    <span>C: {meal.carbs}g</span>
                    <span>G: {meal.fat}g</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#1E1E1E] rounded-xl p-4 border border-dashed border-[#2A2A2A] text-center text-[#B0B0B0] text-sm">
              Nenhuma refeição registrada
            </div>
          )}
        </div>

        {/* Dinner */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-lg">🌙 Jantar</h2>
            <button
              onClick={() => setShowAddMeal(true)}
              className="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center hover:bg-[#66BB6A] transition-colors"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
          {mealsByType.dinner.length > 0 ? (
            <div className="space-y-2">
              {mealsByType.dinner.map(meal => (
                <div key={meal.id} className="bg-[#1E1E1E] rounded-xl p-4 border border-[#2A2A2A]">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold">{meal.name}</div>
                      <div className="text-xs text-[#B0B0B0]">{meal.portion}</div>
                    </div>
                    <div className="text-[#4CAF50] font-bold">{meal.calories} cal</div>
                  </div>
                  <div className="flex gap-3 text-xs text-[#B0B0B0]">
                    <span>P: {meal.protein}g</span>
                    <span>C: {meal.carbs}g</span>
                    <span>G: {meal.fat}g</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#1E1E1E] rounded-xl p-4 border border-dashed border-[#2A2A2A] text-center text-[#B0B0B0] text-sm">
              Nenhuma refeição registrada
            </div>
          )}
        </div>

        {/* Snacks */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-lg">🍎 Lanches</h2>
            <button
              onClick={() => setShowAddMeal(true)}
              className="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center hover:bg-[#66BB6A] transition-colors"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
          {mealsByType.snack.length > 0 ? (
            <div className="space-y-2">
              {mealsByType.snack.map(meal => (
                <div key={meal.id} className="bg-[#1E1E1E] rounded-xl p-4 border border-[#2A2A2A]">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold">{meal.name}</div>
                      <div className="text-xs text-[#B0B0B0]">{meal.portion}</div>
                    </div>
                    <div className="text-[#4CAF50] font-bold">{meal.calories} cal</div>
                  </div>
                  <div className="flex gap-3 text-xs text-[#B0B0B0]">
                    <span>P: {meal.protein}g</span>
                    <span>C: {meal.carbs}g</span>
                    <span>G: {meal.fat}g</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#1E1E1E] rounded-xl p-4 border border-dashed border-[#2A2A2A] text-center text-[#B0B0B0] text-sm">
              Nenhum lanche registrado
            </div>
          )}
        </div>
      </div>

      {/* Add Meal Modal */}
      {showAddMeal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-[#1E1E1E] rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#2A2A2A]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Adicionar Refeição</h2>
                <button
                  onClick={() => {
                    setShowAddMeal(false);
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#333] transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B0B0B0]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Buscar alimento..."
                  className="w-full bg-[#121212] border border-[#2A2A2A] rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-[#666] focus:border-[#4CAF50] focus:outline-none"
                />
              </div>
            </div>
            
            {/* Results with Pagination */}
            <div className="flex-1 overflow-y-auto p-6 space-y-2">
              {paginatedMeals.length > 0 ? (
                paginatedMeals.map(meal => (
                  <button
                    key={meal.id}
                    onClick={() => addMeal(meal)}
                    className="w-full bg-[#121212] rounded-xl p-4 border border-[#2A2A2A] hover:border-[#4CAF50] transition-colors text-left"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold">{meal.name}</div>
                        <div className="text-xs text-[#B0B0B0]">{meal.portion}</div>
                      </div>
                      <div className="text-[#4CAF50] font-bold">{meal.calories} cal</div>
                    </div>
                    <div className="flex gap-3 text-xs text-[#B0B0B0]">
                      <span>P: {meal.protein}g</span>
                      <span>C: {meal.carbs}g</span>
                      <span>G: {meal.fat}g</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center text-[#B0B0B0] py-8">
                  Nenhum alimento encontrado
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-6 border-t border-[#2A2A2A]">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2A2A2A] hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="text-sm">Anterior</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#B0B0B0]">
                      Página {currentPage} de {totalPages}
                    </span>
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2A2A2A] hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="text-sm">Próxima</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
