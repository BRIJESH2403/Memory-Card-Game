export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const generateCards = (difficulty, CARD_IMAGES, DIFFICULTY_LEVELS) => {
  const { pairs } = DIFFICULTY_LEVELS[difficulty];
  const selectedImages = shuffleArray(CARD_IMAGES).slice(0, pairs);
  const cardPairs = selectedImages.flatMap((image, index) => [
    { id: `${index}-a`, image, matched: false, flipped: false },
    { id: `${index}-b`, image, matched: false, flipped: false },
  ]);
  return shuffleArray(cardPairs);
};
