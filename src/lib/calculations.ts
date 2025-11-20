// Nutrify Calculations - Mifflin St Jeor Formula

import { ActivityLevel, Goal } from './types';

export function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  // Mifflin St Jeor Formula
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

export function getActivityMultiplier(level: ActivityLevel): number {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very_active: 1.725,
    extra_active: 1.9,
  };
  return multipliers[level];
}

export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return Math.round(bmr * getActivityMultiplier(activityLevel));
}

export function calculateDailyCalories(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
  activityLevel: ActivityLevel,
  goal: Goal
): number {
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);

  // Adjust based on goal
  if (goal === 'lose_weight') {
    return Math.round(tdee - 500); // 500 cal deficit
  } else if (goal === 'gain_muscle') {
    return Math.round(tdee + 300); // 300 cal surplus
  } else {
    return tdee; // maintenance for toning
  }
}

export function calculateMacros(calories: number, goal: Goal) {
  let proteinPercent = 0.3;
  let carbsPercent = 0.4;
  let fatPercent = 0.3;

  if (goal === 'gain_muscle') {
    proteinPercent = 0.35;
    carbsPercent = 0.45;
    fatPercent = 0.2;
  } else if (goal === 'lose_weight') {
    proteinPercent = 0.35;
    carbsPercent = 0.3;
    fatPercent = 0.35;
  }

  return {
    protein: Math.round((calories * proteinPercent) / 4), // 4 cal per gram
    carbs: Math.round((calories * carbsPercent) / 4),
    fat: Math.round((calories * fatPercent) / 9), // 9 cal per gram
  };
}

export function calculateFoodScore(food: {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  isUltraProcessed?: boolean;
}): { score: number; grade: 'A' | 'B' | 'C' | 'D' | 'E' } {
  let score = 100;

  // Penalize ultra-processed
  if (food.isUltraProcessed) {
    score -= 30;
  }

  // Penalize high sugar (per 100g)
  const sugarPer100g = ((food.sugar || 0) / food.calories) * 100;
  if (sugarPer100g > 15) score -= 20;
  else if (sugarPer100g > 10) score -= 10;

  // Penalize high sodium (per 100g)
  const sodiumPer100g = ((food.sodium || 0) / food.calories) * 100;
  if (sodiumPer100g > 500) score -= 15;
  else if (sodiumPer100g > 300) score -= 8;

  // Reward fiber
  const fiberPer100g = ((food.fiber || 0) / food.calories) * 100;
  if (fiberPer100g > 5) score += 10;
  else if (fiberPer100g > 3) score += 5;

  // Reward protein
  const proteinPercent = (food.protein * 4) / food.calories;
  if (proteinPercent > 0.3) score += 10;
  else if (proteinPercent > 0.2) score += 5;

  score = Math.max(0, Math.min(100, score));

  let grade: 'A' | 'B' | 'C' | 'D' | 'E';
  if (score >= 80) grade = 'A';
  else if (score >= 60) grade = 'B';
  else if (score >= 40) grade = 'C';
  else if (score >= 20) grade = 'D';
  else grade = 'E';

  return { score, grade };
}
