import React from "react";

const Card = ({ card, onClick, disabled, isPreviewMode }) => {
  const handleClick = () => {
    if (!disabled && !card.flipped && !card.matched && !isPreviewMode) {
      onClick(card.id);
    }
  };

  return (
    <div
      className={`relative w-16 h-16 md:w-20 md:h-20 aspect-square cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        disabled || isPreviewMode ? "cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
    >
      <div
        className={`absolute inset-0 rounded-md transition-transform duration-500 preserve-3d ${
          card.flipped || card.matched || isPreviewMode ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute inset-0 rounded-md bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center backface-hidden"></div>

        <div className="absolute inset-0 rounded-md bg-gradient-to-br from-white to-gray-100 flex items-center justify-center backface-hidden rotate-y-180 border border-gray-200 shadow">
          <span className="text-2xl md:text-3xl">{card.image}</span>
        </div>
      </div>

      {card.matched && (
        <div className="absolute inset-0 rounded-md bg-green-500/20 flex items-center justify-center">
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
