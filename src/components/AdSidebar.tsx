import React from 'react';

export default function AdSidebar() {
  return (
    <div className="promo-holder mx-auto my-4 flex flex-col items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4" 
         style={{ minWidth: '300px', minHeight: '250px', maxWidth: '300px' }}>
      <span className="text-[10px] tracking-wider text-gray-400 uppercase font-semibold mb-2">Sponsored</span>
      {/* FUTURE AD NETWORK CODE GOES BELOW THIS LINE */}
      <div className="text-sm text-gray-500 font-medium">300x250 Advertisement Slot</div>
      {/* FUTURE AD NETWORK CODE GOES ABOVE THIS LINE */}
    </div>
  );
}