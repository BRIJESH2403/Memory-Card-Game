import React, { useState } from "react";
import GameBoard from "./GameBoard";
import TimerControls from "./TimerControls";
import GameStats from "./GameStats";
import PreviewCountdown from "./PreviewCountdown";
import GameControls from "./GameControls";
import WinScreen from "./WinScreen";
import useMemoryGame from "../hooks/useMemoryGame";
import "./MemoryCardGame.css";

const MemoryCardGame = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const {
    cards,
    moves,
    time,
    gameStatus,
    disabled,
    isTimerEnabled,
    isTimerRunning,
    previewCountdown,
    handleCardClick,
    initializeGame,
    startGame,
    toggleTimerEnabled,
    toggleTimer,
  } = useMemoryGame(difficulty);

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  const handleRestart = () => {
    if (gameStatus === "ready") {
      startGame();
    } else {
      initializeGame();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            Memory Card Game
          </h1>
          <p className="text-gray-300 text-lg">
            Find all the matching pairs to win!
          </p>
        </header>

        {/* Game Controls */}
        <GameControls
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          onRestart={handleRestart}
          gameStatus={gameStatus}
        />

        {/* Timer Controls */}
        <TimerControls
          isTimerEnabled={isTimerEnabled}
          onToggleTimer={toggleTimerEnabled}
          isTimerRunning={isTimerRunning}
          onStartStopTimer={toggleTimer}
          gameStatus={gameStatus}
        />

        {/* Preview Countdown */}
        <PreviewCountdown
          countdown={previewCountdown}
          isActive={gameStatus === "preview"}
        />

        {/* Game Stats */}
        <GameStats
          moves={moves}
          time={time}
          gameStatus={gameStatus}
          isTimerEnabled={isTimerEnabled}
        />

        {/* Game Board */}
        <GameBoard
          cards={cards}
          onCardClick={handleCardClick}
          disabled={disabled}
          difficulty={difficulty}
          isPreviewMode={gameStatus === "preview"}
        />

        {/* Win Screen */}
        {gameStatus === "won" && (
          <WinScreen
            moves={moves}
            time={time}
            onPlayAgain={initializeGame}
            isTimerEnabled={isTimerEnabled}
          />
        )}

        {/* Instructions */}
        <div className="mt-8 text-center">
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-3">How to Play</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <p>
                • Click "Start Game" to begin with a 3-second preview of all
                cards
              </p>
              <p>• Memorize the card positions during the preview</p>
              <p>
                • After preview, click on cards to flip them and find matching
                pairs
              </p>
              <p>• Matched pairs will stay face up</p>
              <p>• Enable timer if you want to track your time</p>
              <p>• Find all pairs in the fewest moves possible!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCardGame;
