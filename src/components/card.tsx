import React from 'react';
import { CardCode, getCardImage } from '../utils/cards';

interface CardProps {
  card: CardCode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ card, className = '' }) => {
  return (
    <div className={`card-container ${className}`}>
      <img 
        src={getCardImage(card)} 
        alt={`${card} playing card`}
        className="w-32 h-auto transition-transform duration-200 hover:scale-110 hover:-translate-y-2 rounded-lg shadow-lg"
        onError={(e) => {
          console.error(`Failed to load image for card: ${card}`);
          // Optionally show a fallback image
          // e.currentTarget.src = '/fallback-card.svg';
        }}
      />
    </div>
  );
};

export default Card;