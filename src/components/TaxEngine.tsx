import { Receipt } from 'lucide-react';
import { TAX_RATES, fmt } from '@/lib/calc';

interface Props {
  taxRate: number;
  setTaxRate: (r: number) => void;
  taxOwed: number;
}

export default function TaxEngine({ taxRate, setTaxRate, taxOwed }: Props) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center">
          <Receipt className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Tax Estimation</h2>
          <p className="text-sm text-slate-400">Set aside money for tax season</p>
        </div>
      </div>

      <label className="text-sm font-semibold text-white mb-2 block">
        Estimated Tax Withholding Rate
      </label>
      <div className="relative mb-5">
        <select
          value={taxRate}
          onChange={(e) => setTaxRate(Number(e.target.value))}
          className="w-full appearance-none bg-slate-900/60 text-white font-semibold rounded-xl px-4 py-3 outline-none border border-slate-700/40 focus:border-indigo-500/60 transition-colors cursor-pointer"
        >
          {TAX_RATES.map((r) => (
            <option key={r} value={r} className="bg-slate-900">
              {r}% —{' '}
              {r <= 20
                ? 'Lower bracket'
                : r <= 30
                ? 'Standard self-employment'
                : 'Higher bracket'}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <div className="bg-gradient-to-br from-indigo-500/15 to-indigo-600/5 border border-indigo-500/25 rounded-2xl p-5 text-center">
        <p className="text-sm text-indigo-300 font-medium mb-2">
          Estimated Tax Owed This Month
        </p>
        <p
          className="text-4xl font-extrabold text-white tracking-tight tabular-nums transition-all"
          style={{ textShadow: '0 0 30px rgba(99,102,241,0.3)' }}
        >
          {fmt(taxOwed)}
        </p>
        <p className="text-xs text-slate-400 mt-2">
          {taxRate}% of your total income
        </p>
      </div>
    </div>
  );
}
