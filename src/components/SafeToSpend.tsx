import { ShieldCheck, AlertTriangle, Wallet } from 'lucide-react';
import { fmt } from '@/lib/calc';

interface Props {
  totalIncome: number;
  taxOwed: number;
  totalExpenses: number;
  safeAmount: number;
}

export default function SafeToSpend({
  totalIncome,
  taxOwed,
  totalExpenses,
  safeAmount,
}: Props) {
  const isNegative = safeAmount < 0;

  return (
    <div
      className={`rounded-2xl p-6 shadow-xl border transition-all duration-300 ${
        isNegative
          ? 'bg-gradient-to-br from-red-500/20 to-red-900/10 border-red-500/40'
          : 'bg-gradient-to-br from-emerald-500/20 to-emerald-900/10 border-emerald-500/40'
      }`}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            isNegative ? 'bg-red-500/20' : 'bg-emerald-500/20'
          }`}
        >
          {isNegative ? (
            <AlertTriangle className="w-5 h-5 text-red-400" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          )}
        </div>
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          Safe-to-Spend Balance
        </h2>
      </div>

      <div className="text-center py-2">
        <p
          className={`text-5xl font-extrabold tracking-tight tabular-nums transition-colors ${
            isNegative ? 'text-red-400' : 'text-emerald-400'
          }`}
          style={{
            textShadow: isNegative
              ? '0 0 30px rgba(239,68,68,0.3)'
              : '0 0 30px rgba(16,185,129,0.3)',
          }}
        >
          {fmt(safeAmount)}
        </p>
        <p className="text-xs text-slate-400 mt-2">
          What you can actually spend this month
        </p>
      </div>

      {/* Breakdown */}
      <div className="mt-5 space-y-2.5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5" /> Total Income
          </span>
          <span className="font-semibold text-white">{fmt(totalIncome)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">− Estimated Tax</span>
          <span className="font-semibold text-indigo-400">−{fmt(taxOwed)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">− Total Expenses</span>
          <span className="font-semibold text-amber-400">−{fmt(totalExpenses)}</span>
        </div>
        <div className="border-t border-slate-700/40 pt-2.5 flex items-center justify-between">
          <span className="text-sm font-semibold text-white">Safe to Spend</span>
          <span
            className={`font-bold text-lg ${
              isNegative ? 'text-red-400' : 'text-emerald-400'
            }`}
          >
            {fmt(safeAmount)}
          </span>
        </div>
      </div>

      {isNegative && (
        <div className="mt-4 flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm text-red-300 font-medium">
            Danger: Adjust expenses or source more clients.
          </p>
        </div>
      )}
    </div>
  );
}
