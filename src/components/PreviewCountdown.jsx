import React from 'react';

const PreviewCountdown = ({ countdown, isActive }) => {
  if (!isActive) return null;
  
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-yellow-500/20 backdrop-blur border border-yellow-500/30 rounded-full px-6 py-3 flex items-center gap-3">
        <span className="text-yellow-400 font-medium">Memorize the cards!</span>
        <div className="text-3xl font-bold text-white animate-pulse">{countdown}</div>
      </div>
    </div>
  );
};

export default PreviewCountdown;
