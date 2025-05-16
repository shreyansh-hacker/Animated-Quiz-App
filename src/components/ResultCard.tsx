
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, Trophy, Medal, Award, Star, BookOpen, Code as CodeIcon, Lightbulb } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { AvailableLanguage } from './LanguageToggle';

interface ResultCardProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  category?: string;
  language: AvailableLanguage;
}

const ResultCard: React.FC<ResultCardProps> = ({ 
  score, 
  totalQuestions, 
  onRestart,
  category,
  language
}) => {
  const [showScore, setShowScore] = useState(false);
  const [animateValue, setAnimateValue] = useState(0);
  const percentage = (score / totalQuestions) * 100;
  
  useEffect(() => {
    // Delay showing the score for a dramatic reveal
    const timeout = setTimeout(() => {
      setShowScore(true);
    }, 500);

    // Animate the score percentage
    let start = 0;
    const end = Math.round(percentage);
    const duration = 1500;
    const startTime = Date.now();
    
    const animateScore = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimateValue(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animateScore);
      }
    };
    
    requestAnimationFrame(animateScore);
    
    return () => clearTimeout(timeout);
  }, [percentage]);
  
  const getMessage = () => {
    if (percentage === 100) return { 
      text: "Perfect Score! You're amazing! 🎉", 
      emoji: "🏆",
      badge: "Quiz Master",
      icon: <Trophy className="h-8 w-8 text-amber-500" />
    };
    if (percentage >= 80) return { 
      text: "Excellent work! Nearly perfect! 🌟", 
      emoji: "🌟",
      badge: "Quiz Expert",
      icon: <Award className="h-8 w-8 text-purple-500" />
    };
    if (percentage >= 60) return { 
      text: "Good job! You know your stuff! 👍", 
      emoji: "👍",
      badge: "Knowledge Buff",
      icon: <Medal className="h-8 w-8 text-blue-500" />
    };
    if (percentage >= 40) return { 
      text: "Not bad! Keep learning! 📚", 
      emoji: "📚",
      badge: "Quiz Apprentice",
      icon: <Medal className="h-8 w-8 text-green-500" />
    };
    return { 
      text: "Keep practicing! You'll get better! 💪", 
      emoji: "💪",
      badge: "Quiz Beginner",
      icon: <Medal className="h-8 w-8 text-gray-500" />
    };
  };

  const { text, emoji, badge, icon } = getMessage();

  const getCategoryIcon = () => {
    switch(category) {
      case 'technical': return <Lightbulb className="h-4 w-4 mr-1" />;
      case 'programming': return <CodeIcon className="h-4 w-4 mr-1" />;
      case 'general': return <BookOpen className="h-4 w-4 mr-1" />;
      default: return <Star className="h-4 w-4 mr-1" />;
    }
  };

  const getCategoryName = () => {
    switch(category) {
      case 'technical': return 'Technical';
      case 'programming': return 'Programming';
      case 'general': return 'General Knowledge';
      default: return 'Mixed';
    }
  };

  const handleShare = () => {
    const categoryName = getCategoryName();
    const shareText = `I scored ${score}/${totalQuestions} (${Math.round(percentage)}%) on the ${categoryName} Quiz! Think you can beat my score?`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Quiz Results',
        text: shareText,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(shareText)
        .then(() => {
          alert('Result copied to clipboard! Share it with your friends.');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  // Localized text based on language
  const getLocalizedText = () => {
    switch(language) {
      case 'es':
        return {
          quizComplete: "¡Cuestionario Completo!",
          yourScore: "Tu puntuación:",
          outOf: "de",
          tryAgain: "Intentar de nuevo",
          shareResult: "Compartir resultado",
          achievementsUnlocked: "Logros Desbloqueados",
          halfwayHero: "Héroe a medio camino",
          perfectScore: "Puntuación perfecta",
          quizParticipant: "Participante del cuestionario"
        };
      case 'fr':
        return {
          quizComplete: "Quiz Terminé!",
          yourScore: "Votre score:",
          outOf: "sur",
          tryAgain: "Réessayer",
          shareResult: "Partager le résultat",
          achievementsUnlocked: "Succès Débloqués",
          halfwayHero: "Héros à mi-chemin",
          perfectScore: "Score parfait",
          quizParticipant: "Participant au quiz"
        };
      case 'de':
        return {
          quizComplete: "Quiz abgeschlossen!",
          yourScore: "Ihr Ergebnis:",
          outOf: "von",
          tryAgain: "Erneut versuchen",
          shareResult: "Ergebnis teilen",
          achievementsUnlocked: "Freigeschaltete Erfolge",
          halfwayHero: "Halbzeit-Held",
          perfectScore: "Perfekte Punktzahl",
          quizParticipant: "Quiz-Teilnehmer"
        };
      default:
        return {
          quizComplete: "Quiz Complete!",
          yourScore: "Your score:",
          outOf: "out of",
          tryAgain: "Try Again",
          shareResult: "Share Result",
          achievementsUnlocked: "Achievements Unlocked",
          halfwayHero: "Half-way Hero",
          perfectScore: "Perfect Score",
          quizParticipant: "Quiz Participant"
        };
    }
  };

  const localizedText = getLocalizedText();

  return (
    <div className="w-full max-w-2xl mx-auto p-8 rounded-xl bg-card border shadow-lg animate-fade-in text-center relative overflow-hidden">
      {/* Enhanced confetti animation for high scores */}
      {percentage >= 70 && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-5 left-1/4 w-2 h-10 bg-yellow-500 rotate-45 animate-fall-slow"></div>
          <div className="absolute -top-5 left-1/3 w-2 h-8 bg-blue-500 rotate-12 animate-fall-medium"></div>
          <div className="absolute -top-5 left-1/2 w-2 h-12 bg-green-500 -rotate-20 animate-fall-fast"></div>
          <div className="absolute -top-5 left-2/3 w-2 h-9 bg-red-500 rotate-45 animate-fall-slow"></div>
          <div className="absolute -top-5 left-3/4 w-2 h-7 bg-purple-500 -rotate-12 animate-fall-medium"></div>
          <div className="absolute -top-5 left-1/6 w-2 h-11 bg-pink-500 rotate-20 animate-fall-medium"></div>
          <div className="absolute -top-5 left-5/6 w-2 h-8 bg-indigo-500 -rotate-45 animate-fall-slow"></div>
        </div>
      )}
      
      <div className="text-6xl mb-4 animate-bounce">{emoji}</div>
      
      {category && (
        <div className="flex justify-center mb-4">
          <Badge className="px-3 py-1 bg-accent/50 flex items-center">
            {getCategoryIcon()}
            {getCategoryName()} Quiz
          </Badge>
        </div>
      )}
      
      <div className="relative mb-8">
        {icon}
        <Badge variant="outline" className="absolute -top-2 -right-2 bg-accent px-3 py-1 text-xs animate-pulse">
          {badge}
        </Badge>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">{localizedText.quizComplete}</h2>
      
      <div className="mb-8">
        <p className="text-xl font-semibold mb-2">
          {localizedText.yourScore} <span className="text-primary">{score}</span> {localizedText.outOf} {totalQuestions}
        </p>
        <div className="w-full h-6 bg-secondary rounded-full mb-2 overflow-hidden relative">
          <div
            className="h-full bg-primary transition-all duration-1000 rounded-full flex items-center justify-end px-2"
            style={{ width: `${showScore ? percentage : 0}%` }}
          >
            {percentage > 15 && (
              <span className="text-xs text-primary-foreground font-bold animate-fade-in">
                {animateValue}%
              </span>
            )}
          </div>
          {percentage <= 15 && (
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground font-bold">
              {animateValue}%
            </span>
          )}
          
          {/* Sparkle effects for high scores */}
          {percentage >= 80 && (
            <>
              <div className="absolute top-0 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
              <div className="absolute top-1 left-2/3 w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
              <div className="absolute bottom-1 left-1/2 w-1 h-1 bg-white rounded-full animate-ping delay-700"></div>
            </>
          )}
        </div>
        <p className="text-lg mt-4">{text}</p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button 
          onClick={onRestart} 
          className="px-8 py-6 text-lg"
        >
          {localizedText.tryAgain}
        </Button>
        
        <Button 
          onClick={handleShare} 
          variant="outline"
          className="px-8 py-6 text-lg"
        >
          <Share2 className="mr-2" />
          {localizedText.shareResult}
        </Button>
      </div>
      
      {/* Achievement unlocked animation */}
      {score > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-sm text-muted-foreground mb-2">{localizedText.achievementsUnlocked}</div>
          <div className="flex flex-wrap justify-center gap-2">
            {score >= totalQuestions * 0.5 && (
              <Badge variant="outline" className="px-3 py-1 flex items-center gap-1 bg-secondary/50 animate-fade-in">
                <Star className="h-3 w-3" /> {localizedText.halfwayHero}
              </Badge>
            )}
            {score === totalQuestions && (
              <Badge variant="outline" className="px-3 py-1 flex items-center gap-1 bg-primary/20 animate-fade-in">
                <Trophy className="h-3 w-3" /> {localizedText.perfectScore}
              </Badge>
            )}
            {score > 0 && (
              <Badge variant="outline" className="px-3 py-1 flex items-center gap-1 bg-secondary/50 animate-fade-in">
                <Award className="h-3 w-3" /> {localizedText.quizParticipant}
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
