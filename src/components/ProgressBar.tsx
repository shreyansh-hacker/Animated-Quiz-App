
import React from 'react';
import { cn } from '@/lib/utils';
import { Timer, Trophy } from 'lucide-react';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  score?: number;
  timeRemaining?: number;
  totalTime?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentQuestion, 
  totalQuestions,
  score = 0,
  timeRemaining,
  totalTime = 20
}) => {
  const progress = (currentQuestion / totalQuestions) * 100;
  const timeProgress = timeRemaining !== undefined ? (timeRemaining / totalTime) * 100 : null;
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentQuestion} of {totalQuestions}
          </span>
          {score > 0 && (
            <div className="flex items-center gap-1 bg-success/10 text-success-foreground px-2 py-0.5 rounded-full text-xs font-medium ml-2 animate-pulse">
              <Trophy size={12} />
              <span>Score: {score}</span>
            </div>
          )}
        </div>
        <span className="text-sm font-medium">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-500 ease-out rounded-full relative"
          style={{ width: `${progress}%` }}
        >
          {/* Enhanced animated effects inside the progress bar */}
          <div className="absolute top-0 right-0 bottom-0 w-6 bg-white/30 blur-sm animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 animate-pulse"></div>
        </div>
      </div>
      
      {/* Time remaining bar (if timeRemaining is provided) */}
      {timeRemaining !== undefined && (
        <div className="w-full h-1.5 bg-secondary/50 rounded-full mt-2 overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-300 rounded-full",
              timeRemaining <= 5 ? "bg-destructive animate-pulse" : "bg-primary/60"
            )}
            style={{ width: `${timeProgress}%` }}
          />
        </div>
      )}
      
      {/* Small checkpoints to show progress visually */}
      <div className="relative h-1 mt-1">
        {Array.from({ length: totalQuestions }).map((_, i) => (
          <div 
            key={i}
            className={cn(
              "absolute top-0 w-1 h-1 rounded-full transform -translate-x-1/2 transition-colors duration-300",
              i < currentQuestion - 1 ? "bg-primary" : "bg-secondary"
            )}
            style={{ left: `${(i / (totalQuestions - 1)) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
