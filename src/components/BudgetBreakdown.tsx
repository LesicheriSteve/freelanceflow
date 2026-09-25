import { Plus, Trash2, Briefcase, Home } from 'lucide-react';
import type { Expense } from '@/types';
import { uid, fmt } from '@/lib/calc';

interface Props {
  businessExpenses: Expense[];
  setBusinessExpenses: (e: Expense[]) => void;
  personalExpenses: Expense[];
  setPersonalExpenses: (e: Expense[]) => void;
}

function ExpenseSection({
  title,
  icon,
  expenses,
  setExpenses,
  accent,
}: {
  title: string;
  icon: React.ReactNode;
  expenses: Expense[];
  setExpenses: (e: Expense[]) => void;
  accent: 'emerald' | 'amber';
}) {
  const total = expenses.reduce((acc, e) => acc + (e.amount || 0), 0);

  const add = () => setExpenses([...expenses, { id: uid(), name: '', amount: 0 }]);
  const update = (id: string, field: 'name' | 'amount', value: string) =>
    setExpenses(
      expenses.map((e) =>
        e.id === id
          ? { ...e, [field]: field === 'amount' ? Number(value) || 0 : value }
          : e
      )
    );
  const remove = (id: string) => setExpenses(expenses.filter((e) => e.id !== id));

  const accentClasses =
    accent === 'emerald'
      ? 'bg-emerald-500/15 text-emerald-400'
      : 'bg-amber-500/15 text-amber-400';
  const totalClass =
    accent === 'emerald' ? 'text-emerald-400' : 'text-amber-400';

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accentClasses}`}>
          {icon}
        </div>
        <h3 className="text-sm font-bold text-white">{title}</h3>
      </div>

      <div className="space-y-2.5">
        {expenses.map((e) => (
          <div
            key={e.id}
            className="flex items-center gap-2 bg-slate-900/50 rounded-xl p-2.5 border border-slate-700/40 transition-colors focus-within:border-slate-600"
          >
            <input
              type="text"
              value={e.name}
              onChange={(ev) => update(e.id, 'name', ev.target.value)}
              placeholder="Expense name"
              className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm font-medium outline-none min-w-0"
            />
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">
                $
              </span>
              <input
                type="number"
                value={e.amount || ''}
                onChange={(ev) => update(e.id, 'amount', ev.target.value)}
                placeholder="0"
                className="w-24 bg-slate-800/80 text-white text-sm font-semibold rounded-lg pl-6 pr-2 py-1.5 outline-none border border-slate-700/40 focus:border-slate-600 transition-colors text-right"
              />
            </div>
            <button
              onClick={() => remove(e.id)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
              aria-label="Remove expense"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={add}
        className="mt-2.5 w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-dashed border-slate-600/50 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-700/20 transition-all text-xs font-medium"
      >
        <Plus className="w-3.5 h-3.5" />
        Add Expense
      </button>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-slate-400 font-medium">Subtotal</span>
        <span className={`font-bold ${totalClass}`}>{fmt(total)}</span>
      </div>
    </div>
  );
}

export default function BudgetBreakdown({
  businessExpenses,
  setBusinessExpenses,
  personalExpenses,
  setPersonalExpenses,
}: Props) {
  const total =
    businessExpenses.reduce((a, e) => a + (e.amount || 0), 0) +
    personalExpenses.reduce((a, e) => a + (e.amount || 0), 0);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
      <h2 className="text-lg font-bold text-white mb-1">Budget Breakdown</h2>
      <p className="text-sm text-slate-400 mb-5">
        Fixed costs that come out before your safe-to-spend
      </p>

      <ExpenseSection
        title="Business Expenses"
        icon={<Briefcase className="w-4 h-4" />}
        expenses={businessExpenses}
        setExpenses={setBusinessExpenses}
        accent="emerald"
      />

      <div className="my-5 border-t border-slate-700/40" />

      <ExpenseSection
        title="Personal Baseline"
        icon={<Home className="w-4 h-4" />}
        expenses={personalExpenses}
        setExpenses={setPersonalExpenses}
        accent="amber"
      />

      <div className="mt-5 pt-4 border-t border-slate-700/40 flex items-center justify-between">
        <span className="text-sm font-semibold text-white">Total Expenses</span>
        <span className="text-xl font-bold text-white">{fmt(total)}</span>
      </div>
    </div>
  );
}
