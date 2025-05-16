
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { toast } = useToast();

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme") as "light" | "dark" | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    
    toast({
      description: `Theme changed to ${newTheme} mode`,
      className: `${newTheme === "dark" ? "bg-secondary" : "bg-accent"} border-primary/20`,
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="fixed top-4 right-4 rounded-full w-10 h-10 z-50 hover:bg-primary/10 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 animate-fade-in" />
      ) : (
        <Sun className="h-5 w-5 animate-fade-in" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
