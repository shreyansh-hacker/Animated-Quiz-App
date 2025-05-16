
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export type AvailableLanguage = 'en' | 'es' | 'fr' | 'de' | 'hi' | 'bn' | 'te';

interface LanguageToggleProps {
  onLanguageChange?: (language: AvailableLanguage) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ onLanguageChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState<AvailableLanguage>('en');
  const { toast } = useToast();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'te', name: 'తెలుగు' },
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as AvailableLanguage;
    if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
      if (onLanguageChange) {
        onLanguageChange(savedLanguage);
      }
    }
  }, [onLanguageChange]);

  const handleLanguageChange = (language: AvailableLanguage) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
    
    if (onLanguageChange) {
      onLanguageChange(language);
    }
    
    toast({
      description: `Language changed to ${languages.find(l => l.code === language)?.name}`,
      className: "bg-accent/70 border-primary/20",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-4 right-16 rounded-full w-10 h-10 z-50 hover:bg-primary/10 transition-all duration-300"
        >
          <Languages className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-fade-in">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code as AvailableLanguage)}
            className={`${currentLanguage === language.code ? 'bg-accent/50' : ''} cursor-pointer`}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
