import { lessons } from "../data/lessons";
import type { Card } from "../data/lessons";
import type { Answer } from "../lib/quiz";
import type { WriteResult } from "../lib/compare";

function accuracy(ok: number, total: number) {
  return total === 0 ? 0 : Math.round((ok / total) * 100);
}

function verdict(rate: number) {
  if (rate === 100) return { emoji: "🏆", text: "Sans faute ! Maîtrise totale." };
  if (rate >= 80) return { emoji: "🔥", text: "Excellent, tu maîtrises presque tout." };
  if (rate >= 60) return { emoji: "💪", text: "Bonne base — encore quelques révisions." };
  if (rate >= 40) return { emoji: "📖", text: "C’est un début. Relis les fiches et recommence." };
  return { emoji: "🌱", text: "Pas de panique : relis les réponses et retente." };
}

export function QuizResults({
  score,
  answers,
  bestStreak,
  onRestart,
  onExit,
}: {
  score: number;
  answers: Answer[];
  bestStreak: number;
  onRestart: () => void;
  onExit: () => void;
}) {
  const total = answers.length;
  const ok = answers.filter((a) => a.correct).length;
  const rate = accuracy(ok, total);
  const mood = verdict(rate);
  const missed = answers.filter((a) => !a.correct);

  return (
    <div className="results">
      <div className="result-hero">
        <span className="result-emoji">{mood.emoji}</span>
        <div className="result-score">
          <strong>{rate}%</strong>
          <span className="result-sub">
            {ok} / {total} bonnes réponses
          </span>
        </div>
        <p className="result-verdict">{mood.text}</p>
      </div>

      <div className="stat-row">
        <div className="stat">
          <span className="stat-value">{score.toLocaleString("fr-FR")}</span>
          <span className="stat-label">points</span>
        </div>
        <div className="stat">
          <span className="stat-value">{bestStreak}</span>
          <span className="stat-label">meilleure série</span>
        </div>
        <div className="stat">
          <span className="stat-value">{total - ok}</span>
          <span className="stat-label">à revoir</span>
        </div>
      </div>

      {missed.length > 0 ? (
        <section className="review">
          <h2>À revoir ({missed.length})</h2>
          <ul className="review-list">
            {missed.map((item) => (
              <li key={item.question.id} className="review-item">
                <p className="review-q">
                  <span className="review-tag">{item.question.lessonLabel}</span>
                  {item.question.question}
                </p>
                {item.chosen >= 0 ? (
                  <p className="review-wrong">Ta réponse : {item.question.options[item.chosen]}</p>
                ) : (
                  <p className="review-wrong">Temps écoulé</p>
                )}
                <p className="review-right">
                  ✓ {item.question.options[item.question.correctIndex]}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="perfect">Toutes les réponses sont justes. 🎉</p>
      )}

      <div className="actions">
        <button type="button" className="btn btn-primary" onClick={onRestart}>
          Rejouer
        </button>
        <button type="button" className="btn btn-ghost" onClick={onExit}>
          Changer de mode
        </button>
      </div>
    </div>
  );
}

export function WriteResults({
  results,
  onRestart,
  onRetryMissed,
  onExit,
}: {
  results: WriteResult[];
  onRestart: () => void;
  onRetryMissed: () => void;
  onExit: () => void;
}) {
  const total = results.length;
  const exact = results.filter((r) => r.exact).length;
  const missed = results.filter((r) => !r.exact);
  const rate = accuracy(exact, total);
  const mood = verdict(rate);
  const average =
    total > 0 ? Math.round((results.reduce((sum, r) => sum + r.ratio, 0) / total) * 100) : 0;

  return (
    <div className="results">
      <div className="result-hero">
        <span className="result-emoji">{mood.emoji}</span>
        <div className="result-score">
          <strong>{rate}%</strong>
          <span className="result-sub">
            {exact} / {total} réponses exactes
          </span>
        </div>
        <p className="result-verdict">{mood.text}</p>
      </div>

      <div className="stat-row">
        <div className="stat">
          <span className="stat-value">{exact}</span>
          <span className="stat-label">sans faute</span>
        </div>
        <div className="stat">
          <span className="stat-value">{average}%</span>
          <span className="stat-label">texte retrouvé</span>
        </div>
        <div className="stat">
          <span className="stat-value">{missed.length}</span>
          <span className="stat-label">à revoir</span>
        </div>
      </div>

      {missed.length > 0 ? (
        <section className="review">
          <h2>À revoir ({missed.length})</h2>
          <ul className="review-list">
            {missed.map((item) => (
              <li key={item.card.id} className="review-item">
                <p className="review-q">{item.card.q}</p>
                <p className="review-wrong">
                  {item.skipped
                    ? "Passée"
                    : `Correspondance : ${Math.round(item.ratio * 100)} %`}
                </p>
                <div className="review-answer">
                  {item.card.a.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="perfect">Toutes les réponses sont exactes. 🎉</p>
      )}

      <div className="actions">
        {missed.length > 0 && (
          <button type="button" className="btn btn-primary" onClick={onRetryMissed}>
            Revoir mes {missed.length} erreurs
          </button>
        )}
        <button type="button" className="btn btn-ghost" onClick={onRestart}>
          Tout refaire
        </button>
        <button type="button" className="btn btn-ghost" onClick={onExit}>
          Changer de mode
        </button>
      </div>
    </div>
  );
}

export function CardResults({
  known,
  unknown,
  onRestart,
  onRetryMissed,
  onExit,
}: {
  known: Card[];
  unknown: Card[];
  onRestart: () => void;
  onRetryMissed: () => void;
  onExit: () => void;
}) {
  const total = known.length + unknown.length;
  const rate = accuracy(known.length, total);
  const mood = verdict(rate);

  return (
    <div className="results">
      <div className="result-hero">
        <span className="result-emoji">{mood.emoji}</span>
        <div className="result-score">
          <strong>{rate}%</strong>
          <span className="result-sub">
            {known.length} / {total} cartes sues
          </span>
        </div>
        <p className="result-verdict">{mood.text}</p>
      </div>

      {unknown.length > 0 ? (
        <section className="review">
          <h2>À retravailler ({unknown.length})</h2>
          <ul className="review-list">
            {unknown.map((card) => {
              const lesson = lessons.find((l) => l.cards.some((c) => c.id === card.id));
              return (
                <li key={card.id} className="review-item">
                  <p className="review-q">
                    {lesson && <span className="review-tag">{lesson.n}</span>}
                    {card.q}
                  </p>
                  <div className="review-answer">
                    {card.a.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ) : (
        <p className="perfect">Toutes les cartes sues. 🎉</p>
      )}

      <div className="actions">
        {unknown.length > 0 && (
          <button type="button" className="btn btn-primary" onClick={onRetryMissed}>
            Revoir mes {unknown.length} erreurs
          </button>
        )}
        <button type="button" className="btn btn-ghost" onClick={onRestart}>
          Tout refaire
        </button>
        <button type="button" className="btn btn-ghost" onClick={onExit}>
          Changer de mode
        </button>
      </div>
    </div>
  );
}
