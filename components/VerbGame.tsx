"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VerbEntry, VerbPerson, VerbTense } from "@/types";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { shuffleArray } from "@/lib/shuffle";

const PERSON_LABELS: Record<VerbPerson, string> = {
  eu: "eu",
  tu: "tu",
  voce: "ele/ela/você",
  nos: "nós",
  vos: "vós",
  eles: "eles/elas/vocês"
};

const TENSE_LABELS: Record<VerbTense, string> = {
  present: "Presente",
  preterite: "Pretérito Perfeito",
  imperfect: "Pretérito Imperfeito",
  future: "Futuro do Presente"
};

interface VerbGameProps {
  verbs: VerbEntry[];
  rounds?: number;
  onSessionComplete: (summary: {
    total: number;
    correct: number;
    incorrect: number;
    durationSeconds: number;
  }) => void;
}

interface Question {
  verb: VerbEntry;
  tense: VerbTense;
  person: VerbPerson;
  answer: string;
}

export function VerbGame({
  verbs,
  rounds = 8,
  onSessionComplete
}: VerbGameProps) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [input, setInput] = useState("");
  const [round, setRound] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    expected: string;
  } | null>(null);
  const [sessionStart, setSessionStart] = useState<number>(() => Date.now());
  const [isComplete, setIsComplete] = useState(false);

  const persons = useMemo(
    () => shuffleArray<VerbPerson>(["eu", "tu", "voce", "nos", "vos", "eles"]),
    []
  );

  const tenses = useMemo(
    () =>
      shuffleArray<VerbTense>(["present", "preterite", "imperfect", "future"]),
    []
  );

  const generateQuestion = useCallback((): Question => {
    const verb = shuffleArray(verbs)[0];
    const tense = shuffleArray(tenses)[0];
    const person = shuffleArray(persons)[0];
    return {
      verb,
      tense,
      person,
      answer: verb.conjugations[tense][person]
    };
  }, [verbs, persons, tenses]);

  useEffect(() => {
    setQuestion(generateQuestion());
  }, [generateQuestion]);

  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question) return;

    const isCorrect = normalize(input) === normalize(question.answer);
    setFeedback({ correct: isCorrect, expected: question.answer });
    setRound((prev) => prev + 1);
    if (isCorrect) {
      setCorrect((prev) => prev + 1);
    } else {
      setIncorrect((prev) => prev + 1);
    }

    setTimeout(() => {
      setFeedback(null);
      setInput("");

      if (round + 1 >= rounds) {
        const durationSeconds = Math.round(
          (Date.now() - sessionStart) / 1000
        );
        setIsComplete(true);
        onSessionComplete({
          total: rounds,
          correct: isCorrect ? correct + 1 : correct,
          incorrect: isCorrect ? incorrect : incorrect + 1,
          durationSeconds
        });
        return;
      }

      setQuestion(generateQuestion());
    }, 900);
  };

  const handleRestart = () => {
    setRound(0);
    setCorrect(0);
    setIncorrect(0);
    setInput("");
    setIsComplete(false);
    setSessionStart(Date.now());
    setQuestion(generateQuestion());
  };

  if (!question) {
    return (
      <div className="rounded-3xl bg-white/90 p-6 text-center shadow-card">
        Loading verbs...
      </div>
    );
  }

  if (isComplete) {
    return (
      <motion.div
        className="rounded-3xl bg-white/90 p-6 text-center shadow-card"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2 className="text-2xl font-semibold text-slate-900">
          Session complete!
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          You answered {correct} out of {rounds} correctly.
        </p>
        <div className="mt-6 grid gap-3 text-sm text-slate-700">
          <div className="rounded-2xl bg-primary-50/70 px-4 py-3">
            Accuracy: {Math.round((correct / rounds) * 100)}%
          </div>
          <div className="rounded-2xl bg-primary-50/70 px-4 py-3">
            Incorrect: {incorrect}
          </div>
        </div>
        <Button className="mt-6" onClick={handleRestart}>
          Practice again
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="rounded-3xl bg-white/90 p-6 shadow-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-primary-500">
            Verb challenge
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            {question.verb.infinitive}{" "}
            <span className="text-sm text-slate-500">
              ({question.verb.translation})
            </span>
          </h2>
        </div>
        <span className="text-sm text-slate-500">
          Round {round + 1} of {rounds}
        </span>
      </div>

      <div className="mt-6 grid gap-4">
        <div className="rounded-2xl bg-primary-50/80 px-4 py-3 text-sm text-primary-700">
          <p className="font-semibold">
            {TENSE_LABELS[question.tense]} · {PERSON_LABELS[question.person]}
          </p>
          <p className="text-xs text-primary-500">
            Type the correct conjugation in Portuguese.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            autoFocus
            label="Your answer"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Digite aqui..."
            required
          />
          <Button type="submit" className="w-full">
            Check answer
          </Button>
        </form>
        <AnimatePresence>
          {feedback && (
            <motion.div
              key={feedback.correct ? "correct" : "incorrect"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className={`rounded-2xl px-4 py-3 text-sm ${
                feedback.correct
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {feedback.correct ? (
                <p>Perfeito! Você acertou.</p>
              ) : (
                <p>
                  Quase! O correto é <strong>{feedback.expected}</strong>.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
