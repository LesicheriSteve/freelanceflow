export interface IncomeStream {
  id: string;
  name: string;
  amount: number;
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
}

export type Confidence = 'low' | 'medium' | 'high';
