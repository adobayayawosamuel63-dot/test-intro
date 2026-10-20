import { lessons } from "../data/lessons";
import type { Lesson, Term } from "../data/lessons";

export type BuiltQuestion = {
  id: string;
  lessonId: string;
  lessonLabel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explain?: string;
};

export type Answer = {
  question: BuiltQuestion;
  /** -1 quand le temps est écoulé */
  chosen: number;
  correct: boolean;
  points: number;
};

function shuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function norm(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.。]+$/, "");
}

/** Évite les doublons et les réponses qui contiennent la bonne réponse (ou l'inverse). */
function conflicts(a: string, b: string) {
  const na = norm(a);
  const nb = norm(b);
  return na === nb || na.includes(nb) || nb.includes(na);
}

const ALL_MEANINGS: string[] = lessons.flatMap((l) => (l.terms ?? []).map((t) => t.m));

function pickDistractors(term: Term, lesson: Lesson, count: number): string[] {
  const picked: string[] = [];
  const taken = new Set<string>([norm(term.m)]);

  const push = (candidate?: string) => {
    if (!candidate || picked.length >= count) return;
    const key = norm(candidate);
    if (taken.has(key)) return;
    if (conflicts(candidate, term.m)) return;
    taken.add(key);
    picked.push(candidate);
  };

  for (const candidate of term.d ?? []) push(candidate);

  const siblings = (lesson.terms ?? []).filter((t) => t !== term).map((t) => t.m);
  for (const candidate of shuffle(siblings)) push(candidate);

  for (const candidate of shuffle(ALL_MEANINGS)) push(candidate);

  // Filet de sécurité : on complète avec n'importe quel sens restant.
  for (const candidate of shuffle(ALL_MEANINGS)) {
    if (picked.length >= count) break;
    if (taken.has(norm(candidate))) continue;
    taken.add(norm(candidate));
    picked.push(candidate);
  }

  return picked.slice(0, count);
}

function shuffleOptions(correct: string, distractors: string[]) {
  const options = shuffle([correct, ...distractors]);
  return { options, correctIndex: options.indexOf(correct) };
}

function buildTermQuestion(term: Term, lesson: Lesson, index: number): BuiltQuestion {
  const distractors = pickDistractors(term, lesson, 3);
  const { options, correctIndex } = shuffleOptions(term.m, distractors);
  return {
    id: `${lesson.id}-t${index}`,
    lessonId: lesson.id,
    lessonLabel: lesson.n,
    question: `Que signifie « ${term.t} » en parabole ?`,
    options,
    correctIndex,
  };
}

export function buildQuestions(lessonIds: string[]): BuiltQuestion[] {
  const selected = lessons.filter((l) => lessonIds.includes(l.id));

  const questions: BuiltQuestion[] = [];

  for (const lesson of selected) {
    (lesson.terms ?? []).forEach((term, index) => {
      questions.push(buildTermQuestion(term, lesson, index));
    });

    (lesson.quiz ?? []).forEach((item, index) => {
      const [correct, ...distractors] = item.options;
      const built = shuffleOptions(correct, distractors);
      questions.push({
        id: `${lesson.id}-q${index}`,
        lessonId: lesson.id,
        lessonLabel: lesson.n,
        question: item.q,
        options: built.options,
        correctIndex: built.correctIndex,
        explain: item.explain,
      });
    });
  }

  return shuffle(questions);
}

export function shuffleList<T>(items: T[]): T[] {
  return shuffle(items);
}
