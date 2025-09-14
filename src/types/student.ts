export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  age: number;
  joinDate: Date;
  goal: string;
  currentWeight?: number;
  targetWeight?: number;
  height?: number;
  lastCheckIn?: Date;
  adherenceRate: number;
  status: 'active' | 'inactive' | 'pending';
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: number;
  rest: string;
  notes?: string;
}

export interface DietTemplate {
  id: string;
  name: string;
  description: string;
  meals: Meal[];
  totalCalories: number;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: Food[];
  calories: number;
}

export interface Food {
  id: string;
  name: string;
  quantity: string;
  calories: number;
}

export interface CheckIn {
  id: string;
  studentId: string;
  date: Date;
  weight: number;
  measurements: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
  };
  mood: number; // 1-5 scale
  energy: number; // 1-5 scale
  photos: string[];
  notes?: string;
}