// Cálculos nutricionais usando fórmula Mifflin St Jeor
import { ActivityLevel, Goal } from './nutrify-types';

export function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  // Fórmula Mifflin St Jeor
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  return bmr * multipliers[activityLevel];
}

export function calculateTargetCalories(tdee: number, goal: Goal): number {
  switch (goal) {
    case 'lose':
      return Math.round(tdee - 500); // Déficit de 500 cal
    case 'gain':
      return Math.round(tdee + 300); // Superávit de 300 cal
    case 'maintain':
      return Math.round(tdee);
  }
}

export function calculateMacros(targetCalories: number, goal: Goal) {
  let proteinPercent = 0.3;
  let carbsPercent = 0.4;
  let fatPercent = 0.3;

  if (goal === 'gain') {
    proteinPercent = 0.35;
    carbsPercent = 0.45;
    fatPercent = 0.2;
  } else if (goal === 'lose') {
    proteinPercent = 0.4;
    carbsPercent = 0.3;
    fatPercent = 0.3;
  }

  return {
    protein: Math.round((targetCalories * proteinPercent) / 4),
    carbs: Math.round((targetCalories * carbsPercent) / 4),
    fat: Math.round((targetCalories * fatPercent) / 9)
  };
}
