import React from 'react';
// isTimerRunning, onStartStopTimer,  use this if you want start resume button 
const TimerControls = ({ isTimerEnabled, onToggleTimer, gameStatus }) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <label className="flex items-center gap-2 text-white">
        <input
          type="checkbox"
          checked={isTimerEnabled}
          onChange={onToggleTimer}
          disabled={gameStatus === 'playing'}
          className="w-4 h-4 text-blue-600 bg-transparent border-2 border-white/30 rounded focus:ring-blue-500 focus:ring-2"
        />
        <span className="text-sm">Enable Timer</span>
      </label>
      
      {/* {isTimerEnabled && (
        <button
          onClick={onStartStopTimer}
          disabled={gameStatus === 'won'}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 ${
            isTimerRunning
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
        >
          {isTimerRunning ? '⏸️ Pause Timer' : '▶️ Start Timer'}
        </button>
      )} */}
    </div>
  );
};

export default TimerControls;