import { useMemo, useState } from "react";
import { questions, Question } from "../data/questions";

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function MockTest() {
  const [questionPool, setQuestionPool] = useState<Question[]>(() =>
    shuffle(questions)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const currentQuestion = questionPool[currentIndex];

  const categories = useMemo(() => {
    return Array.from(new Set(questions.map((q) => q.category)));
  }, []);

  function handleAnswer(option: string) {
    if (selectedAnswer) return;

    setSelectedAnswer(option);
    setAnsweredCount((prev) => prev + 1);

    if (option === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  }

  function nextQuestion() {
    const nextIndex = currentIndex + 1;

    if (nextIndex < questionPool.length) {
      setCurrentIndex(nextIndex);
      setSelectedAnswer(null);
      return;
    }

    setQuestionPool(shuffle(questions));
    setCurrentIndex(0);
    setSelectedAnswer(null);
  }

  function resetQuiz() {
    setQuestionPool(shuffle(questions));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnsweredCount(0);
  }

  if (!currentQuestion) {
    return (
      <div style={{ padding: "40px", color: "white" }}>
        No questions found.
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "24px",
        color: "white"
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>Genesis Mock Test</h1>

      <p>
        Score: {score} / {answeredCount}
      </p>

      <p>
        Question {currentIndex + 1} of {questionPool.length}
      </p>

      <p>
        <strong>Category:</strong> {currentQuestion.category}
      </p>

      <p>
        <strong>Difficulty:</strong> {currentQuestion.difficulty}
      </p>

      <p
        style={{
          opacity: 0.7,
          fontSize: "14px",
          marginBottom: "20px"
        }}
      >
        Categories: {categories.join(", ")}
      </p>

      <div
        style={{
          background: "#111827",
          padding: "24px",
          borderRadius: "14px",
          border: "1px solid #333"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          {currentQuestion.question}
        </h2>

        <div
          style={{
            display: "grid",
            gap: "12px"
          }}
        >
          {currentQuestion.options.map((option) => {
            const isCorrect =
              option === currentQuestion.correctAnswer;

            const isSelected =
              selectedAnswer === option;

            let background = "#1f2937";

            if (selectedAnswer && isCorrect) {
              background = "#14532d";
            }

            if (
              selectedAnswer &&
              isSelected &&
              !isCorrect
            ) {
              background = "#7f1d1d";
            }

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  border: "1px solid #444",
                  background,
                  color: "white",
                  cursor: selectedAnswer
                    ? "not-allowed"
                    : "pointer",
                  textAlign: "left",
                  fontSize: "16px"
                }}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selectedAnswer && (
          <div
            style={{
              marginTop: "24px",
              padding: "18px",
              borderRadius: "10px",
              background: "#0f172a",
              border: "1px solid #333"
            }}
          >
            <h3>
              {selectedAnswer ===
              currentQuestion.correctAnswer
                ? "Correct ✅"
                : "Wrong ❌"}
            </h3>

            <p>
              <strong>Correct Answer:</strong>{" "}
              {currentQuestion.correctAnswer}
            </p>

            <p>{currentQuestion.explanation}</p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px"
              }}
            >
              <button
                onClick={nextQuestion}
                style={{
                  padding: "12px 20px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Next Question
              </button>

              <button
                onClick={resetQuiz}
                style={{
                  padding: "12px 20px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Reset Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}