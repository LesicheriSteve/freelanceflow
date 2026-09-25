import type { IncomeStream, Expense, Confidence } from '@/types';

export const CONFIDENCE_RANGES: Record<
  Confidence,
  { low: number; high: number; label: string; description: string }
> = {
  low: {
    low: 0.55,
    high: 1.45,
    label: 'Low',
    description: 'Highly unpredictable — model wide swings',
  },
  medium: {
    low: 0.8,
    high: 1.2,
    label: 'Medium',
    description: 'Somewhat stable with moderate variance',
  },
  high: {
    low: 0.95,
    high: 1.05,
    label: 'High',
    description: 'Recurring contracts, very predictable',
  },
};

export const TAX_RATES = [15, 20, 25, 30, 35, 40];

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function sumIncome(streams: IncomeStream[]): number {
  return streams.reduce((acc, s) => acc + (s.amount || 0), 0);
}

export function sumExpenses(expenses: Expense[]): number {
  return expenses.reduce((acc, e) => acc + (e.amount || 0), 0);
}

export function calcTax(income: number, ratePct: number): number {
  return income * (ratePct / 100);
}

export function safeToSpend(
  income: number,
  tax: number,
  expenses: number
): number {
  return income - tax - expenses;
}

export function fmt(n: number): string {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function fmtDetailed(n: number): string {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
