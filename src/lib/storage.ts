const KEYS = {
  bestQuiz: "biblequiz.best.quiz",
  bestCards: "biblequiz.best.cards",
  muted: "biblequiz.muted",
};

function read(key: string): number | null {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    const value = Number(raw);
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

function write(key: string, value: number) {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // stockage indisponible : on ignore
  }
}

export type BestQuizRecord = { score: number; count: number };

export function getBestQuiz(): BestQuizRecord | null {
  try {
    const raw = localStorage.getItem(KEYS.bestQuiz);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof (parsed as BestQuizRecord).score === "number" &&
      typeof (parsed as BestQuizRecord).count === "number"
    ) {
      return parsed as BestQuizRecord;
    }
  } catch {
    // valeur illisible : on ignore le record
  }
  return null;
}

/** Le record n'est remplacé que par un meilleur score, quelle que soit la longueur de la partie. */
export function saveBestQuiz(score: number, count: number) {
  if (score <= 0) return;
  const best = getBestQuiz();
  if (best === null || score > best.score) {
    try {
      localStorage.setItem(KEYS.bestQuiz, JSON.stringify({ score, count }));
    } catch {
      // stockage indisponible : on ignore
    }
  }
}

export function getBestCards() {
  return read(KEYS.bestCards);
}

export function saveBestCards(known: number, total: number) {
  const previous = getBestCards();
  const rate = total > 0 ? Math.round((known / total) * 100) : 0;
  if (previous === null || rate > previous) write(KEYS.bestCards, rate);
}

export function getMutedPreference() {
  return read(KEYS.muted) === 1;
}

export function saveMutedPreference(muted: boolean) {
  write(KEYS.muted, muted ? 1 : 0);
}
