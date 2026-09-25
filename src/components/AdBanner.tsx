import React from 'react';

export default function AdBanner() {
  return (
    <div className="promo-holder mx-auto my-4 flex flex-col items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-lg p-2" 
         style={{ minWidth: '728px', minHeight: '90px', maxWidth: '728px' }}>
      <span className="text-[10px] tracking-wider text-gray-400 uppercase font-semibold mb-1">Sponsored</span>
      {/* FUTURE AD NETWORK CODE GOES BELOW THIS LINE */}
      <div className="text-sm text-gray-500 font-medium">728x90 Advertisement Slot</div>
      {/* FUTURE AD NETWORK CODE GOES ABOVE THIS LINE */}
    </div>
  );
}