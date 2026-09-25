export default function AdBanner() {
  return (
    <div className="flex justify-center no-print">
      <div
        className="flex items-center justify-center border border-slate-700/60 bg-slate-800/40 rounded-lg text-slate-500 text-xs font-medium tracking-wider uppercase"
        style={{ width: '728px', maxWidth: '100%', height: '90px' }}
      >
        Advertisement Banner — 728×90
      </div>
    </div>
  );
}
