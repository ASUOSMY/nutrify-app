'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, DailyStats, MealLog, WorkoutLog } from './types';
import { calculateDailyCalories, calculateMacros } from './calculations';

interface NutrifyContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  dailyStats: DailyStats;
  updateDailyStats: (stats: Partial<DailyStats>) => void;
  mealLogs: MealLog[];
  addMealLog: (log: MealLog) => void;
  workoutLogs: WorkoutLog[];
  addWorkoutLog: (log: WorkoutLog) => void;
  waterIntake: number;
  addWater: (ml: number) => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;
}

const NutrifyContext = createContext<NutrifyContextType | undefined>(undefined);

// Helper para garantir número válido
const safeNumber = (value: any, fallback: number = 0): number => {
  const num = Number(value);
  return isNaN(num) || !isFinite(num) ? fallback : num;
};

export function NutrifyProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [mealLogs, setMealLogs] = useState<MealLog[]>([]);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [waterIntake, setWaterIntake] = useState<number>(0);
  const [dailyStats, setDailyStats] = useState<DailyStats>({
    date: new Date(),
    caloriesConsumed: 0,
    caloriesBurned: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    water: 0,
    workoutCompleted: false,
    streak: 0,
  });

  // Load from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('nutrify_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }

    const savedMeals = localStorage.getItem('nutrify_meals');
    if (savedMeals) {
      try {
        setMealLogs(JSON.parse(savedMeals));
      } catch (e) {
        console.error('Error parsing meals data:', e);
      }
    }

    const savedWater = localStorage.getItem('nutrify_water');
    if (savedWater) {
      setWaterIntake(safeNumber(savedWater, 0));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('nutrify_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nutrify_meals', JSON.stringify(mealLogs));
    
    // Calculate daily stats
    const today = new Date().toDateString();
    const todayMeals = mealLogs.filter(
      (log) => new Date(log.date).toDateString() === today
    );

    const stats = todayMeals.reduce(
      (acc, log) => ({
        caloriesConsumed: safeNumber(acc.caloriesConsumed, 0) + safeNumber(log.calories, 0),
        protein: safeNumber(acc.protein, 0) + safeNumber(log.protein, 0),
        carbs: safeNumber(acc.carbs, 0) + safeNumber(log.carbs, 0),
        fat: safeNumber(acc.fat, 0) + safeNumber(log.fat, 0),
      }),
      { caloriesConsumed: 0, protein: 0, carbs: 0, fat: 0 }
    );

    setDailyStats((prev) => ({
      ...prev,
      caloriesConsumed: safeNumber(stats.caloriesConsumed, 0),
      protein: safeNumber(stats.protein, 0),
      carbs: safeNumber(stats.carbs, 0),
      fat: safeNumber(stats.fat, 0),
      water: safeNumber(waterIntake, 0),
    }));
  }, [mealLogs, waterIntake]);

  const completeOnboarding = (data: Partial<UserProfile>) => {
    const calories = calculateDailyCalories(
      safeNumber(data.weight, 70),
      safeNumber(data.height, 170),
      safeNumber(data.age, 25),
      data.gender!,
      data.activityLevel!,
      data.goal!
    );

    const macros = calculateMacros(safeNumber(calories, 2000), data.goal!);

    const newUser: UserProfile = {
      id: Date.now().toString(),
      name: data.name || 'Usuário',
      age: safeNumber(data.age, 25),
      weight: safeNumber(data.weight, 70),
      height: safeNumber(data.height, 170),
      gender: data.gender!,
      goal: data.goal!,
      activityLevel: data.activityLevel!,
      equipment: data.equipment || ['none'],
      dietPreference: data.dietPreference || 'none',
      dailyCalories: safeNumber(calories, 2000),
      macros: {
        protein: safeNumber(macros.protein, 0),
        carbs: safeNumber(macros.carbs, 0),
        fat: safeNumber(macros.fat, 0),
      },
      isPremium: false,
      createdAt: new Date(),
    };

    setUser(newUser);
  };

  const addMealLog = (log: MealLog) => {
    const safeMeal: MealLog = {
      ...log,
      calories: safeNumber(log.calories, 0),
      protein: safeNumber(log.protein, 0),
      carbs: safeNumber(log.carbs, 0),
      fat: safeNumber(log.fat, 0),
    };
    setMealLogs((prev) => [...prev, safeMeal]);
  };

  const addWorkoutLog = (log: WorkoutLog) => {
    const safeWorkout: WorkoutLog = {
      ...log,
      caloriesBurned: safeNumber(log.caloriesBurned, 0),
    };
    setWorkoutLogs((prev) => [...prev, safeWorkout]);
    setDailyStats((prev) => ({
      ...prev,
      caloriesBurned: safeNumber(prev.caloriesBurned, 0) + safeNumber(safeWorkout.caloriesBurned, 0),
      workoutCompleted: true,
    }));
  };

  const addWater = (ml: number) => {
    const validMl = safeNumber(ml, 0);
    const newWater = safeNumber(waterIntake, 0) + validMl;
    setWaterIntake(newWater);
    localStorage.setItem('nutrify_water', String(newWater));
  };

  const updateDailyStats = (stats: Partial<DailyStats>) => {
    const safeStats: Partial<DailyStats> = {};
    
    if (stats.caloriesConsumed !== undefined) {
      safeStats.caloriesConsumed = safeNumber(stats.caloriesConsumed, 0);
    }
    if (stats.caloriesBurned !== undefined) {
      safeStats.caloriesBurned = safeNumber(stats.caloriesBurned, 0);
    }
    if (stats.protein !== undefined) {
      safeStats.protein = safeNumber(stats.protein, 0);
    }
    if (stats.carbs !== undefined) {
      safeStats.carbs = safeNumber(stats.carbs, 0);
    }
    if (stats.fat !== undefined) {
      safeStats.fat = safeNumber(stats.fat, 0);
    }
    if (stats.water !== undefined) {
      safeStats.water = safeNumber(stats.water, 0);
    }
    if (stats.streak !== undefined) {
      safeStats.streak = safeNumber(stats.streak, 0);
    }
    if (stats.workoutCompleted !== undefined) {
      safeStats.workoutCompleted = stats.workoutCompleted;
    }
    if (stats.date !== undefined) {
      safeStats.date = stats.date;
    }
    
    setDailyStats((prev) => ({ ...prev, ...safeStats }));
  };

  return (
    <NutrifyContext.Provider
      value={{
        user,
        setUser,
        dailyStats,
        updateDailyStats,
        mealLogs,
        addMealLog,
        workoutLogs,
        addWorkoutLog,
        waterIntake: safeNumber(waterIntake, 0),
        addWater,
        completeOnboarding,
      }}
    >
      {children}
    </NutrifyContext.Provider>
  );
}

export function useNutrify() {
  const context = useContext(NutrifyContext);
  if (!context) {
    throw new Error('useNutrify must be used within NutrifyProvider');
  }
  return context;
}
