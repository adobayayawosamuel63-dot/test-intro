import type { Card } from "../data/lessons";

export type DiffPart = { text: string; state: "same" | "missing" | "extra" };

export type WriteResult = {
  card: Card;
  /** Part du texte de référence retrouvée (0 → 1) */
  ratio: number;
  /** Vrai si le texte est identique au caractère près (espaces et apostrophes typographiques exceptés) */
  exact: boolean;
  /** Vrai si seules les majuscules/minuscules diffèrent */
  caseOnly: boolean;
  skipped: boolean;
  answer: string;
};

const APOSTROPHES = /[\u2018\u2019\u2032\u00b4]/g;
const QUOTES = /[\u201c\u201d\u00ab\u00bb]/g;

/** Uniformise seulement ce qui ne se voit pas à l'écrit : espaces et apostrophes typographiques. */
export function normalize(value: string) {
  return value
    .normalize("NFC")
    .replace(APOSTROPHES, "'")
    .replace(QUOTES, '"')
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string) {
  const normalized = normalize(value);
  return normalized.length > 0 ? normalized.split(" ") : [];
}

const lower = (value: string) => value.toLocaleLowerCase("fr");

export function diffAnswers(reference: string, answer: string) {
  const refTokens = tokenize(reference);
  const gotTokens = tokenize(answer);
  const a = refTokens.map(lower);
  const b = gotTokens.map(lower);

  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp: number[][] = Array.from({ length: rows }, () => new Array<number>(cols).fill(0));

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const refParts: DiffPart[] = [];
  const gotParts: DiffPart[] = [];
  let i = a.length;
  let j = b.length;

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      refParts.unshift({ text: refTokens[i - 1], state: "same" });
      gotParts.unshift({ text: gotTokens[j - 1], state: "same" });
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      refParts.unshift({ text: refTokens[i - 1], state: "missing" });
      i--;
    } else {
      gotParts.unshift({ text: gotTokens[j - 1], state: "extra" });
      j--;
    }
  }
  while (i > 0) {
    refParts.unshift({ text: refTokens[i - 1], state: "missing" });
    i--;
  }
  while (j > 0) {
    gotParts.unshift({ text: gotTokens[j - 1], state: "extra" });
    j--;
  }

  const matched = refParts.filter((part) => part.state === "same").length;
  const ratio = refTokens.length > 0 ? matched / refTokens.length : 1;
  const normalizedRef = normalize(reference);
  const normalizedAnswer = normalize(answer);
  const exact = normalizedRef === normalizedAnswer;
  const caseOnly = !exact && lower(normalizedRef) === lower(normalizedAnswer);

  return { refParts, gotParts, ratio, exact, caseOnly };
}
