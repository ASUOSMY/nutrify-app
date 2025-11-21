// Types para o app Nutrify
export type Goal = 'lose' | 'gain' | 'maintain';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type Equipment = 'bodyweight' | 'dumbbells' | 'resistance_bands' | 'full_gym';

export interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female';
  goal: Goal;
  activityLevel: ActivityLevel;
  equipment: Equipment[];
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
  time?: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: number;
  videoUrl?: string;
  description: string;
  equipment: Equipment;
}

export interface Workout {
  id: string;
  name: string;
  day: string;
  exercises: Exercise[];
  duration: number;
  completed: boolean;
}

export interface DailyLog {
  date: string;
  meals: Meal[];
  waterIntake: number;
  workoutCompleted: boolean;
  weight?: number;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  days: number;
  currentDay: number;
  completed: boolean;
  checklist: { day: number; completed: boolean }[];
}
