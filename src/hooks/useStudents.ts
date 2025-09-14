import { useState, useEffect } from 'react';
import { Student, WorkoutTemplate, DietTemplate } from '@/types/student';

const MAX_STUDENTS = 5;

// Mock data for demo
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    age: 28,
    joinDate: new Date('2024-01-15'),
    goal: 'Perda de peso e definição muscular',
    currentWeight: 85,
    targetWeight: 75,
    height: 180,
    lastCheckIn: new Date('2024-09-10'),
    adherenceRate: 92,
    status: 'active'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 88888-8888',
    age: 25,
    joinDate: new Date('2024-02-01'),
    goal: 'Ganho de massa muscular',
    currentWeight: 60,
    targetWeight: 65,
    height: 165,
    lastCheckIn: new Date('2024-09-12'),
    adherenceRate: 88,
    status: 'active'
  }
];

export function useStudents() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [isLoading, setIsLoading] = useState(false);

  const canAddStudent = students.length < MAX_STUDENTS;
  const remainingSlots = MAX_STUDENTS - students.length;

  const addStudent = async (studentData: Omit<Student, 'id' | 'joinDate' | 'adherenceRate' | 'status'>) => {
    if (!canAddStudent) {
      throw new Error(`Limite máximo de ${MAX_STUDENTS} alunos atingido`);
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
      joinDate: new Date(),
      adherenceRate: 0,
      status: 'pending'
    };

    setStudents(prev => [...prev, newStudent]);
    setIsLoading(false);
    
    return newStudent;
  };

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setStudents(prev => prev.map(student => 
      student.id === id ? { ...student, ...updates } : student
    ));
    
    setIsLoading(false);
  };

  const removeStudent = async (id: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setStudents(prev => prev.filter(student => student.id !== id));
    setIsLoading(false);
  };

  const getStudentStats = () => {
    const activeStudents = students.filter(s => s.status === 'active').length;
    const avgAdherence = students.length > 0 
      ? Math.round(students.reduce((sum, s) => sum + s.adherenceRate, 0) / students.length)
      : 0;
    
    const recentCheckIns = students.filter(s => {
      if (!s.lastCheckIn) return false;
      const daysDiff = Math.floor((new Date().getTime() - s.lastCheckIn.getTime()) / (1000 * 60 * 60 * 24));
      return daysDiff <= 7;
    }).length;

    return {
      total: students.length,
      active: activeStudents,
      avgAdherence,
      recentCheckIns,
      remainingSlots
    };
  };

  return {
    students,
    isLoading,
    canAddStudent,
    remainingSlots,
    maxStudents: MAX_STUDENTS,
    addStudent,
    updateStudent,
    removeStudent,
    getStudentStats
  };
}