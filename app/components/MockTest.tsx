"use client";

import { useState } from "react";

const questions = [
  {
    category: "Geopolitics",
    question: "What does QUAD mainly focus on?",
    options: [
      "Indo-Pacific cooperation",
      "European Union expansion",
      "African Union reform",
      "Middle East oil pricing",
    ],
    answer: "Indo-Pacific cooperation",
  },
  {
    category: "Northeast India",
    question: "India’s Act East Policy is most connected with which region?",
    options: ["Europe", "Southeast Asia", "South America", "Central Asia"],
    answer: "Southeast Asia",
  },
  {
    category: "Mizoram / Border",
    question: "Which country shares an international border with Mizoram?",
    options: ["Nepal", "Myanmar", "Sri Lanka", "Pakistan"],
    answer: "Myanmar",
  },
  {
    category: "Cybersecurity",
    question: "Which habit improves basic cyber hygiene?",
    options: [
      "Using the same password everywhere",
      "Clicking unknown links",
      "Using two-factor authentication",
      "Sharing OTP with friends",
    ],
    answer: "Using two-factor authentication",
  },
  {
    category: "Current Affairs",
    question: "BRICS originally included Brazil, Russia, India, China and which country?",
    options: ["South Africa", "Japan", "Germany", "Indonesia"],
    answer: "South Africa",
  },
];

const failureLines = [
  "Critical academic damage detected.",
  "MPSC did not attack you. You attacked yourself.",
  "The Constitution fought harder than expected.",
  "Your brain requested emergency leave.",
  "Operator status: academically cooked but still alive.",
];

const averageLines = [
  "You survived. Barely.",
  "Not bad. Not good. Very human.",
  "MPSC noticed you, but did not fear you yet.",
  "The system says: revise before becoming overconfident.",
];

const successLines = [
  "Operator promoted. MPSC fears your existence.",
  "Scholar mode activated.",
  "The syllabus blinked first.",
  "High command approves this performance.",
];

export default function MockTest() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  function pickLine(lines: string[]) {
    return lines[Math.floor(Math.random() * lines.length)];
  }

  function handleAnswer(option: string) {
    if (selected) return;

    setSelected(option);

    if (option === q.answer) {
      setScore((prev) => prev + 1);
    }
  }

  function nextQuestion() {
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function resetTest() {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  function resultLine() {
    const percentage = (score / questions.length) * 100;

    if (percentage < 40) return pickLine(failureLines);
    if (percentage < 80) return pickLine(averageLines);
    return pickLine(successLines);
  }

  if (finished) {
    return (
      <section className="mt-8 border border-green-400 rounded-2xl p-6 bg-black">
        <p className="text-green-400 text-sm">GENESIS MOCK TERMINAL</p>

        <h2 className="text-4xl font-bold text-cyan-300 mt-2">
          Score: {score}/{questions.length}
        </h2>

        <p className="text-zinc-300 mt-4 text-lg">
          {resultLine()}
        </p>

        <button
          onClick={resetTest}
          className="mt-6 border border-cyan-400 text-cyan-300 px-4 py-2 rounded-xl hover:bg-cyan-950"
        >
          Restart Mock Test
        </button>
      </section>
    );
  }

  return (
    <section className="mt-8 border border-cyan-500 rounded-2xl p-6 bg-black">
      <p className="text-green-400 text-sm">MPSC ASPIRANT MODE</p>

      <h2 className="text-4xl font-bold text-cyan-300 mt-2">
        Genesis Mock Terminal
      </h2>

      <p className="text-zinc-400 mt-2">
        Question {current + 1} of {questions.length} • {q.category}
      </p>

      <div className="mt-6 border border-zinc-700 rounded-xl p-5">
        <p className="text-xl font-bold text-white">
          {q.question}
        </p>

        <div className="mt-5 grid gap-3">
          {q.options.map((option) => {
            const isCorrect = selected && option === q.answer;
            const isWrong = selected === option && option !== q.answer;

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`text-left border rounded-xl p-4 transition ${
                  isCorrect
                    ? "border-green-400 text-green-300"
                    : isWrong
                    ? "border-red-400 text-red-300"
                    : "border-zinc-700 text-zinc-200 hover:border-cyan-400"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selected && (
          <div className="mt-5">
            <p className="text-sm text-zinc-400">
              Correct answer:{" "}
              <span className="text-green-400">{q.answer}</span>
            </p>

            <button
              onClick={nextQuestion}
              className="mt-4 border border-green-400 text-green-300 px-4 py-2 rounded-xl hover:bg-green-950"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </section>
  );
}