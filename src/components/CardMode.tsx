import { useEffect, useMemo, useState } from "react";
import { lessons } from "../data/lessons";
import type { Card } from "../data/lessons";
import { shuffleList } from "../lib/quiz";
import { playCorrect, playFinish, playWrong } from "../lib/sound";
import { saveBestCards } from "../lib/storage";
import { CardResults } from "./Results";

type Props = {
  lessonIds: string[];
  onExit: () => void;
  onRecordRate: (rate: number) => void;
};

export default function CardMode({ lessonIds, onExit, onRecordRate }: Props) {
  const [round, setRound] = useState(0);
  const [customDeck, setCustomDeck] = useState<Card[] | null>(null);

  const baseDeck = useMemo(
    () =>
      shuffleList(
        lessons.filter((l) => lessonIds.includes(l.id)).flatMap((l) => l.cards),
      ),
    [lessonIds, round],
  );

  const deck = customDeck ?? baseDeck;

  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [known, setKnown] = useState<Card[]>([]);
  const [unknown, setUnknown] = useState<Card[]>([]);
  const [finished, setFinished] = useState(false);

  const card = deck[index];
  const lesson = card
    ? lessons.find((l) => l.cards.some((c) => c.id === card.id))
    : undefined;

  const resetSession = (nextDeck: Card[] | null) => {
    setCustomDeck(nextDeck);
    setIndex(0);
    setRevealed(false);
    setKnown([]);
    setUnknown([]);
    setFinished(false);
  };

  const grade = (wasKnown: boolean) => {
    if (!card) return;
    if (wasKnown) {
      setKnown((prev) => [...prev, card]);
      playCorrect();
    } else {
      setUnknown((prev) => [...prev, card]);
      playWrong();
    }

    if (index + 1 >= deck.length) {
      setFinished(true);
      playFinish();
    } else {
      setIndex((i) => i + 1);
      setRevealed(false);
    }
  };

  useEffect(() => {
    if (!finished) return;
    const total = known.length + unknown.length;
    saveBestCards(known.length, total);
    onRecordRate(total > 0 ? Math.round((known.length / total) * 100) : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (finished) return;
      if (!revealed && (event.key === " " || event.key === "Enter")) {
        event.preventDefault();
        setRevealed(true);
        return;
      }
      if (revealed) {
        if (event.key === "1") {
          event.preventDefault();
          grade(false);
        }
        if (event.key === "2") {
          event.preventDefault();
          grade(true);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (finished) {
    return (
      <div className="screen">
        <CardResults
          known={known}
          unknown={unknown}
          onRestart={() => {
            setRound((r) => r + 1);
            resetSession(null);
          }}
          onRetryMissed={() => resetSession(shuffleList(unknown))}
          onExit={onExit}
        />
      </div>
    );
  }

  if (!card) {
    return (
      <div className="screen">
        <p>Aucune carte pour cette sélection.</p>
        <button type="button" className="btn btn-primary" onClick={onExit}>
          Retour
        </button>
      </div>
    );
  }

  const ratio = deck.length > 0 ? index / deck.length : 0;

  return (
    <div className="screen">
      <header className="quiz-top">
        <button type="button" className="icon-btn" onClick={onExit} aria-label="Quitter">
          ✕
        </button>
        <span className="quiz-count">
          Carte <strong>{index + 1}</strong> / {deck.length}
        </span>
        <span className="score-pill">
          ✓ {known.length} · ↺ {unknown.length}
        </span>
      </header>

      <div className="timer-track">
        <div className="timer-fill is-static" style={{ width: `${ratio * 100}%` }} />
      </div>

      <main className="quiz-body">
        <p className="lesson-tag">{lesson?.n ?? "Révision"}</p>
        <h2 className="question">{card.q}</h2>

        {!revealed ? (
          <button
            type="button"
            className="btn btn-primary btn-lg reveal-btn"
            onClick={() => setRevealed(true)}
          >
            Afficher la réponse
          </button>
        ) : (
          <>
            <div className="card-answer">
              {card.a.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
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
            </div>
            <div className="card-actions">
              <button type="button" className="btn btn-ko" onClick={() => grade(false)}>
                À revoir <span className="kbd-inline">1</span>
              </button>
              <button type="button" className="btn btn-ok" onClick={() => grade(true)}>
                Je savais <span className="kbd-inline">2</span>
              </button>
            </div>
          </>
        )}
      </main>

      <p className="keyboard-hint">
        <kbd>Espace</kbd> pour révéler · <kbd>1</kbd> à revoir · <kbd>2</kbd> je savais
      </p>
    </div>
  );
}
