import React from "react";
import { DIFFICULTY_LEVELS } from "../constants/gameConstants";

const GameControls = ({
  difficulty,
  onDifficultyChange,
  onRestart,
  gameStatus,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
      <select
        value={difficulty}
        onChange={(e) => onDifficultyChange(e.target.value)}
        className="bg-white/10 backdrop-blur border border-white/20 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-400"
        disabled={gameStatus === "playing" || gameStatus === "preview"}
      >
        {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
          <option key={key} value={key} className="bg-gray-800 text-white">
            {level.name}
          </option>
        ))}
      </select>

      <button
        onClick={onRestart}
        disabled={gameStatus === "preview"}
        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-6 py-2 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {gameStatus === "ready" ? "Start Game" : "Restart Game"}
      </button>
    </div>
  );
};

export default GameControls;
