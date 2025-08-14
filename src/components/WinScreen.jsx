import React from 'react';
import { formatTime } from '../utils/gameUtils';

const WinScreen = ({ moves, time, onPlayAgain, isTimerEnabled }) => {
  const getPerformanceMessage = (moves) => {
    const perfectMoves = moves <= 10; // Simplified logic
    if (perfectMoves) return "Perfect! 🏆";
    if (moves <= 15) return "Excellent! 🌟";
    if (moves <= 25) return "Great Job! 👏";
    return "Well Done! 🎉";
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-8 text-center text-white shadow-2xl max-w-md mx-4 transform animate-bounce-in">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
        <p className="text-xl mb-6">{getPerformanceMessage(moves)}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center bg-white/20 rounded-lg px-4 py-2">
            <span>Total Moves:</span>
            <span className="font-bold text-xl">{moves}</span>
          </div>
          {isTimerEnabled && (
            <div className="flex justify-between items-center bg-white/20 rounded-lg px-4 py-2">
              <span>Time Taken:</span>
              <span className="font-bold text-xl">{formatTime(time)}</span>
            </div>
          )}
        </div>
        
        <button
          onClick={onPlayAgain}
          className="bg-white text-purple-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default WinScreen;