import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { QuizQuestion } from "@/data/quizQuestions"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fisher-Yates shuffle algorithm
export function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Get a random subset of questions by category
export function getRandomQuestions(
  allQuestions: QuizQuestion[],
  count: number = 5,
  category?: "technical" | "non-technical" | "general" | "programming" | "all"
): QuizQuestion[] {
  // Filter questions by category if specified
  let filteredQuestions = allQuestions;
  if (category && category !== "all") {
    filteredQuestions = allQuestions.filter(q => q.category === category);
  }
  
  // If we don't have enough questions in the category, return all we have
  if (filteredQuestions.length <= count) {
    return shuffle([...filteredQuestions]);
  }
  
  // Otherwise return a random subset
  const shuffledQuestions = shuffle([...filteredQuestions]);
  return shuffledQuestions.slice(0, count);
}
