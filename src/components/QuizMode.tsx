import { useEffect, useMemo, useState } from "react";
import { buildQuestions } from "../lib/quiz";
import type { BuiltQuestion } from "../lib/quiz";
import type { Answer } from "../lib/quiz";
import { playCorrect, playFinish, playWrong } from "../lib/sound";
import { saveBestQuiz } from "../lib/storage";
import { QuizResults } from "./Results";

export const TIME_LIMIT = 20;
const COLORS = ["red", "blue", "yellow", "green"];
const SHAPES = ["▲", "◆", "●", "■"];

type Props = {
  lessonIds: string[];
  onExit: () => void;
  onRecordScore: (score: number) => void;
};

export default function QuizMode({ lessonIds, onExit, onRecordScore }: Props) {
  const [round, setRound] = useState(0);
  const questions = useMemo(() => buildQuestions(lessonIds), [lessonIds, round]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [lastPoints, setLastPoints] = useState(0);
  const [finished, setFinished] = useState(false);

  const question: BuiltQuestion | undefined = questions[index];
  const isLast = index === questions.length - 1;

  useEffect(() => {
    if (finished || selected !== null) return;
    const id = window.setInterval(() => {
      setTimeLeft((t) => Math.max(0, Math.round((t - 0.1) * 10) / 10));
    }, 100);
    return () => window.clearInterval(id);
  }, [finished, selected, index]);

  const answer = (choice: number) => {
    if (!question || selected !== null || finished) return;
    const correct = choice === question.correctIndex;
    const points = correct
      ? Math.round(600 + 400 * (timeLeft / TIME_LIMIT)) + Math.min(streak, 4) * 50
      : 0;

    setSelected(choice);
    setLastPoints(points);
    setAnswers((prev) => [...prev, { question, chosen: choice, correct, points }]);

    if (correct) {
      setScore((s) => s + points);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setBestStreak((b) => Math.max(b, nextStreak));
      playCorrect();
    } else {
      setStreak(0);
      playWrong();
    }
  };

  useEffect(() => {
    if (!finished && selected === null && question && timeLeft === 0) {
      answer(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, selected, finished, question]);

  const next = () => {
    if (isLast) {
      setFinished(true);
      saveBestQuiz(score, questions.length);
      onRecordScore(score);
      playFinish();
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setTimeLeft(TIME_LIMIT);
    setLastPoints(0);
  };

  const restart = () => {
    setRound((r) => r + 1);
    setIndex(0);
    setSelected(null);
    setTimeLeft(TIME_LIMIT);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setAnswers([]);
    setLastPoints(0);
    setFinished(false);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (finished) return;
      if (selected === null) {
        const n = Number(event.key);
        if (n >= 1 && n <= 4) {
          event.preventDefault();
          answer(n - 1);
        }
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (finished) {
    return (
      <div className="screen">
        <QuizResults
          score={score}
          answers={answers}
          bestStreak={bestStreak}
          onRestart={restart}
          onExit={onExit}
        />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="screen">
        <p>Aucune question pour cette sélection.</p>
        <button type="button" className="btn btn-primary" onClick={onExit}>
          Retour
        </button>
      </div>
    );
  }

  const timerRatio = Math.max(0, Math.min(1, timeLeft / TIME_LIMIT));
  const urgent = timeLeft <= 5 && selected === null;

  return (
    <div className="screen">
      <header className="quiz-top">
        <button type="button" className="icon-btn" onClick={onExit} aria-label="Quitter">
          ✕
        </button>
        <span className="quiz-count">
          Question <strong>{index + 1}</strong> / {questions.length}
        </span>
        <span className="score-pill">{score.toLocaleString("fr-FR")} pts</span>
      </header>

      <div className={`timer-track${urgent ? " is-urgent" : ""}`}>
        <div className="timer-fill" style={{ width: `${timerRatio * 100}%` }} />
      </div>
      <div className="timer-meta">
        <span>{Math.ceil(timeLeft)} s</span>
        {streak >= 2 && <span className="streak">🔥 série ×{streak}</span>}
      </div>

      <main className="quiz-body">
        <p className="lesson-tag">{question.lessonLabel}</p>
        <h2 className="question">{question.question}</h2>

        <div className="tiles">
          {question.options.map((option, i) => {
            let state = "";
            if (selected !== null) {
              if (i === question.correctIndex) state = "is-correct";
              else if (i === selected) state = "is-wrong";
              else state = "is-dim";
            }
            return (
              <button
                key={`${question.id}-${i}`}
                type="button"
                className={`tile ${COLORS[i % 4]} ${state}`}
                onClick={() => answer(i)}
                disabled={selected !== null}
              >
                <span className="shape" aria-hidden="true">
                  {SHAPES[i % 4]}
                </span>
                <span className="tile-text">{option}</span>
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className={`feedback ${selected === question.correctIndex ? "ok" : "ko"}`}>
            <div className="feedback-head">
              <span className="feedback-title">
                {selected === question.correctIndex
                  ? "Bonne réponse !"
                  : selected === -1
                    ? "Temps écoulé"
                    : "Raté"}
              </span>
              {selected === question.correctIndex && lastPoints > 0 && (
                <span className="gained">+{lastPoints} pts</span>
              )}
            </div>
            <p className="feedback-answer">
              {question.options[question.correctIndex]}
            </p>
            {question.explain && <p className="feedback-note">{question.explain}</p>}
            <button type="button" className="btn btn-primary" onClick={next} autoFocus>
              {isLast ? "Voir mon score" : "Suivant"} →
            </button>
          </div>
        )}
      </main>

      <p className="keyboard-hint">
        Touches <kbd>1</kbd>–<kbd>4</kbd> pour répondre · <kbd>Entrée</kbd> pour continuer
      </p>
    </div>
  );
}
