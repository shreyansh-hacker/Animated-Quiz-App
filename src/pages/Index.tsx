
import React, { useEffect, useState } from 'react';
import { shuffle, getRandomQuestions } from '@/lib/utils';
import quizQuestions, { QuizQuestion } from '@/data/quizQuestions';
import ProgressBar from '@/components/ProgressBar';
import QuizCard from '@/components/QuizCard';
import ResultCard from '@/components/ResultCard';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle, { AvailableLanguage } from '@/components/LanguageToggle';
import WelcomeScreen from '@/components/WelcomeScreen';
import AnimatedBackground from '@/components/AnimatedBackground';
import QuizOrb3D from '@/components/QuizOrb3D';
import MemoryGame from '@/components/MemoryGame';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questionCount, setQuestionCount] = useState(5); // Default to 5 questions
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(20);
  const [timePerQuestion, setTimePerQuestion] = useState(20); // Default time per question
  const [language, setLanguage] = useState<AvailableLanguage>('en');
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [showMemoryGame, setShowMemoryGame] = useState(false);
  const [bonusScore, setBonusScore] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("welcome");
  const { toast } = useToast();

  const initializeQuiz = () => {
    const selectedQuestions = getRandomQuestions(
      quizQuestions.filter(q => 
        (difficulty === "all" || q.difficulty === difficulty) &&
        (selectedCategory === "all" || q.category === selectedCategory)
      ), 
      questionCount
    );
    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setTimeRemaining(timePerQuestion);
    setBonusScore(0);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowWelcome(false);
    if (activeTab === "memory") {
      setShowMemoryGame(true);
    } else {
      setShowMemoryGame(false);
      initializeQuiz();
    }
  };

  const handleQuestionCountChange = (count: number) => {
    setQuestionCount(count);
  };

  const handleTimeLimitChange = (seconds: number) => {
    setTimePerQuestion(seconds);
  };

  const handleDifficultyChange = (selectedDifficulty: string) => {
    setDifficulty(selectedDifficulty);
  };

  const handleLanguageChange = (lang: AvailableLanguage) => {
    setLanguage(lang);
  };

  const handleRestartQuiz = () => {
    setShowWelcome(true);
    setShowMemoryGame(false);
    setActiveTab("welcome");
  };

  const handleMemoryGameComplete = (gameScore: number) => {
    setBonusScore(gameScore);
    setShowMemoryGame(false);
    toast({
      description: `Memory Game Bonus: +${gameScore} points!`,
      className: "bg-success/10 text-success-foreground border-success/20",
    });
    initializeQuiz();
  };

  useEffect(() => {
    if (selectedCategory && !showWelcome && !showMemoryGame) {
      initializeQuiz();
    }
  }, [selectedCategory, questionCount, timePerQuestion, difficulty, showWelcome, showMemoryGame]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      const pointValue = 
        difficulty === "easy" ? 1 :
        difficulty === "intermediate" ? 2 : 3;
      
      setScore(score + pointValue);
      toast({
        description: `Correct answer! +${pointValue} point${pointValue > 1 ? 's' : ''}`,
        className: "bg-success/10 text-success-foreground border-success/20",
      });
    } else {
      toast({
        description: "Incorrect answer. The correct answer was: " + 
          questions[currentQuestionIndex].correctAnswer,
        className: "bg-destructive/10 text-destructive-foreground border-destructive/20",
      });
    }

    // Set transitioning state for smooth question changes
    setIsTransitioning(true);

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setTimeout(() => {
        setCurrentQuestionIndex(nextQuestionIndex);
        setTimeRemaining(timePerQuestion);
        setIsTransitioning(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setQuizCompleted(true);
        setIsTransitioning(false);
      }, 1000);
    }
  };

  const translations = {
    welcome: {
      en: 'Welcome',
      es: 'Bienvenido',
      fr: 'Bienvenue',
      de: 'Willkommen',
      hi: 'स्वागत है',
      bn: 'স্বাগতম',
      te: 'స్వాగతం'
    },
    quiz: {
      en: 'Quiz',
      es: 'Cuestionario',
      fr: 'Quiz',
      de: 'Quiz',
      hi: 'प्रश्नोत्तरी',
      bn: 'কুইজ',
      te: 'క్విజ్'
    },
    memory: {
      en: 'Memory Game',
      es: 'Juego de Memoria',
      fr: 'Jeu de Mémoire',
      de: 'Gedächtnisspiel',
      hi: 'स्मृति खेल',
      bn: 'মেমরি গেম',
      te: 'మెమరీ గేమ్'
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background transition-colors duration-300 overflow-x-hidden">
      <AnimatedBackground />
      <QuizOrb3D />
      
      <ThemeToggle />
      <LanguageToggle onLanguageChange={handleLanguageChange} />
      
      <div className="w-full max-w-4xl mx-auto px-4 py-10 relative z-10">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            {language === 'en' && "Interactive Quiz"}
            {language === 'es' && "Cuestionario Interactivo"}
            {language === 'fr' && "Quiz Interactif"}
            {language === 'de' && "Interaktives Quiz"}
            {language === 'hi' && "इंटरैक्टिव क्विज"}
            {language === 'bn' && "ইন্টারেক্টিভ কুইজ"}
            {language === 'te' && "ఇంటరాక్టివ్ క్విజ్"}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' && "Test your knowledge with our animated quiz"}
            {language === 'es' && "Pon a prueba tus conocimientos con nuestro cuestionario animado"}
            {language === 'fr' && "Testez vos connaissances avec notre quiz animé"}
            {language === 'de' && "Testen Sie Ihr Wissen mit unserem animierten Quiz"}
            {language === 'hi' && "हमारी एनिमेटेड क्विज के साथ अपने ज्ञान का परीक्षण करें"}
            {language === 'bn' && "আমাদের অ্যানিমেটেড কুইজের সাথে আপনার জ্ঞান পরীক্ষা করুন"}
            {language === 'te' && "మా యానిమేటెడ్ క్విజ్‌తో మీ జ్ఞానాన్ని పరీక్షించుకోండి"}
          </p>

          {showWelcome && (
            <Tabs 
              value={activeTab}
              onValueChange={(value) => setActiveTab(value)}
              className="mt-4 max-w-md mx-auto"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="welcome">{translations.welcome[language]}</TabsTrigger>
                <TabsTrigger value="quiz">{translations.quiz[language]}</TabsTrigger>
                <TabsTrigger value="memory">{translations.memory[language]}</TabsTrigger>
              </TabsList>
            </Tabs>
          )}
        </header>

        {showWelcome ? (
          <WelcomeScreen 
            onSelectCategory={handleCategorySelect} 
            onSelectQuestionCount={handleQuestionCountChange}
            onSelectTimeLimit={handleTimeLimitChange}
            onSelectDifficulty={handleDifficultyChange}
            language={language}
          />
        ) : showMemoryGame ? (
          <MemoryGame 
            onGameComplete={handleMemoryGameComplete} 
            language={language}
          />
        ) : (
          !quizCompleted ? (
            <div className="space-y-6">
              <ProgressBar 
                currentQuestion={currentQuestionIndex + 1} 
                totalQuestions={questions.length} 
                score={score + bonusScore}
                timeRemaining={!isTransitioning ? timeRemaining : undefined}
                totalTime={timePerQuestion}
              />
              
              {questions.length > 0 && !isTransitioning ? (
                <QuizCard 
                  question={questions[currentQuestionIndex]} 
                  onAnswer={handleAnswer} 
                  timeLimitInSeconds={timePerQuestion}
                  language={language}
                />
              ) : (
                <div className="h-96 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    <p className="text-muted-foreground">
                      {language === 'en' && "Loading next question..."}
                      {language === 'es' && "Cargando siguiente pregunta..."}
                      {language === 'fr' && "Chargement de la question suivante..."}
                      {language === 'de' && "Nächste Frage wird geladen..."}
                      {language === 'hi' && "अगला प्रश्न लोड हो रहा है..."}
                      {language === 'bn' && "পরবর্তী প্রশ্ন লোড হচ্ছে..."}
                      {language === 'te' && "తదుపరి ప్రశ్నను లోడ్ చేస్తోంది..."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <ResultCard 
              score={score + bonusScore} 
              totalQuestions={questions.length} 
              onRestart={handleRestartQuiz} 
              category={selectedCategory}
              language={language}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Index;
