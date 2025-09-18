// useExpenses.ts
// Mock hook for CRUD operations on expenses. Replace with real API calls as needed.
import { useState } from 'react';

export interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
}

const initialExpenses: Expense[] = [
  { id: 1, category: 'Food', amount: 50, date: '2023-11-01', description: 'Lunch' },
  { id: 2, category: 'Transport', amount: 20, date: '2023-11-01', description: 'Bus' },
  { id: 3, category: 'Accommodation', amount: 100, date: '2023-11-01', description: 'Hotel' },
];

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  // CRUD operations
  const createExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: expenses.length + 1 };
    setExpenses([...expenses, newExpense]);
    return newExpense;
  };
  const updateExpense = (id: number, updates: Partial<Expense>) => {
    setExpenses(exps => exps.map(e => e.id === id ? { ...e, ...updates } : e));
  };
  const deleteExpense = (id: number) => {
    setExpenses(exps => exps.filter(e => e.id !== id));
  };

  // Replace with fetch/axios for real backend
  return { expenses, createExpense, updateExpense, deleteExpense };
}
