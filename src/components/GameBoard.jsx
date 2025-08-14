import React from "react";
import Card from "./Card";
import { DIFFICULTY_LEVELS } from "../constants/gameConstants";

const GameBoard = ({
  cards,
  onCardClick,
  disabled,
  difficulty,
  isPreviewMode,
}) => {
  const { gridCols } = DIFFICULTY_LEVELS[difficulty];

  return (
    <div
      className="grid gap-3 mx-auto justify-center justify-items-center max-w-4xl"
      style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(60px, 1fr))` }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={onCardClick}
          disabled={disabled}
          isPreviewMode={isPreviewMode}
        />
      ))}
    </div>
  );
};

export default GameBoard;
