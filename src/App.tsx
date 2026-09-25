import { useState } from 'react';
import { Calculator } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import AdSidebar from '@/components/AdSidebar';
import IncomeEstimator from '@/components/IncomeEstimator';
import TaxEngine from '@/components/TaxEngine';
import BudgetBreakdown from '@/components/BudgetBreakdown';
import SafeToSpend from '@/components/SafeToSpend';
import ExportTools from '@/components/ExportTools';
import type { IncomeStream, Expense, Confidence } from '@/types';
import { uid, sumIncome, sumExpenses, calcTax, safeToSpend } from '@/lib/calc';

function App() {
  const [streams, setStreams] = useState<IncomeStream[]>([
    { id: uid(), name: 'Client A', amount: 2500 },
    { id: uid(), name: 'Client B', amount: 800 },
    { id: uid(), name: 'Project C', amount: 1200 },
  ]);
  const [confidence, setConfidence] = useState<Confidence>('medium');
  const [taxRate, setTaxRate] = useState(25);
  const [businessExpenses, setBusinessExpenses] = useState<Expense[]>([
    { id: uid(), name: 'Software Subscriptions', amount: 150 },
    { id: uid(), name: 'Internet', amount: 80 },
  ]);
  const [personalExpenses, setPersonalExpenses] = useState<Expense[]>([
    { id: uid(), name: 'Rent', amount: 1200 },
    { id: uid(), name: 'Groceries', amount: 400 },
  ]);

  const totalIncome = sumIncome(streams);
  const taxOwed = calcTax(totalIncome, taxRate);
  const totalExpenses = sumExpenses(businessExpenses) + sumExpenses(personalExpenses);
  const safeAmount = safeToSpend(totalIncome, taxOwed, totalExpenses);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight">
                FreelanceFlow
              </h1>
              <p className="text-xs text-slate-400 -mt-0.5">
                Irregular Income Tax & Budget Calculator
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live calculations
          </div>
        </div>
      </header>

      {/* Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <AdBanner />
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column — inputs */}
          <div className="lg:col-span-2 space-y-6">
            <IncomeEstimator
              streams={streams}
              setStreams={setStreams}
              confidence={confidence}
              setConfidence={setConfidence}
            />
            <BudgetBreakdown
              businessExpenses={businessExpenses}
              setBusinessExpenses={setBusinessExpenses}
              personalExpenses={personalExpenses}
              setPersonalExpenses={setPersonalExpenses}
            />
          </div>

          {/* Right column — results sidebar */}
          <div className="space-y-6">
            <AdSidebar />
            <SafeToSpend
              totalIncome={totalIncome}
              taxOwed={taxOwed}
              totalExpenses={totalExpenses}
              safeAmount={safeAmount}
            />
            <TaxEngine
              taxRate={taxRate}
              setTaxRate={setTaxRate}
              taxOwed={taxOwed}
            />
            <ExportTools
              streams={streams}
              confidence={confidence}
              taxRate={taxRate}
              businessExpenses={businessExpenses}
              personalExpenses={personalExpenses}
              totalIncome={totalIncome}
              taxOwed={taxOwed}
              totalExpenses={totalExpenses}
              safeAmount={safeAmount}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 mt-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center">
          <p className="text-xs text-slate-500">
            FreelanceFlow — Estimates only. Consult a tax professional for filing.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
