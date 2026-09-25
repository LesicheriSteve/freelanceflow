import { useState } from 'react';
import { Copy, Check, FileDown } from 'lucide-react';
import type { IncomeStream, Expense, Confidence } from '@/types';
import { CONFIDENCE_RANGES, fmt } from '@/lib/calc';

interface Props {
  streams: IncomeStream[];
  confidence: Confidence;
  taxRate: number;
  businessExpenses: Expense[];
  personalExpenses: Expense[];
  totalIncome: number;
  taxOwed: number;
  totalExpenses: number;
  safeAmount: number;
}

export default function ExportTools({
  streams,
  confidence,
  taxRate,
  businessExpenses,
  personalExpenses,
  totalIncome,
  taxOwed,
  totalExpenses,
  safeAmount,
}: Props) {
  const [copied, setCopied] = useState(false);

  const buildSummary = () => {
    const lines: string[] = [];
    lines.push('═══════════════════════════════════════════');
    lines.push('   FREELANCEFLOW — Monthly Budget Summary');
    lines.push('═══════════════════════════════════════════');
    lines.push('');
    lines.push(`Income Predictability: ${CONFIDENCE_RANGES[confidence].label}`);
    lines.push('');
    lines.push('── INCOME STREAMS ──');
    streams.forEach((s) => {
      if (s.name || s.amount)
        lines.push(`  ${s.name || 'Unnamed'}: ${fmt(s.amount || 0)}`);
    });
    lines.push(`  Total Income: ${fmt(totalIncome)}`);
    lines.push('');
    lines.push('── TAX ──');
    lines.push(`  Tax Rate: ${taxRate}%`);
    lines.push(`  Tax Owed: ${fmt(taxOwed)}`);
    lines.push('');
    lines.push('── BUSINESS EXPENSES ──');
    businessExpenses.forEach((e) => {
      if (e.name || e.amount)
        lines.push(`  ${e.name || 'Unnamed'}: ${fmt(e.amount || 0)}`);
    });
    lines.push('');
    lines.push('── PERSONAL EXPENSES ──');
    personalExpenses.forEach((e) => {
      if (e.name || e.amount)
        lines.push(`  ${e.name || 'Unnamed'}: ${fmt(e.amount || 0)}`);
    });
    lines.push(`  Total Expenses: ${fmt(totalExpenses)}`);
    lines.push('');
    lines.push('── RESULT ──');
    lines.push(`  Safe-to-Spend Balance: ${fmt(safeAmount)}`);
    if (safeAmount < 0)
      lines.push('  ⚠ DANGER: Adjust expenses or source more clients.');
    lines.push('');
    lines.push('═══════════════════════════════════════════');
    return lines.join('\n');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = buildSummary();
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePDF = () => {
    window.print();
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
      <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
        Export & Save
      </h2>
      <p className="text-sm text-slate-400 mb-4">
        Save your monthly budget breakdown
      </p>

      <div className="space-y-3">
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold text-sm hover:bg-emerald-500/25 hover:border-emerald-500/50 transition-all active:scale-[0.98]"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied to Clipboard!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Text Breakdown
            </>
          )}
        </button>

        <button
          onClick={handlePDF}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold text-sm hover:bg-indigo-500/25 hover:border-indigo-500/50 transition-all active:scale-[0.98]"
        >
          <FileDown className="w-4 h-4" />
          One-Click PDF Summary
        </button>
      </div>
    </div>
  );
}
