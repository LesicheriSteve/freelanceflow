import React from 'react';

export default function AdSidebar() {
  return (
    <div className="promo-holder mx-auto my-4 flex flex-col items-center justify-between bg-purple-50 border border-purple-200 rounded-lg p-4 hover:opacity-90 transition-opacity text-center" 
         style={{ minWidth: '300px', minHeight: '250px', maxWidth: '300px' }}>
      <span className="text-[10px] tracking-wider text-purple-400 uppercase font-bold">Partner Spotlight</span>
      
      {/* CLICKABLE AFFILIATE LINK */}
      <a href="https://amzn.to/4rtSnDv" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center h-full py-2">
        <div className="text-2xl mb-1">📚</div>
        <h4 className="font-bold text-purple-950 text-md leading-tight px-2">The Freelancer's Bible</h4>
        <p className="text-xs text-purple-700 mt-2 px-3">Everything you need to know to kickstart your career, land premium clients, and run a profitable business.</p>
        <span className="mt-4 bg-purple-700 text-white font-semibold text-xs px-5 py-2 rounded-full hover:bg-purple-800 inline-block">Get The Book ➔</span>
      </a>
      
    </div>
  );
}