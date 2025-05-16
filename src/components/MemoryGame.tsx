
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Timer } from 'lucide-react';
import { AvailableLanguage } from './LanguageToggle';

interface MemoryGameProps {
  onGameComplete: (score: number) => void;
  language: AvailableLanguage;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onGameComplete, language }) => {
  const [cards, setCards] = useState<{ id: number; value: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [isProcessingMove, setIsProcessingMove] = useState<boolean>(false);
  
  // Translations
  const translations = {
    title: {
      en: 'Memory Game',
      es: 'Juego de Memoria',
      fr: 'Jeu de Mémoire',
      de: 'Gedächtnisspiel',
      hi: 'स्मृति खेल',
      bn: 'মেমোরি গেম',
      te: 'మెమరీ గేమ్'
    },
    instructions: {
      en: 'Match all pairs of cards in the fewest moves possible',
      es: 'Empareja todas las tarjetas en la menor cantidad de movimientos posibles',
      fr: 'Associez toutes les paires de cartes en faisant le moins de mouvements possible',
      de: 'Finde alle Kartenpaare mit möglichst wenigen Zügen',
      hi: 'कम से कम चालों में सभी कार्ड जोड़े मिलाएं',
      bn: 'সম্ভাব্য কম পদক্ষেপে সমস্ত কার্ড জোড়া মিলান',
      te: 'వీలైనంత తక్కువ కదలికలలో అన్ని కార్డుల జతలను మ్యాచ్ చేయండి'
    },
    start: {
      en: 'Start Game',
      es: 'Iniciar Juego',
      fr: 'Commencer le Jeu',
      de: 'Spiel Starten',
      hi: 'खेल शुरू करें',
      bn: 'গেম শুরু করুন',
      te: 'గేమ్ ప్రారంభించండి'
    },
    moves: {
      en: 'Moves',
      es: 'Movimientos',
      fr: 'Mouvements',
      de: 'Züge',
      hi: 'चालें',
      bn: 'পদক্ষেপ',
      te: 'కదలికలు'
    },
    time: {
      en: 'Time',
      es: 'Tiempo',
      fr: 'Temps',
      de: 'Zeit',
      hi: 'समय',
      bn: 'সময়',
      te: 'సమయం'
    },
    pairs: {
      en: 'Pairs',
      es: 'Pares',
      fr: 'Paires',
      de: 'Paare',
      hi: 'जोड़े',
      bn: 'জোড়া',
      te: 'జతలు'
    },
    completed: {
      en: 'Game Completed!',
      es: '¡Juego Completado!',
      fr: 'Jeu Terminé!',
      de: 'Spiel Beendet!',
      hi: 'खेल पूरा हुआ!',
      bn: 'গেম সমাপ্ত!',
      te: 'ఆట పూర్తయింది!'
    },
    score: {
      en: 'Your Score',
      es: 'Tu Puntaje',
      fr: 'Votre Score',
      de: 'Deine Punkte',
      hi: 'आपका स्कोर',
      bn: 'আপনার স্কোর',
      te: 'మీ స్కోర్'
    },
    continue: {
      en: 'Continue to Quiz',
      es: 'Continuar al Cuestionario',
      fr: 'Continuer vers le Quiz',
      de: 'Weiter zum Quiz',
      hi: 'क्विज पर जारी रखें',
      bn: 'কুইজ চালিয়ে যান',
      te: 'క్విజ్‌కి కొనసాగండి'
    }
  };
  
  // Icons for memory cards - expanded set for better gameplay
  const cardIcons = ['🚀', '🌟', '🌈', '🎮', '🎯', '🎨', '🎭', '🎧', '🏆', '🎪', '🎡', '🎢', '🍕', '🍦', '🌮', '🍿'];
  
  // Initialize the game with proper shuffling
  const initializeGame = () => {
    // Select 8 random icons for a game with 8 pairs (16 cards total)
    const selectedIcons = [...cardIcons].sort(() => Math.random() - 0.5).slice(0, 8);
    
    const initialCards = [
      ...selectedIcons.map((icon, index) => ({
        id: index,
        value: icon,
        isFlipped: false,
        isMatched: false
      })),
      ...selectedIcons.map((icon, index) => ({
        id: index + 8,
        value: icon,
        isFlipped: false,
        isMatched: false
      }))
    ];
    
    // Shuffle cards
    const shuffledCards = [...initialCards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimeElapsed(0);
    setGameCompleted(false);
    setIsProcessingMove(false);
  };
  
  // Start the game
  const startGame = () => {
    initializeGame();
    setGameStarted(true);
  };
  
  // Handle card flip with improved error handling
  const handleCardClick = (id: number) => {
    // Prevent flipping if already processing a move, card is already flipped or matched
    if (
      isProcessingMove || 
      flippedCards.length >= 2 || 
      cards.find(card => card.id === id)?.isFlipped || 
      cards.find(card => card.id === id)?.isMatched
    ) {
      return;
    }
    
    // Update flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    // Update card state
    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, isFlipped: true };
      }
      return card;
    });
    setCards(updatedCards);
    
    // Check for matches if two cards are flipped
    if (newFlippedCards.length === 2) {
      setIsProcessingMove(true);
      setMoves(prevMoves => prevMoves + 1);
      
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = updatedCards.find(card => card.id === firstCardId);
      const secondCard = updatedCards.find(card => card.id === secondCardId);
      
      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        // Cards match
        const matchedCards = updatedCards.map((card) => {
          if (card.id === firstCardId || card.id === secondCardId) {
            return { ...card, isMatched: true };
          }
          return card;
        });
        
        setCards(matchedCards);
        setMatchedPairs(prevPairs => prevPairs + 1);
        setFlippedCards([]);
        setIsProcessingMove(false);
        
        // Check if all pairs are matched
        if (matchedPairs + 1 === 8) { // Using 8 pairs now
          setGameCompleted(true);
          const finalScore = calculateScore(moves + 1, timeElapsed);
          setTimeout(() => {
            onGameComplete(finalScore);
          }, 1500);
        }
      } else {
        // Cards don't match, flip them back after a delay
        setTimeout(() => {
          const resetCards = updatedCards.map((card) => {
            if (card.id === firstCardId || card.id === secondCardId) {
              return { ...card, isFlipped: false };
            }
            return card;
          });
          
          setCards(resetCards);
          setFlippedCards([]);
          setIsProcessingMove(false);
        }, 1000);
      }
    }
  };
  
  // Calculate score based on moves and time
  const calculateScore = (totalMoves: number, totalTime: number) => {
    const baseScore = 1000;
    const movesPenalty = totalMoves * 10;
    const timePenalty = Math.floor(totalTime / 2);
    return Math.max(100, baseScore - movesPenalty - timePenalty);
  };
  
  // Update timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (gameStarted && !gameCompleted) {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStarted, gameCompleted]);
  
  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-xl bg-card border shadow-lg animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
          {translations.title[language]}
        </h2>
        <p className="text-muted-foreground mt-2">
          {translations.instructions[language]}
        </p>
      </div>
      
      {!gameStarted ? (
        <div className="flex justify-center">
          <Button 
            onClick={startGame} 
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            {translations.start[language]}
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-secondary">
              <Trophy size={16} />
              <span>{translations.moves[language]}: {moves}</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-secondary">
              <Timer size={16} />
              <span>{translations.time[language]}: {formatTime(timeElapsed)}</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-secondary">
              <span>{translations.pairs[language]}: {matchedPairs}/8</span>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square flex items-center justify-center text-3xl rounded-lg cursor-pointer transition-all duration-300 transform ${
                  card.isFlipped || card.isMatched
                    ? 'bg-primary/20 rotateY-0 scale-100'
                    : 'bg-secondary hover:bg-secondary/80 rotateY-180 hover:scale-105'
                } ${card.isMatched ? 'opacity-60' : 'opacity-100'}`}
              >
                {(card.isFlipped || card.isMatched) && card.value}
              </div>
            ))}
          </div>
          
          {gameCompleted && (
            <div className="mt-6 p-4 bg-accent/20 rounded-lg text-center">
              <h3 className="text-xl font-bold">{translations.completed[language]}</h3>
              <p className="text-lg mt-2">
                {translations.score[language]}: {calculateScore(moves, timeElapsed)}
              </p>
              <Button 
                onClick={() => onGameComplete(calculateScore(moves, timeElapsed))} 
                className="mt-4 bg-gradient-to-r from-green-500 to-teal-500"
              >
                {translations.continue[language]}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MemoryGame;
