
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  category: "technical" | "non-technical" | "general" | "programming";
  difficulty: "easy" | "intermediate" | "hard";
}

const quizQuestions: QuizQuestion[] = [
  // Easy Questions
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: "Paris",
    category: "general",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    category: "general",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gl", "Au", "Ag"],
    correctAnswer: "Au",
    category: "general",
    difficulty: "easy"
  },
  {
    id: 4,
    question: "Which of these is NOT a programming language?",
    options: ["Java", "Python", "Cobra", "Electron"],
    correctAnswer: "Electron",
    category: "programming",
    difficulty: "easy"
  },
  {
    id: 5,
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Korea", "Japan", "Thailand"],
    correctAnswer: "Japan",
    category: "general",
    difficulty: "easy"
  },
  {
    id: 6,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci",
    category: "general",
    difficulty: "easy"
  },
  {
    id: 7,
    question: "Which of these is NOT one of the Seven Wonders of the Ancient World?",
    options: ["Great Pyramid of Giza", "Colosseum", "Hanging Gardens of Babylon", "Lighthouse of Alexandria"],
    correctAnswer: "Colosseum",
    category: "general",
    difficulty: "easy"
  },
  
  // Intermediate Questions
  {
    id: 8,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
    category: "general",
    difficulty: "intermediate"
  },
  {
    id: 9,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Osmium", "Oxygen", "Oganesson", "Orthosilicate"],
    correctAnswer: "Oxygen",
    category: "technical",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
    correctAnswer: "William Shakespeare",
    category: "general",
    difficulty: "intermediate"
  },
  {
    id: 11,
    question: "What is the tallest mountain in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
    correctAnswer: "Mount Everest",
    category: "general",
    difficulty: "intermediate"
  },
  {
    id: 12,
    question: "Which of these is not a primary color?",
    options: ["Red", "Blue", "Yellow", "Green"],
    correctAnswer: "Green",
    category: "general",
    difficulty: "intermediate"
  },
  {
    id: 13,
    question: "In what year did the Titanic sink?",
    options: ["1910", "1912", "1915", "1918"],
    correctAnswer: "1912",
    category: "general",
    difficulty: "intermediate"
  },
  {
    id: 14,
    question: "Which country is home to the kangaroo?",
    options: ["New Zealand", "South Africa", "Australia", "Argentina"],
    correctAnswer: "Australia",
    category: "general",
    difficulty: "intermediate"
  },
  
  // Hard Questions
  {
    id: 15,
    question: "Who is known as the father of modern physics?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
    correctAnswer: "Albert Einstein",
    category: "technical",
    difficulty: "hard"
  },
  {
    id: 16,
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "High-Level Text Machine Language", "HyperTransfer Markup Language", "Human Text Manipulation Language"],
    correctAnswer: "HyperText Markup Language",
    category: "programming",
    difficulty: "intermediate"
  },
  {
    id: 17,
    question: "Which of the following is a valid JavaScript data type?",
    options: ["integer", "character", "float", "undefined"],
    correctAnswer: "undefined",
    category: "programming",
    difficulty: "intermediate"
  },
  {
    id: 18,
    question: "What is the purpose of a firewall in computer security?",
    options: ["To prevent overheating", "To monitor and control network traffic", "To improve processing speed", "To optimize storage space"],
    correctAnswer: "To monitor and control network traffic",
    category: "technical",
    difficulty: "intermediate"
  },
  {
    id: 19,
    question: "What is the formula for water?",
    options: ["H2O2", "CO2", "H2O", "NaCl"],
    correctAnswer: "H2O",
    category: "technical",
    difficulty: "easy"
  },
  {
    id: 20,
    question: "What does 'OOP' stand for in programming?",
    options: ["Object-Oriented Programming", "Order Of Precedence", "Output Optimization Process", "Organized Output Protocol"],
    correctAnswer: "Object-Oriented Programming",
    category: "programming",
    difficulty: "intermediate"
  },
  
  // New Questions - Easy
  {
    id: 21,
    question: "What is the capital of India?",
    options: ["Mumbai", "Kolkata", "Chennai", "New Delhi"],
    correctAnswer: "New Delhi",
    category: "general",
    difficulty: "easy"
  },
  {
    id: 22,
    question: "Which river is considered the holiest in India?",
    options: ["Yamuna", "Godavari", "Ganga", "Brahmaputra"],
    correctAnswer: "Ganga",
    category: "general",
    difficulty: "easy"
  },
  {
    id: 23,
    question: "How many states are there in India?",
    options: ["28", "29", "30", "31"],
    correctAnswer: "28",
    category: "general",
    difficulty: "easy"
  },
  
  // New Questions - Intermediate
  {
    id: 24,
    question: "What is the national animal of India?",
    options: ["Lion", "Tiger", "Elephant", "Leopard"],
    correctAnswer: "Tiger",
    category: "general",
    difficulty: "intermediate"
  },
  {
    id: 25,
    question: "Which ancient Indian mathematician discovered the concept of zero?",
    options: ["Aryabhata", "Brahmagupta", "Bhaskara", "Varahamihira"],
    correctAnswer: "Brahmagupta",
    category: "technical",
    difficulty: "hard"
  },
  {
    id: 26,
    question: "In which year did India gain independence from British rule?",
    options: ["1945", "1947", "1950", "1952"],
    correctAnswer: "1947",
    category: "general",
    difficulty: "intermediate"
  },
  
  // New Questions - Hard
  {
    id: 27,
    question: "Which algorithm is used for finding the shortest path in a graph?",
    options: ["Bubble Sort", "Dijkstra's Algorithm", "Quick Sort", "Binary Search"],
    correctAnswer: "Dijkstra's Algorithm",
    category: "programming",
    difficulty: "hard"
  },
  {
    id: 28,
    question: "What is the time complexity of quicksort in the worst case?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctAnswer: "O(n²)",
    category: "programming",
    difficulty: "hard"
  },
  {
    id: 29,
    question: "Which principle is NOT part of SOLID programming principles?",
    options: ["Single Responsibility Principle", "Open-Closed Principle", "Dynamic Binding Principle", "Interface Segregation Principle"],
    correctAnswer: "Dynamic Binding Principle",
    category: "programming",
    difficulty: "hard"
  },
  {
    id: 30,
    question: "What is the name of the first satellite launched by India?",
    options: ["Bhaskara", "Rohini", "Aryabhata", "INSAT-1A"],
    correctAnswer: "Aryabhata",
    category: "technical",
    difficulty: "hard"
  }
];

export default quizQuestions;
