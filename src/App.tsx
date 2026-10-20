import { useEffect, useState } from "react";
import Home from "./components/Home";
import QuizMode from "./components/QuizMode";
import CardMode from "./components/CardMode";
import WriteMode from "./components/WriteMode";
import { setMuted as setSoundMuted } from "./lib/sound";
import {
  getBestCards,
  getBestQuiz,
  getMutedPreference,
  saveMutedPreference,
} from "./lib/storage";
import type { BestQuizRecord } from "./lib/storage";

export type Mode = "quiz" | "cards" | "write";

type Session = {
  mode: Mode;
  lessonIds: string[];
};

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [mode, setMode] = useState<Mode>("quiz");
  const [selected, setSelected] = useState<string[]>([]);
  const [muted, setMuted] = useState(getMutedPreference());
  const [bestQuiz, setBestQuiz] = useState<BestQuizRecord | null>(getBestQuiz());
  const [bestCards, setBestCards] = useState<number | null>(getBestCards());

  useEffect(() => {
    setSoundMuted(muted);
    saveMutedPreference(muted);
  }, [muted]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [session]);

  const exit = () => {
    setBestQuiz(getBestQuiz());
    setBestCards(getBestCards());
    setSession(null);
  };

  const toggleLesson = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="app">
      {!session && (
        <Home
          onStart={(nextMode, lessonIds) => {
            setMode(nextMode);
            setSession({ mode: nextMode, lessonIds });
          }}
          mode={mode}
          selected={selected}
          onModeChange={setMode}
          onToggleLesson={toggleLesson}
          onSelectAll={() => setSelected([])}
          bestQuiz={bestQuiz}
          bestCards={bestCards}
          muted={muted}
          onToggleMute={() => setMuted((m) => !m)}
        />
      )}

      {session?.mode === "quiz" && (
        <QuizMode
          lessonIds={session.lessonIds}
          onExit={exit}
          onRecordScore={() => setBestQuiz(getBestQuiz())}
        />
      )}

      {session?.mode === "cards" && (
        <CardMode
          lessonIds={session.lessonIds}
          onExit={exit}
          onRecordRate={() => setBestCards(getBestCards())}
        />
      )}

      {session?.mode === "write" && (
        <WriteMode lessonIds={session.lessonIds} onExit={exit} />
      )}
    </div>
  );
}
