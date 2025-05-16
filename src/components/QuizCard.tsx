
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { QuizQuestion } from '@/data/quizQuestions';
import { Timer, Award, Code, Lightbulb, BookOpen } from 'lucide-react';
import { AvailableLanguage } from './LanguageToggle';

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
  timeLimitInSeconds?: number;
  language: AvailableLanguage;
}

const QuizCard: React.FC<QuizCardProps> = ({ 
  question, 
  onAnswer,
  timeLimitInSeconds = 20, // Default 20 seconds per question
  language
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [animation, setAnimation] = useState('');
  const [key, setKey] = useState(question.id);
  const [timeRemaining, setTimeRemaining] = useState(timeLimitInSeconds);
  const [timerActive, setTimerActive] = useState(true);
  
  // Use refs for animation frames and intervals
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset state when question changes
    setSelectedOption(null);
    setShowAnswer(false);
    setAnimation('animate-slide-up');
    setKey(question.id);
    setTimeRemaining(timeLimitInSeconds);
    setTimerActive(true);
    
    // Clear animation class after animation completes
    const timer = setTimeout(() => {
      setAnimation('');
    }, 500);
    
    return () => {
      clearTimeout(timer);
      if (timerRef.current) clearInterval(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [question, timeLimitInSeconds]);

  useEffect(() => {
    // Handle timer countdown using requestAnimationFrame for smoother animation
    if (timerActive && timeRemaining > 0) {
      startTimeRef.current = Date.now();
      
      const updateTimer = () => {
        if (!timerActive) return;
        
        const elapsed = (Date.now() - (startTimeRef.current || Date.now())) / 1000;
        const newTime = Math.max(timeRemaining - elapsed, 0);
        
        setTimeRemaining(prevTime => {
          // Only update state if there's a significant change (avoid unnecessary renders)
          return Math.abs(prevTime - newTime) >= 0.1 ? Math.round(newTime * 10) / 10 : prevTime;
        });
        
        if (newTime <= 0) {
          setTimerActive(false);
          setShowAnswer(true);
          setAnimation('animate-shake animate-pulse-error');
          
          setTimeout(() => {
            onAnswer(false);
          }, 1500);
          return;
        }
        
        animFrameRef.current = requestAnimationFrame(updateTimer);
      };
      
      animFrameRef.current = requestAnimationFrame(updateTimer);
    }
    
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [timerActive, onAnswer]);

  const handleOptionSelect = (option: string) => {
    if (selectedOption || showAnswer) return;
    
    setTimerActive(false);
    const isCorrect = option === question.correctAnswer;
    setSelectedOption(option);
    setShowAnswer(true);
    setAnimation(isCorrect ? 'animate-pulse-success' : 'animate-shake animate-pulse-error');
    
    // Play sound effect based on correct/incorrect answer
    try {
      const audio = new Audio(isCorrect ? '/correct.mp3' : '/incorrect.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio play prevented by browser policy'));
    } catch (e) {
      console.log('Audio error:', e);
    }
    
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1500);
  };

  const getOptionClassName = (option: string) => {
    if (!showAnswer || selectedOption !== option) {
      return 'option-button';
    }
    
    const isCorrect = option === question.correctAnswer;
    if (isCorrect) {
      return 'option-button border-success bg-success/20 text-success-foreground';
    } else {
      return 'option-button border-destructive bg-destructive/20 text-destructive-foreground';
    }
  };

  const timerPercentage = (timeRemaining / timeLimitInSeconds) * 100;
  const isTimeLow = timeRemaining <= 5;

  // Localized text based on language
  const getLocalizedText = () => {
    switch(language) {
      case 'es':
        return {
          seconds: "s",
          correctAnswer: "¡Buen trabajo! Esa es la respuesta correcta.",
          theCorrectAnswer: "La respuesta correcta era:"
        };
      case 'fr':
        return {
          seconds: "s",
          correctAnswer: "Bon travail! C'est la bonne réponse.",
          theCorrectAnswer: "La bonne réponse était:"
        };
      case 'de':
        return {
          seconds: "s",
          correctAnswer: "Gute Arbeit! Das ist die richtige Antwort.",
          theCorrectAnswer: "Die richtige Antwort war:"
        };
      default:
        return {
          seconds: "s",
          correctAnswer: "Great job! That's the correct answer.",
          theCorrectAnswer: "The correct answer was:"
        };
    }
  };

  const localizedText = getLocalizedText();

  return (
    <div key={key} className={cn("w-full max-w-2xl mx-auto p-6 rounded-xl bg-card border shadow-lg", animation)}>
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold">{question.question}</div>
        <div className={cn(
          "flex items-center gap-1 px-3 py-1 rounded-full font-medium", 
          isTimeLow ? "bg-destructive/20 text-destructive-foreground" : "bg-secondary"
        )}>
          <Timer size={16} className={isTimeLow ? "animate-pulse" : ""} />
          <span className={isTimeLow ? "animate-pulse" : ""}>{Math.ceil(timeRemaining)}{localizedText.seconds}</span>
        </div>
      </div>
      
      {/* Improved timer visualization */}
      <div className="w-full h-2 bg-secondary rounded-full mb-6 overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-300 rounded-full",
            isTimeLow ? "bg-destructive animate-pulse" : "bg-primary"
          )}
          style={{ width: `${timerPercentage}%` }}
        />
      </div>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(option)}
            className={cn(
              getOptionClassName(option),
              !showAnswer && "hover:scale-[1.01] active:scale-[0.99] transition-transform",
              !showAnswer && "hover:shadow-md transition-all duration-200"
            )}
            disabled={showAnswer}
            aria-disabled={showAnswer}
          >
            <div className="flex items-center">
              <span className="w-6 h-6 mr-3 flex items-center justify-center rounded-full bg-secondary text-sm font-semibold">
                {String.fromCharCode(65 + index)} {/* A, B, C, D */}
              </span>
              {option}
            </div>
          </button>
        ))}
      </div>

      {showAnswer && selectedOption === question.correctAnswer && (
        <div className="animate-fade-in mt-4 p-3 bg-success/10 rounded-lg border border-success/20 text-success-foreground flex items-center gap-2">
          <Award className="h-5 w-5 text-success" />
          <span>{localizedText.correctAnswer}</span>
        </div>
      )}
      
      {showAnswer && selectedOption !== question.correctAnswer && (
        <div className="animate-fade-in mt-4 p-3 bg-destructive/10 rounded-lg border border-destructive/20 text-destructive-foreground">
          {localizedText.theCorrectAnswer} {question.correctAnswer}
        </div>
      )}
      
      {/* Category badge */}
      {question.category && (
        <div className="absolute top-3 right-3">
          <div className="bg-accent/50 px-2 py-0.5 rounded-full text-xs font-medium text-accent-foreground">
            {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
