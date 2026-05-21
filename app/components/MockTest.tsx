"use client";

import { useState } from "react";
import { questions } from "../data/questions";

function getRandomQuestions() {
  return [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
}

const failureLines = [
  "Critical academic damage detected.",
  "MPSC did not attack you. You attacked yourself.",
  "The Constitution fought harder than expected.",
];

const averageLines = [
  "You survived. Barely.",
  "Not bad. Not good. Very human.",
  "Revise before becoming overconfident.",
];

const successLines = [
  "Operator promoted. MPSC fears your existence.",
  "Scholar mode activated.",
  "High command approves this performance.",
];

export default function MockTest() {
  const [quizQuestions, setQuizQuestions] = useState(getRandomQuestions);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const currentQuestion = quizQuestions[current];

  function handleAnswer(option: string) {
    if (selected) return;

    setSelected(option);

    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  }

  function nextQuestion() {
    if (current + 1 < quizQuestions.length) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function restartQuiz() {
    setQuizQuestions(getRandomQuestions());
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  const resultLine =
    score <= 2
      ? failureLines[Math.floor(Math.random() * failureLines.length)]
      : score <= 3
      ? averageLines[Math.floor(Math.random() * averageLines.length)]
      : successLines[Math.floor(Math.random() * successLines.length)];

  if (finished) {
    return (
      <div className="rounded-2xl border border-green-400 bg-black/60 p-6">
        <p className="text-sm font-bold text-green-400">
          GENESIS MOCK TERMINAL
        </p>

        <h2 className="mt-2 text-4xl font-bold text-cyan-300">
          Score: {score}/{quizQuestions.length}
        </h2>

        <p className="mt-4 text-white font-semibold">{resultLine}</p>

        <button
          onClick={restartQuiz}
          className="mt-6 rounded-xl border border-cyan-300 px-5 py-3 text-cyan-200 hover:bg-cyan-400/20"
        >
          Restart Mock Test
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-cyan-400/70 bg-black/60 p-6 shadow-[0_0_25px_rgba(34,211,238,0.35)]">
      <p className="text-sm font-bold text-green-400">MPSC ASPIRANT MODE</p>

      <h2 className="mt-2 text-4xl font-bold text-cyan-300">
        Genesis Mock Terminal TEST 999
      </h2>

      <p className="mt-2 text-white">
        Question {current + 1} of {quizQuestions.length} •{" "}
        {currentQuestion.category}
      </p>

      <div className="mt-6 rounded-xl border border-white/30 p-5">
        <h3 className="text-xl font-bold text-white">
          {currentQuestion.question}
        </h3>

        <div className="mt-5 space-y-3">
          {currentQuestion.options.map((option: string) => {
            const isCorrect = option === currentQuestion.answer;
            const isSelected = option === selected;

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`block w-full rounded-xl border px-4 py-3 text-left transition ${
                  selected
                    ? isCorrect
                      ? "border-green-400 bg-green-400/20 text-green-200"
                      : isSelected
                      ? "border-red-400 bg-red-400/20 text-red-200"
                      : "border-white/20 text-white/60"
                    : "border-white/40 text-white hover:bg-cyan-400/20"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selected && (
          <div className="mt-5 rounded-xl border border-cyan-300/40 bg-cyan-300/10 p-4">
            <p className="font-bold text-cyan-200">
              Correct Answer: {currentQuestion.answer}
            </p>

            <p className="mt-2 text-sm text-white/80">
              {currentQuestion.explanation}
            </p>

            <button
              onClick={nextQuestion}
              className="mt-4 rounded-xl border border-cyan-300 px-5 py-2 text-cyan-200 hover:bg-cyan-400/20"
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}