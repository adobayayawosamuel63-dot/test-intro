import { useEffect, useMemo, useRef, useState } from "react";
import { lessons } from "../data/lessons";
import type { Card } from "../data/lessons";
import { shuffleList } from "../lib/quiz";
import { diffAnswers } from "../lib/compare";
import type { DiffPart, WriteResult } from "../lib/compare";
import { playCorrect, playFinish, playWrong } from "../lib/sound";
import { WriteResults } from "./Results";

type Props = {
  lessonIds: string[];
  onExit: () => void;
};

function DiffText({ parts }: { parts: DiffPart[] }) {
  return (
    <p className="diff">
      {parts.map((part, i) =>
        part.state === "same" ? (
          <span key={i}>{part.text} </span>
        ) : (
          <mark key={i} className={part.state === "missing" ? "miss" : "extra"}>
            {part.text}{" "}
          </mark>
        ),
      )}
    </p>
  );
}

export default function WriteMode({ lessonIds, onExit }: Props) {
  const [round, setRound] = useState(0);
  const [customDeck, setCustomDeck] = useState<Card[] | null>(null);

  const baseDeck = useMemo(
    () => shuffleList(lessons.filter((l) => lessonIds.includes(l.id)).flatMap((l) => l.cards)),
    [lessonIds, round],
  );

  const deck = customDeck ?? baseDeck;

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState<WriteResult | null>(null);
  const [results, setResults] = useState<WriteResult[]>([]);
  const [finished, setFinished] = useState(false);

  const areaRef = useRef<HTMLTextAreaElement>(null);
  const card = deck[index];
  const lesson = card ? lessons.find((l) => l.cards.some((c) => c.id === card.id)) : undefined;
  const isLast = index === deck.length - 1;

  useEffect(() => {
    if (!checked) areaRef.current?.focus();
  }, [checked, index]);

  const record = (next: WriteResult) => {
    setChecked(next);
    setResults((prev) => [...prev, next]);
    if (next.exact) playCorrect();
    else playWrong();
  };

  const check = () => {
    if (!card || checked) return;
    const comparison = diffAnswers(card.a.join(" "), answer);
    record({
      card,
      ratio: comparison.ratio,
      exact: comparison.exact,
      caseOnly: comparison.caseOnly,
      skipped: false,
      answer,
    });
  };

  const skip = () => {
    if (!card || checked) return;
    record({ card, ratio: 0, exact: false, caseOnly: false, skipped: true, answer: "" });
  };

  const next = () => {
    if (isLast) {
      setFinished(true);
      playFinish();
      return;
    }
    setIndex((i) => i + 1);
    setChecked(null);
    setAnswer("");
  };

  const resetSession = (nextDeck: Card[] | null) => {
    setCustomDeck(nextDeck);
    setIndex(0);
    setChecked(null);
    setAnswer("");
    setResults([]);
    setFinished(false);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (finished) return;
      if (checked) {
        if (event.key === "Enter") {
          event.preventDefault();
          next();
        }
        return;
      }
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        check();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (finished) {
    return (
      <div className="screen">
        <WriteResults
          results={results}
          onRestart={() => {
            setRound((r) => r + 1);
            resetSession(null);
          }}
          onRetryMissed={() => resetSession(shuffleList(results.filter((r) => !r.exact).map((r) => r.card)))}
          onExit={onExit}
        />
      </div>
    );
  }

  if (!card) {
    return (
      <div className="screen">
        <p>Aucune fiche pour cette sélection.</p>
        <button type="button" className="btn btn-primary" onClick={onExit}>
          Retour
        </button>
      </div>
    );
  }

  const comparison = checked ? diffAnswers(card.a.join(" "), checked.answer) : null;
  const exactCount = results.filter((r) => r.exact).length;
  const verdict = !checked
    ? null
    : checked.exact
      ? { className: "ok", title: "Exact, au caractère près ✓" }
      : checked.caseOnly
        ? { className: "almost", title: "Exact, sauf les majuscules/minuscules" }
        : checked.ratio >= 0.85
          ? { className: "almost", title: "Presque : quelques écarts" }
          : { className: "ko", title: "À revoir" };

  return (
    <div className="screen">
      <header className="quiz-top">
        <button type="button" className="icon-btn" onClick={onExit} aria-label="Quitter">
          ✕
        </button>
        <span className="quiz-count">
          Fiche <strong>{index + 1}</strong> / {deck.length}
        </span>
        <span className="score-pill">✓ {exactCount}</span>
      </header>

      <div className="timer-track">
        <div className="timer-fill is-static" style={{ width: `${(index / deck.length) * 100}%` }} />
      </div>

      <main className="quiz-body">
        <p className="lesson-tag">{lesson?.n ?? "Révision"}</p>
        <h2 className="question">{card.q}</h2>

        {!checked && (
          <>
            <textarea
              ref={areaRef}
              className="write-box"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Écris la réponse exacte, avec la ponctuation…"
              spellCheck={false}
              rows={7}
            />
            <div className="write-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={check}
                disabled={answer.trim().length === 0}
              >
                Corriger <span className="kbd-inline">Ctrl</span>
                <span className="kbd-inline">↵</span>
              </button>
              <button type="button" className="btn btn-ghost" onClick={skip}>
                Je ne sais pas
              </button>
            </div>
            <p className="write-hint">
              Les espaces, retours à la ligne et apostrophes typographiques sont ignorés. La
              ponctuation et les majuscules, non.
            </p>
          </>
        )}

        {checked && comparison && verdict && (
          <>
            <div className={`verdict ${verdict.className}`}>
              <strong>{verdict.title}</strong>
              <span>
                {Math.round(checked.ratio * 100)} % du texte attendu retrouvé
              </span>
            </div>

            {!checked.skipped && (
              <section className="diff-block">
                <h3>Ta réponse</h3>
                <DiffText parts={comparison.gotParts} />
              </section>
            )}

            <section className="diff-block">
              <h3>Réponse exacte</h3>
              <DiffText parts={comparison.refParts} />
              {card.table && (
                <table className="answer-table">
                  <thead>
                    <tr>
                      {card.table.head.map((cell) => (
                        <th key={cell}>{cell}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {card.table.rows.map((row) => (
                      <tr key={row.join("|")}>
                        {row.map((cell) => (
                          <td key={cell}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>

            <button type="button" className="btn btn-primary btn-block" onClick={next} autoFocus>
              {isLast ? "Voir le bilan" : "Suivant"} →{" "}
              <span className="kbd-inline">↵</span>
            </button>
          </>
        )}
      </main>

      <p className="keyboard-hint">
        <kbd>Ctrl</kbd> + <kbd>Entrée</kbd> pour corriger · <kbd>Entrée</kbd> pour passer à la suite
      </p>
    </div>
  );
}
