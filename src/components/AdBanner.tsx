import React from 'react';

export default function AdBanner() {
  return (
    <div className="promo-holder mx-auto my-4 flex flex-col items-center justify-center bg-blue-50 border border-blue-200 rounded-lg p-2 hover:opacity-90 transition-opacity" 
         style={{ minWidth: '728px', minHeight: '90px', maxWidth: '728px' }}>
      <span className="text-[10px] tracking-wider text-blue-400 uppercase font-bold mb-1">Sponsored Recommendation</span>
      
      {/* CLICKABLE AFFILIATE LINK */}
      <a href="https://fiverr.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full px-6 text-blue-900">
        <div className="text-left">
          <span className="font-bold text-lg text-green-600">fiverr.</span>
          <span className="text-sm font-medium ml-3">Need a hand with your freelance projects? Outsource tasks instantly.</span>
        </div>
        <span className="bg-green-600 text-white font-semibold text-xs px-4 py-2 rounded hover:bg-green-700">Find Talent ➔</span>
      </a>
      
    </div>
  );
}