import React from 'react';
import { formatTime } from '../utils/gameUtils';

const GameStats = ({ moves, time, gameStatus, isTimerEnabled }) => {
  return (
    <div className="flex justify-center gap-4 sm:gap-8 mb-6">
      <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2 text-center">
        <div className="text-sm text-gray-300">Moves</div>
        <div className="text-2xl font-bold text-white">{moves}</div>
      </div>
      
      {isTimerEnabled && (
        <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2 text-center">
          <div className="text-sm text-gray-300">Time</div>
          <div className="text-2xl font-bold text-white">{formatTime(time)}</div>
        </div>
      )}
      
      <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2 text-center">
        <div className="text-sm text-gray-300">Status</div>
        <div className={`text-lg font-semibold ${
          gameStatus === 'won' ? 'text-green-400' :
          gameStatus === 'playing' ? 'text-blue-400' : 
          gameStatus === 'preview' ? 'text-yellow-400' : 'text-gray-400'
        }`}>
          {gameStatus === 'won' ? 'Won!' : 
           gameStatus === 'playing' ? 'Playing' :
           gameStatus === 'preview' ? 'Preview' : 'Ready'}
        </div>
      </div>
    </div>
  );
};

export default GameStats;