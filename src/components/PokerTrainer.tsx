import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from './card';
import { CardCode } from '../utils/cards';
import type { PokerHand } from '../types/poker';

const formatPosition = (position: string): string => {
  const positions: Record<string, string> = {
    'EP': 'Early Position',
    'MP': 'Middle Position',
    'LP': 'Late Position'
  };
  return positions[position] || position;
};

const formatCondition = (condition: string): string => {
  const conditions: Record<string, string> = {
    'Unopened': 'No one has opened',
    'Raised': 'Someone has raised'
  };
  return conditions[condition] || condition;
};
const getRandomSuit = (): string => {
  const suits = ['h', 'd', 'c', 's'];
  return suits[Math.floor(Math.random() * suits.length)];
};

const getCardCodes = (hand: string | number): CardCode[] => {
  if (typeof hand === 'number') {
    // For pairs, use random different suits
    const value = String(hand)[0];
    let suit1 = getRandomSuit();
    let suit2;
    do {
      suit2 = getRandomSuit();
    } while (suit2 === suit1);
    
    return [`${value}${suit1}`, `${value}${suit2}`] as CardCode[];
  }

  const handString = String(hand);
  const isSuited = handString.endsWith('s');
  const card1 = handString[0];
  const card2 = handString[1];

  if (isSuited) {
    // For suited hands, use the same random suit
    const suit = getRandomSuit();
    return [`${card1}${suit}`, `${card2}${suit}`] as CardCode[];
  } else {
    // For offsuit hands, use different random suits
    let suit1 = getRandomSuit();
    let suit2;
    do {
      suit2 = getRandomSuit();
    } while (suit2 === suit1);
    
    return [`${card1}${suit1}`, `${card2}${suit2}`] as CardCode[];
  }
};

interface ExtendedPokerHand extends PokerHand {
  cardCodes: CardCode[];
}

const PokerTrainer: React.FC = () => {
  const [currentHand, setCurrentHand] = useState<PokerHand | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    getRandomHand();
  }, []);

  const getRandomHand = async () => {
    try {
      const response = await fetch('/poker.json');
      const hands: PokerHand[] = await response.json();
      const randomHand = hands[Math.floor(Math.random() * hands.length)];
      
      // Generate card codes once when getting a new hand
      const cardCodes = getCardCodes(randomHand.hand);
      
      setCurrentHand({
        ...randomHand,
        cardCodes
      });
      setShowResult(false);
    } catch (error) {
      console.error('Error loading hand:', error);
    }
  };

  const handleAction = (action: string) => {
    if (!currentHand) return;

    const isCorrect = action.toLowerCase() === currentHand.action.toLowerCase();
    setResult(isCorrect ? 'Correct! Well played!' : `Incorrect. The correct play was to ${currentHand.action}`);
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    setShowResult(true);
  };

  if (!currentHand) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="game-container max-w-4xl mx-auto"
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-4 text-white">Poker Training Game</h1>
          <div className="space-y-2">
            <p className="text-xl text-gray-200">
              {formatPosition(currentHand.position)} | {formatCondition(currentHand.condition)}
            </p>
            <p className="text-lg text-gray-300">
              Score: {score.correct}/{score.total} 
              {score.total > 0 && ` (${Math.round((score.correct/score.total) * 100)}%)`}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
        {currentHand.cardCodes?.map((cardCode, index) => (
          <Card key={index} card={cardCode} />
        )) || []}
        </div>
        
        {!showResult ? (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleAction('Fold')}
              className="btn-danger"
            >
              Fold
            </button>
            <button
              onClick={() => handleAction('Call')}
              className="btn-primary"
            >
              Call
            </button>
            <button
              onClick={() => handleAction('Raise')}
              className="btn-success"
            >
              Raise
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <p className={`text-2xl mb-4 ${result.includes('Correct') ? 'text-green-400' : 'text-red-400'}`}>
              {result}
            </p>
            <button
              onClick={getRandomHand}
              className="btn-primary"
            >
              Next Hand
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PokerTrainer;