import { lessons } from "../data/lessons";
import type { Mode } from "../App";
import type { BestQuizRecord } from "../lib/storage";

type Props = {
  onStart: (mode: Mode, lessonIds: string[]) => void;
  mode: Mode;
  selected: string[];
  onModeChange: (mode: Mode) => void;
  onToggleLesson: (id: string) => void;
  onSelectAll: () => void;
  bestQuiz: BestQuizRecord | null;
  bestCards: number | null;
  muted: boolean;
  onToggleMute: () => void;
};

function lessonQuestionCount(ids: string[]) {
  return lessons
    .filter((l) => ids.includes(l.id))
    .reduce((n, l) => n + (l.terms?.length ?? 0) + (l.quiz?.length ?? 0), 0);
}

function lessonCardCount(ids: string[]) {
  return lessons.filter((l) => ids.includes(l.id)).reduce((n, l) => n + l.cards.length, 0);
}

export default function Home({
  onStart,
  mode,
  selected,
  onModeChange,
  onToggleLesson,
  onSelectAll,
  bestQuiz,
  bestCards,
  muted,
  onToggleMute,
}: Props) {
  const allIds = lessons.map((l) => l.id);
  const activeIds = selected.length > 0 ? selected : allIds;
  const count = mode === "quiz" ? lessonQuestionCount(activeIds) : lessonCardCount(activeIds);
  const unit =
    mode === "quiz"
      ? count > 1
        ? "questions"
        : "question"
      : count > 1
        ? "fiches"
        : "fiche";

  const intro = lessons.filter((l) => l.id === "l1");
  const parables = lessons.filter((l) => l.id !== "l1");
  const totalQuizQuestions = lessons.reduce(
    (n, l) => n + (l.terms?.length ?? 0) + (l.quiz?.length ?? 0),
    0,
  );
  const totalCardCount = lessons.reduce((n, l) => n + l.cards.length, 0);

  const renderLesson = (id: string, n: string, title: string) => {
    const active = selected.includes(id);
    return (
      <button
        key={id}
        type="button"
        className={`lesson-chip${active ? " is-active" : ""}`}
        onClick={() => onToggleLesson(id)}
        aria-pressed={active}
      >
        <span className="lesson-n">{n}</span>
        <span className="lesson-t">{title}</span>
      </button>
    );
  };

  return (
    <div className="home">
      <header className="brand">
        <div className="logo">
          <span className="logo-mark">✦</span> Bible Quiz
        </div>
        <div className="brand-actions">
          {bestQuiz !== null && (
            <span className="best-pill">
              Record : {bestQuiz.score.toLocaleString("fr-FR")} pts · {bestQuiz.count}{" "}
              {bestQuiz.count > 1 ? "questions" : "question"}
            </span>
          )}
          {bestCards !== null && <span className="best-pill">Cartes : {bestCards} %</span>}
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleMute}
            title={muted ? "Activer le son" : "Couper le son"}
            aria-label={muted ? "Activer le son" : "Couper le son"}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      </header>

      <section className="hero">
        <p className="eyebrow">
          {totalCardCount} fiches · {totalQuizQuestions} questions de QCM
        </p>
        <h1>
          Teste-toi sur
          <br />
          les <span className="hl">paraboles</span> du royaume
        </h1>
        <p className="sub">
          Trois façons de réviser les réponses exactes du cours : QCM chronométré, cartes
          recto-verso, ou rédaction corrigée au caractère près.
        </p>
      </section>

      <section className="modes" role="radiogroup" aria-label="Mode de jeu">
        <button
          type="button"
          className={`mode-card${mode === "quiz" ? " is-active" : ""}`}
          onClick={() => onModeChange("quiz")}
          role="radio"
          aria-checked={mode === "quiz"}
        >
          <span className="mode-icon">⚡</span>
          <span className="mode-title">QCM chronométré</span>
          <span className="mode-desc">
            4 réponses possibles, 20 secondes, points selon la rapidité et la série.
          </span>
        </button>
        <button
          type="button"
          className={`mode-card${mode === "cards" ? " is-active" : ""}`}
          onClick={() => onModeChange("cards")}
          role="radio"
          aria-checked={mode === "cards"}
        >
          <span className="mode-icon">🃏</span>
          <span className="mode-title">Flashcards</span>
          <span className="mode-desc">
            Tu récites, tu révèles, tu t’auto-évalues. Idéal pour mémoriser les listes.
          </span>
        </button>
        <button
          type="button"
          className={`mode-card${mode === "write" ? " is-active" : ""}`}
          onClick={() => onModeChange("write")}
          role="radio"
          aria-checked={mode === "write"}
        >
          <span className="mode-icon">✍️</span>
          <span className="mode-title">Rédaction</span>
          <span className="mode-desc">
            Tu écris la réponse, l’app la compare au texte exact et montre chaque écart.
          </span>
        </button>
      </section>

      <section className="lessons">
        <div className="lessons-head">
          <h2>Réviser</h2>
          <button
            type="button"
            className="link-btn"
            onClick={onSelectAll}
            disabled={selected.length === 0}
          >
            Tout sélectionner
          </button>
        </div>

        <h3 className="group-title">Introduction</h3>
        <div className="lesson-grid">{intro.map((l) => renderLesson(l.id, l.n, l.title))}</div>

        <h3 className="group-title">Les paraboles du royaume des cieux</h3>
        <div className="lesson-grid">
          {parables.map((l) => renderLesson(l.id, l.n, l.title))}
        </div>
      </section>

      <div className="start-bar">
        <div
          className="start-info"
          aria-label={`${count} ${unit}`}
        >
          <strong>{count}</strong>
          <span>{unit}</span>
          {selected.length > 0 && (
            <span className="muted">
              · {selected.length} leçon{selected.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => onStart(mode, activeIds)}
        >
          {mode === "quiz"
            ? "Lancer le quiz"
            : mode === "cards"
              ? "Commencer les cartes"
              : "Commencer la rédaction"}{" "}
          →
        </button>
      </div>
    </div>
  );
}
