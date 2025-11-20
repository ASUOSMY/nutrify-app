// Nutrify Types

export type Goal = 'lose_weight' | 'gain_muscle' | 'get_toned';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very_active' | 'extra_active';
export type Equipment = 'none' | 'dumbbells' | 'resistance_bands' | 'full_gym';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type DietPreference = 'none' | 'vegetarian' | 'vegan' | 'low_carb' | 'keto' | 'paleo';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  weight: number; // kg
  height: number; // cm
  gender: 'male' | 'female';
  goal: Goal;
  activityLevel: ActivityLevel;
  equipment: Equipment[];
  dietPreference: DietPreference;
  dailyCalories: number;
  macros: {
    protein: number; // g
    carbs: number; // g
    fat: number; // g
  };
  isPremium: boolean;
  createdAt: Date;
}

export interface Food {
  id: string;
  name: string;
  barcode?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  servingSize: number; // g
  servingUnit: string;
  category?: string;
  isUltraProcessed?: boolean;
  score?: number; // 0-100 (Yuka style)
  grade?: 'A' | 'B' | 'C' | 'D' | 'E';
}

export interface MealLog {
  id: string;
  userId: string;
  date: Date;
  mealType: MealType;
  foodId: string;
  foodName: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  videoUrl?: string;
  duration: number; // seconds
  sets?: number;
  reps?: number;
  restTime?: number; // seconds
  equipment: Equipment[];
  muscleGroups: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  caloriesBurn: number;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  totalDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: Equipment[];
  caloriesBurn: number;
  day?: number; // day of week
}

export interface WorkoutLog {
  id: string;
  userId: string;
  workoutId: string;
  date: Date;
  completed: boolean;
  duration: number;
  caloriesBurned: number;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  duration: number; // days
  tasks: string[];
  reward: string;
  participants: number;
}

export interface UserChallenge {
  id: string;
  userId: string;
  challengeId: string;
  startDate: Date;
  progress: number[];
  completed: boolean;
}

export interface WeightLog {
  id: string;
  userId: string;
  date: Date;
  weight: number;
}

export interface DailyStats {
  date: Date;
  caloriesConsumed: number;
  caloriesBurned: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number; // ml
  workoutCompleted: boolean;
  streak: number;
}
