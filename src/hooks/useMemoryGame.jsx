import { useState, useEffect, useCallback } from "react";
import { generateCards } from "../utils/gameUtils";
import { CARD_IMAGES, DIFFICULTY_LEVELS } from "../constants/gameConstants";

const useMemoryGame = (difficulty) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStatus, setGameStatus] = useState("ready"); 
  const [disabled, setDisabled] = useState(false);
  const [isTimerEnabled, setIsTimerEnabled] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [previewCountdown, setPreviewCountdown] = useState(0);

  // Initialize game
  const initializeGame = useCallback(() => {
    const newCards = generateCards(difficulty, CARD_IMAGES, DIFFICULTY_LEVELS);
    setCards(newCards);
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setGameStatus("ready");
    setDisabled(false);
    setIsTimerRunning(false);
    setPreviewCountdown(0);
  }, [difficulty]);

  // Start game with preview
  const startGame = useCallback(() => {
    if (gameStatus === "ready") {
      setGameStatus("preview");
      setDisabled(true);
      setPreviewCountdown(5);

      const countdownInterval = setInterval(() => {
        setPreviewCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setGameStatus("playing");
            setDisabled(false);

            if (isTimerEnabled) {
              setIsTimerRunning(true);
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [gameStatus, isTimerEnabled]);

  // Toggle timer enable/disable
  const toggleTimerEnabled = useCallback(() => {
    if (gameStatus !== "playing" && gameStatus !== "preview") {
      setIsTimerEnabled((prev) => !prev);
      if (isTimerEnabled) {
        setIsTimerRunning(false);
        setTime(0);
      }
    }
  }, [gameStatus, isTimerEnabled]);

  // Start/stop timer manually
  const toggleTimer = useCallback(() => {
    if (isTimerEnabled && gameStatus !== "won") {
      setIsTimerRunning((prev) => !prev);
    }
  }, [isTimerEnabled, gameStatus]);

  // Timer effect - only runs when timer is enabled and running
  useEffect(() => {
    let interval = null;
    if (isTimerEnabled && isTimerRunning && gameStatus !== "won") {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerEnabled, isTimerRunning, gameStatus]);

  // Handle card click
  const handleCardClick = useCallback(
    (cardId) => {
      if (disabled || flippedCards.length >= 2 || gameStatus !== "playing")
        return;

      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId ? { ...card, flipped: true } : card
        )
      );

      setFlippedCards((prev) => [...prev, cardId]);
    },
    [disabled, flippedCards.length, gameStatus]
  );

  // Check for matches

  useEffect(() => {
    if (flippedCards.length === 2) {
      setDisabled(true);
      setMoves((prev) => prev + 1);

      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      if (firstCard && secondCard && firstCard.image === secondCard.image) {
        // Match found
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, matched: true }
                : card
            )
          );
          setFlippedCards([]);
          setDisabled(false);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setDisabled(false);
        }, 1500);
      }
    }
  }, [flippedCards, cards]);

  // Check for win condition
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameStatus("won");
      setIsTimerRunning(false);
    }
  }, [cards]);

  // Initialize game when component mounts or difficulty changes
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
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
  };
};

export default useMemoryGame;
