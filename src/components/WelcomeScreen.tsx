
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, CodeIcon, Lightbulb, Star, Award, Trophy, Timer, Clock, Dumbbell, BookOpen, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AvailableLanguage } from './LanguageToggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onSelectCategory: (category: string) => void;
  onSelectQuestionCount?: (count: number) => void;
  onSelectTimeLimit?: (seconds: number) => void;
  onSelectDifficulty?: (difficulty: string) => void;
  language?: AvailableLanguage;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  onSelectCategory,
  onSelectQuestionCount,
  onSelectTimeLimit,
  onSelectDifficulty,
  language = 'en'
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("easy");
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(5);
  const [selectedTimeLimit, setSelectedTimeLimit] = useState<number>(20);
  
  const handleCategorySelect = (category: string) => {
    onSelectCategory(category);
    if (onSelectDifficulty) {
      onSelectDifficulty(selectedDifficulty);
    }
  };
  
  const handleQuestionCountSelect = (count: number) => {
    setSelectedQuestionCount(count);
    if (onSelectQuestionCount) {
      onSelectQuestionCount(count);
    }
  };
  
  const handleTimeLimitSelect = (seconds: number) => {
    setSelectedTimeLimit(seconds);
    if (onSelectTimeLimit) {
      onSelectTimeLimit(seconds);
    }
  };
  
  const translations = {
    title: {
      en: 'Welcome to the Quiz Challenge!',
      es: '¡Bienvenido al Desafío del Cuestionario!',
      fr: 'Bienvenue au Quiz Challenge!',
      de: 'Willkommen zur Quiz-Challenge!',
      hi: 'क्विज चैलेंज में आपका स्वागत है!',
      bn: 'কুইজ চ্যালেঞ্জে আপনাকে স্বাগতম!',
      te: 'క్విజ్ ఛాలెంజ్‌కి స్వాగతం!'
    },
    description: {
      en: 'Test your knowledge, earn badges, and challenge yourself with our fun, animated quiz experience!',
      es: '¡Pon a prueba tus conocimientos, gana insignias y desafíate con nuestra divertida experiencia de cuestionario animado!',
      fr: 'Testez vos connaissances, gagnez des badges et relevez des défis avec notre expérience de quiz amusante et animée!',
      de: 'Testen Sie Ihr Wissen, verdienen Sie Abzeichen und fordern Sie sich selbst heraus mit unserem animierten Quiz-Erlebnis!',
      hi: 'अपने ज्ञान का परीक्षण करें, बैज अर्जित करें, और हमारे मजेदार, एनिमेटेड क्विज अनुभव के साथ खुद को चुनौती दें!',
      bn: 'আপনার জ্ঞান পরীক্ষা করুন, ব্যাজ অর্জন করুন এবং আমাদের মজাদার, অ্যানিমেটেড কুইজ অভিজ্ঞতার সাথে নিজেকে চ্যালেঞ্জ করুন!',
      te: 'మీ జ్ఞానాన్ని పరీక్షించుకోండి, బ్యాడ్జీలను సంపాదించండి మరియు మా సరదా, యానిమేటెడ్ క్విజ్ అనుభవంతో మిమ్మల్ని మీరు సవాలు చేసుకోండి!'
    },
    features: {
      en: ['Timed Questions', 'Earn Badges', 'Share Results'],
      es: ['Preguntas cronometradas', 'Gana insignias', 'Comparte resultados'],
      fr: ['Questions chronométrées', 'Gagnez des badges', 'Partagez les résultats'],
      de: ['Fragen mit Zeitlimit', 'Abzeichen verdienen', 'Ergebnisse teilen'],
      hi: ['समयबद्ध प्रश्न', 'बैज अर्जित करें', 'परिणाम साझा करें'],
      bn: ['সময়বদ্ধ প্রশ্ন', 'ব্যাজ অর্জন করুন', 'ফলাফল শেয়ার করুন'],
      te: ['సమయం ప్రశ్నలు', 'బ్యాడ్జీలను సంపాదించండి', 'ఫలితాలను షేర్ చేయండి']
    },
    categories: {
      technical: {
        en: 'Technical Quiz',
        es: 'Cuestionario Técnico',
        fr: 'Quiz Technique',
        de: 'Technisches Quiz',
        hi: 'तकनीकी प्रश्नोत्तरी',
        bn: 'প্রযুক্তিগত কুইজ',
        te: 'టెక్నికల్ క్విజ్'
      },
      technical_desc: {
        en: 'Science, physics, chemistry and more',
        es: 'Ciencia, física, química y más',
        fr: 'Science, physique, chimie et plus',
        de: 'Wissenschaft, Physik, Chemie und mehr',
        hi: 'विज्ञान, भौतिकी, रसायन विज्ञान और अधिक',
        bn: 'বিজ্ঞান, পদার্থবিদ্যা, রসায়ন এবং আরও অনেক কিছু',
        te: 'సైన్స్, ఫిజిక్స్, కెమిస్ట్రీ మరియు మరిన్ని'
      },
      programming: {
        en: 'Programming Quiz',
        es: 'Cuestionario de Programación',
        fr: 'Quiz de Programmation',
        de: 'Programmier-Quiz',
        hi: 'प्रोग्रामिंग प्रश्नोत्तरी',
        bn: 'প্রোগ্রামিং কুইজ',
        te: 'ప్రోగ్రామింగ్ క్విజ్'
      },
      programming_desc: {
        en: 'Coding languages, frameworks, and concepts',
        es: 'Lenguajes de programación, frameworks y conceptos',
        fr: 'Langages de programmation, frameworks et concepts',
        de: 'Programmiersprachen, Frameworks und Konzepte',
        hi: 'कोडिंग भाषाएँ, फ्रेमवर्क और अवधारणाएँ',
        bn: 'কোডিং ভাষা, ফ্রেমওয়ার্ক এবং ধারণা',
        te: 'కోడింగ్ లాంగ్వేజెస్, ఫ్రేమ్‌వర్క్‌లు మరియు భావనలు'
      },
      general: {
        en: 'General Knowledge',
        es: 'Conocimiento General',
        fr: 'Culture Générale',
        de: 'Allgemeinwissen',
        hi: 'सामान्य ज्ञान',
        bn: 'সাধারণ জ্ঞান',
        te: 'సాధారణ జ్ఞానం'
      },
      general_desc: {
        en: 'History, geography, arts, and culture',
        es: 'Historia, geografía, artes y cultura',
        fr: 'Histoire, géographie, arts et culture',
        de: 'Geschichte, Geographie, Kunst und Kultur',
        hi: 'इतिहास, भूगोल, कला और संस्कृति',
        bn: 'ইতিহাস, ভূগোল, শিল্প এবং সংস্কৃতি',
        te: 'చరిత్ర, భూగోళశాస్త్రం, కళలు మరియు సంస్కృతి'
      },
      all: {
        en: 'Mix of Everything',
        es: 'Mezcla de Todo',
        fr: 'Mélange de Tout',
        de: 'Mix aus Allem',
        hi: 'सब कुछ का मिश्रण',
        bn: 'সবকিছুর মিশ্রণ',
        te: 'అన్నింటి మిశ్రమం'
      },
      all_desc: {
        en: 'Challenge yourself with questions from all categories',
        es: 'Desafíate con preguntas de todas las categorías',
        fr: 'Défiez-vous avec des questions de toutes les catégories',
        de: 'Fordern Sie sich mit Fragen aus allen Kategorien heraus',
        hi: 'सभी श्रेणियों के प्रश्नों के साथ खुद को चुनौती दें',
        bn: 'সমস্ত বিভাগের প্রশ্ন দিয়ে নিজেকে চ্যালেঞ্জ করুন',
        te: 'అన్ని వర్గాల నుండి ప్రశ్నలతో మిమ్మల్ని మీరు సవాలు చేసుకోండి'
      }
    },
    questionCount: {
      en: 'Question Count',
      es: 'Número de Preguntas',
      fr: 'Nombre de Questions',
      de: 'Anzahl der Fragen',
      hi: 'प्रश्नों की संख्या',
      bn: 'প্রশ্নের সংখ্যা',
      te: 'ప్రశ్నల సంఖ్య'
    },
    timePerQuestion: {
      en: 'Time Per Question',
      es: 'Tiempo Por Pregunta',
      fr: 'Temps Par Question',
      de: 'Zeit Pro Frage',
      hi: 'प्रति प्रश्न समय',
      bn: 'প্রতি প্রশ্নের সময়',
      te: 'ప్రశ్న సమయం'
    },
    questions: {
      en: 'Questions',
      es: 'Preguntas',
      fr: 'Questions',
      de: 'Fragen',
      hi: 'प्रश्न',
      bn: 'প্রশ্ন',
      te: 'ప్రశ్నలు'
    },
    seconds: {
      en: 'Seconds',
      es: 'Segundos',
      fr: 'Secondes',
      de: 'Sekunden',
      hi: 'सेकंड',
      bn: 'সেকেন্ড',
      te: 'సెకన్లు'
    },
    selectCategory: {
      en: 'Select a category to start your quiz journey!',
      es: '¡Selecciona una categoría para comenzar tu viaje de cuestionario!',
      fr: 'Sélectionnez une catégorie pour commencer votre parcours de quiz!',
      de: 'Wählen Sie eine Kategorie, um Ihre Quiz-Reise zu beginnen!',
      hi: 'अपनी प्रश्नोत्तरी यात्रा शुरू करने के लिए एक श्रेणी चुनें!',
      bn: 'আপনার কুইজ যাত্রা শুরু করতে একটি বিভাগ নির্বাচন করুন!',
      te: 'మీ క్విజ్ ప్రయాణాన్ని ప్రారంభించడానికి వర్గాన్ని ఎంచుకోండి!'
    },
    difficultyLevel: {
      en: 'Difficulty Level',
      es: 'Nivel de Dificultad',
      fr: 'Niveau de Difficulté',
      de: 'Schwierigkeitsgrad',
      hi: 'कठिनाई स्तर',
      bn: 'কঠিনতা স্তর',
      te: 'కష్టం స్థాయి'
    },
    easy: {
      en: 'Easy',
      es: 'Fácil',
      fr: 'Facile',
      de: 'Einfach',
      hi: 'आसान',
      bn: 'সহজ',
      te: 'సులభం'
    },
    intermediate: {
      en: 'Intermediate',
      es: 'Intermedio',
      fr: 'Intermédiaire',
      de: 'Mittelschwer',
      hi: 'मध्यम',
      bn: 'মাঝারি',
      te: 'మధ్యస్థం'
    },
    hard: {
      en: 'Hard',
      es: 'Difícil',
      fr: 'Difficile',
      de: 'Schwer',
      hi: 'कठिन',
      bn: 'কঠিন',
      te: 'కష్టం'
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Card className="bg-card border shadow-lg overflow-hidden relative">
        {/* Enhanced background gradients - increased opacity for visibility */}
        <div className="absolute top-0 right-0 w-40 h-40 -mt-20 -mr-20 bg-gradient-to-br from-purple-500/40 to-blue-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 -mb-20 -ml-20 bg-gradient-to-tr from-amber-500/40 to-pink-500/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-tr from-green-500/30 to-blue-500/30 rounded-full blur-xl animate-pulse"></div>
        
        <CardHeader className="text-center relative z-10">
          <div className="flex justify-center mb-2">
            <Trophy className="h-12 w-12 text-amber-500 animate-bounce" />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            {translations.title[language]}
          </CardTitle>
          <CardDescription className="text-lg mt-3 max-w-2xl mx-auto">
            {translations.description[language]}
          </CardDescription>
          
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {translations.features[language].map((feature, index) => (
              <Badge key={index} variant="outline" className="bg-accent/50 animate-pulse">
                {feature}
              </Badge>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10 p-6">
          <Tabs defaultValue="categories" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => handleCategorySelect("technical")}
                  variant="outline"
                  className="flex flex-col items-center justify-center gap-2 p-6 h-auto text-left relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                  <Lightbulb className="h-10 w-10 text-blue-500 mb-2 transition-transform group-hover:scale-110 duration-300" />
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      {translations.categories?.technical?.[language] || 'Technical Quiz'}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {translations.categories?.technical_desc?.[language] || 'Science, physics, chemistry and more'}
                    </p>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => handleCategorySelect("programming")}
                  variant="outline"
                  className="flex flex-col items-center justify-center gap-2 p-6 h-auto text-left relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                  <CodeIcon className="h-10 w-10 text-purple-500 mb-2 transition-transform group-hover:scale-110 duration-300" />
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                      {translations.categories?.programming?.[language] || 'Programming Quiz'}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {translations.categories?.programming_desc?.[language] || 'Coding languages, frameworks, and concepts'}
                    </p>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => handleCategorySelect("general")}
                  variant="outline"
                  className="flex flex-col items-center justify-center gap-2 p-6 h-auto text-left relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                  <Book className="h-10 w-10 text-green-500 mb-2 transition-transform group-hover:scale-110 duration-300" />
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                      {translations.categories?.general?.[language] || 'General Knowledge'}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {translations.categories?.general_desc?.[language] || 'History, geography, arts, and culture'}
                    </p>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => handleCategorySelect("all")}
                  variant="outline"
                  className="flex flex-col items-center justify-center gap-2 p-6 h-auto text-left relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                  <Star className="h-10 w-10 text-amber-500 mb-2 transition-transform group-hover:scale-110 duration-300" />
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                      {translations.categories?.all?.[language] || 'Mix of Everything'}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {translations.categories?.all_desc?.[language] || 'Challenge yourself with questions from all categories'}
                    </p>
                  </div>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="space-y-6">
                <div>
                  <h4 className="text-center font-medium mb-2 flex items-center justify-center gap-1">
                    <Brain size={18} />
                    {translations.difficultyLevel?.[language] || 'Difficulty Level'}
                  </h4>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button 
                      onClick={() => {
                        setSelectedDifficulty("easy");
                        if (onSelectDifficulty) onSelectDifficulty("easy");
                      }} 
                      variant={selectedDifficulty === "easy" ? "default" : "outline"}
                      className={`flex items-center gap-2 ${selectedDifficulty === "easy" ? "bg-green-500 text-white hover:bg-green-600" : ""}`}
                    >
                      <BookOpen size={16} />
                      {translations.easy?.[language] || 'Easy'}
                    </Button>
                    <Button 
                      onClick={() => {
                        setSelectedDifficulty("intermediate");
                        if (onSelectDifficulty) onSelectDifficulty("intermediate");
                      }} 
                      variant={selectedDifficulty === "intermediate" ? "default" : "outline"}
                      className={`flex items-center gap-2 ${selectedDifficulty === "intermediate" ? "bg-blue-500 text-white hover:bg-blue-600" : ""}`}
                    >
                      <Award size={16} />
                      {translations.intermediate?.[language] || 'Intermediate'}
                    </Button>
                    <Button 
                      onClick={() => {
                        setSelectedDifficulty("hard");
                        if (onSelectDifficulty) onSelectDifficulty("hard");
                      }} 
                      variant={selectedDifficulty === "hard" ? "default" : "outline"}
                      className={`flex items-center gap-2 ${selectedDifficulty === "hard" ? "bg-red-500 text-white hover:bg-red-600" : ""}`}
                    >
                      <Dumbbell size={16} />
                      {translations.hard?.[language] || 'Hard'}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-center font-medium mb-2 flex items-center justify-center gap-1">
                    <Clock size={16} />
                    {translations.questionCount?.[language] || 'Question Count'}
                  </h4>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button 
                      onClick={() => handleQuestionCountSelect(5)} 
                      variant={selectedQuestionCount === 5 ? "default" : "outline"}
                      className={selectedQuestionCount === 5 ? "bg-primary hover:bg-primary/90" : ""}
                    >
                      5 {translations.questions?.[language] || 'Questions'}
                    </Button>
                    <Button 
                      onClick={() => handleQuestionCountSelect(8)} 
                      variant={selectedQuestionCount === 8 ? "default" : "outline"}
                      className={selectedQuestionCount === 8 ? "bg-primary hover:bg-primary/90" : ""}
                    >
                      8 {translations.questions?.[language] || 'Questions'}
                    </Button>
                    <Button 
                      onClick={() => handleQuestionCountSelect(10)} 
                      variant={selectedQuestionCount === 10 ? "default" : "outline"}
                      className={selectedQuestionCount === 10 ? "bg-primary hover:bg-primary/90" : ""}
                    >
                      10 {translations.questions?.[language] || 'Questions'}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-center font-medium mb-2 flex items-center justify-center gap-1">
                    <Timer size={16} />
                    {translations.timePerQuestion?.[language] || 'Time Per Question'}
                  </h4>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button 
                      onClick={() => handleTimeLimitSelect(10)} 
                      variant={selectedTimeLimit === 10 ? "default" : "outline"}
                      className={selectedTimeLimit === 10 ? "bg-primary hover:bg-primary/90" : ""}
                    >
                      10 {translations.seconds?.[language] || 'Seconds'}
                    </Button>
                    <Button 
                      onClick={() => handleTimeLimitSelect(20)} 
                      variant={selectedTimeLimit === 20 ? "default" : "outline"}
                      className={selectedTimeLimit === 20 ? "bg-primary hover:bg-primary/90" : ""}
                    >
                      20 {translations.seconds?.[language] || 'Seconds'}
                    </Button>
                    <Button 
                      onClick={() => handleTimeLimitSelect(30)} 
                      variant={selectedTimeLimit === 30 ? "default" : "outline"}
                      className={selectedTimeLimit === 30 ? "bg-primary hover:bg-primary/90" : ""}
                    >
                      30 {translations.seconds?.[language] || 'Seconds'}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex flex-col items-center pb-6 relative z-10">
          <p className="text-sm text-muted-foreground italic mt-4">
            {translations.selectCategory?.[language] || 'Select a category to start your quiz journey!'}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
