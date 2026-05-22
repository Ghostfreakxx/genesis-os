export type Question = {
  id: number;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export const questions: Question[] = [
  {
    id: 1,
    category: "Political Science",
    difficulty: "Easy",
    question: "Who wrote The Republic?",
    options: ["Plato", "Aristotle", "Locke", "Rousseau"],
    correctAnswer: "Plato",
    explanation: "The Republic was written by Plato."
  },

  {
    id: 2,
    category: "Indian Polity",
    difficulty: "Easy",
    question: "Who is known as the Father of the Indian Constitution?",
    options: ["Mahatma Gandhi", "B. R. Ambedkar", "Nehru", "Patel"],
    correctAnswer: "B. R. Ambedkar",
    explanation: "Ambedkar chaired the Drafting Committee."
  },

  {
    id: 3,
    category: "Science",
    difficulty: "Medium",
    question: "What planet is known as the Red Planet?",
    options: ["Mars", "Earth", "Venus", "Jupiter"],
    correctAnswer: "Mars",
    explanation: "Mars appears red because of iron oxide."
  },

  {
    id: 4,
    category: "History",
    difficulty: "Medium",
    question: "Who was the first President of India?",
    options: [
      "Rajendra Prasad",
      "Nehru",
      "Sardar Patel",
      "Abdul Kalam"
    ],
    correctAnswer: "Rajendra Prasad",
    explanation: "Rajendra Prasad became the first President in 1950."
  },

  {
    id: 5,
    category: "Geography",
    difficulty: "Easy",
    question: "Which is the largest ocean?",
    options: [
      "Pacific Ocean",
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean"
    ],
    correctAnswer: "Pacific Ocean",
    explanation: "The Pacific Ocean is the largest ocean on Earth."
  }
];