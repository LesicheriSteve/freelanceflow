import { Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import type { IncomeStream, Confidence } from '@/types';
import { CONFIDENCE_RANGES, uid, fmt } from '@/lib/calc';

interface Props {
  streams: IncomeStream[];
  setStreams: (s: IncomeStream[]) => void;
  confidence: Confidence;
  setConfidence: (c: Confidence) => void;
}

const CONFIDENCE_ORDER: Confidence[] = ['low', 'medium', 'high'];

export default function IncomeEstimator({
  streams,
  setStreams,
  confidence,
  setConfidence,
}: Props) {
  const total = streams.reduce((acc, s) => acc + (s.amount || 0), 0);
  const range = CONFIDENCE_RANGES[confidence];

  const addStream = () => {
    setStreams([...streams, { id: uid(), name: '', amount: 0 }]);
  };

  const updateStream = (id: string, field: 'name' | 'amount', value: string) => {
    setStreams(
      streams.map((s) =>
        s.id === id
          ? { ...s, [field]: field === 'amount' ? Number(value) || 0 : value }
          : s
      )
    );
  };

  const removeStream = (id: string) => {
    setStreams(streams.filter((s) => s.id !== id));
  };

  const sliderIndex = CONFIDENCE_ORDER.indexOf(confidence);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Income Estimator</h2>
          <p className="text-sm text-slate-400">Add your income streams for this month</p>
        </div>
      </div>

      {/* Income streams */}
      <div className="space-y-3">
        {streams.map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-3 bg-slate-900/50 rounded-xl p-3 border border-slate-700/40 transition-colors focus-within:border-emerald-500/50"
          >
            <input
              type="text"
              value={s.name}
              onChange={(e) => updateStream(s.id, 'name', e.target.value)}
              placeholder="Income source name"
              className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm font-medium outline-none min-w-0"
            />
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">
                $
              </span>
              <input
                type="number"
                value={s.amount || ''}
                onChange={(e) => updateStream(s.id, 'amount', e.target.value)}
                placeholder="0"
                className="w-28 bg-slate-800/80 text-white text-sm font-semibold rounded-lg pl-7 pr-3 py-2 outline-none border border-slate-700/40 focus:border-emerald-500/60 transition-colors text-right"
              />
            </div>
            <button
              onClick={() => removeStream(s.id)}
              className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
              aria-label="Remove income stream"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addStream}
        className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-slate-600/50 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-sm font-medium"
      >
        <Plus className="w-4 h-4" />
        Add Income Stream
      </button>

      {/* Confidence slider */}
      <div className="mt-6 pt-5 border-t border-slate-700/40">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-white">
            Income Predictability
          </label>
          <span className="text-sm font-bold text-indigo-400">{range.label}</span>
        </div>
        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={sliderIndex}
          onChange={(e) =>
            setConfidence(CONFIDENCE_ORDER[Number(e.target.value)])
          }
          className="confidence-slider w-full"
        />
        <div className="flex justify-between mt-2 text-xs text-slate-500 font-medium">
          {CONFIDENCE_ORDER.map((c) => (
            <span
              key={c}
              className={
                confidence === c
                  ? 'text-indigo-400'
                  : ''
              }
            >
              {CONFIDENCE_RANGES[c].label}
            </span>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-2">{range.description}</p>

        {/* Scenario range */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-red-400 text-xs font-semibold mb-1">
              <TrendingDown className="w-3.5 h-3.5" />
              Worst Case
            </div>
            <p className="text-white font-bold text-lg">{fmt(total * range.low)}</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Best Case
            </div>
            <p className="text-white font-bold text-lg">{fmt(total * range.high)}</p>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="mt-4 flex items-center justify-between bg-slate-900/60 rounded-xl px-4 py-3 border border-slate-700/40">
        <span className="text-sm text-slate-400 font-medium">Total Estimated Income</span>
        <span className="text-xl font-bold text-emerald-400">{fmt(total)}</span>
      </div>
    </div>
  );
}
