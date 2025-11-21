import { Workout, Challenge, Meal } from './nutrify-types';

export const mockWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Treino A - Peito e Tríceps',
    day: 'Segunda',
    duration: 45,
    completed: false,
    exercises: [
      {
        id: 'e1',
        name: 'Flexão de Braço',
        sets: 4,
        reps: '12-15',
        rest: 60,
        description: 'Mantenha o corpo reto, desça até o peito quase tocar o chão',
        equipment: 'bodyweight'
      },
      {
        id: 'e2',
        name: 'Flexão Diamante',
        sets: 3,
        reps: '10-12',
        rest: 60,
        description: 'Mãos juntas formando diamante, foco no tríceps',
        equipment: 'bodyweight'
      },
      {
        id: 'e3',
        name: 'Mergulho em Cadeira',
        sets: 3,
        reps: '12-15',
        rest: 45,
        description: 'Use uma cadeira estável, desça controladamente',
        equipment: 'bodyweight'
      }
    ]
  },
  {
    id: '2',
    name: 'Treino B - Costas e Bíceps',
    day: 'Quarta',
    duration: 45,
    completed: false,
    exercises: [
      {
        id: 'e4',
        name: 'Remada com Halteres',
        sets: 4,
        reps: '12-15',
        rest: 60,
        description: 'Incline o tronco, puxe os halteres até as costelas',
        equipment: 'dumbbells'
      },
      {
        id: 'e5',
        name: 'Rosca Direta',
        sets: 3,
        reps: '12-15',
        rest: 45,
        description: 'Cotovelos fixos, contraia o bíceps no topo',
        equipment: 'dumbbells'
      }
    ]
  },
  {
    id: '3',
    name: 'Treino C - Pernas e Glúteos',
    day: 'Sexta',
    duration: 50,
    completed: false,
    exercises: [
      {
        id: 'e6',
        name: 'Agachamento',
        sets: 4,
        reps: '15-20',
        rest: 90,
        description: 'Desça até as coxas ficarem paralelas ao chão',
        equipment: 'bodyweight'
      },
      {
        id: 'e7',
        name: 'Afundo',
        sets: 3,
        reps: '12 cada perna',
        rest: 60,
        description: 'Dê um passo à frente e desça o joelho traseiro',
        equipment: 'bodyweight'
      },
      {
        id: 'e8',
        name: 'Elevação Pélvica',
        sets: 4,
        reps: '15-20',
        rest: 45,
        description: 'Deitado, eleve o quadril contraindo glúteos',
        equipment: 'bodyweight'
      }
    ]
  }
];

export const mockChallenges: Challenge[] = [
  {
    id: 'c1',
    name: 'Desafio 21 Dias - Transformação',
    description: 'Complete 21 dias de treinos e alimentação saudável',
    days: 21,
    currentDay: 1,
    completed: false,
    checklist: Array.from({ length: 21 }, (_, i) => ({
      day: i + 1,
      completed: false
    }))
  }
];

export const mockMeals: Meal[] = [
  {
    id: 'm1',
    name: 'Ovos Mexidos com Aveia',
    calories: 350,
    protein: 25,
    carbs: 35,
    fat: 12,
    portion: '2 ovos + 50g aveia',
    mealType: 'breakfast'
  },
  {
    id: 'm2',
    name: 'Frango Grelhado com Arroz',
    calories: 450,
    protein: 40,
    carbs: 50,
    fat: 8,
    portion: '150g frango + 100g arroz',
    mealType: 'lunch'
  },
  {
    id: 'm3',
    name: 'Salmão com Batata Doce',
    calories: 500,
    protein: 35,
    carbs: 45,
    fat: 18,
    portion: '150g salmão + 200g batata',
    mealType: 'dinner'
  },
  {
    id: 'm4',
    name: 'Whey Protein com Banana',
    calories: 200,
    protein: 25,
    carbs: 20,
    fat: 3,
    portion: '1 scoop + 1 banana',
    mealType: 'snack'
  }
];
