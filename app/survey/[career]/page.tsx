"use client";

import { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCareerById } from "@/data/careers";
import { getCareerMatches, saveSurveyScore } from "@/lib/quiz-store";
import { cn } from "@/lib/utils";

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function SurveyPage({ params }: { params: Promise<{ career: string }> }) {
  const { career: careerId } = use(params);
  const router = useRouter();

  const career = getCareerById(careerId);
  const matches = getCareerMatches();
  const originalMatch = matches?.find((m) => m.careerId === careerId);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [dir, setDir] = useState(1);
  const [finished, setFinished] = useState(false);

  if (!career) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center" style={{ backgroundColor: "var(--background)" }}>
        <div className="text-center">
          <p className="text-sm" style={{ color: "var(--muted)" }}>Career not found.</p>
          <Link href="/careers" className="mt-4 block text-xs underline" style={{ color: "var(--accent)" }}>Back to careers</Link>
        </div>
      </div>
    );
  }

  const questions = career.surveyQuestions;
  const currentQ = questions[questionIndex];

  // Calculate adjusted score
  const baseScore = originalMatch?.matchScore ?? 70;
  const calcAdjusted = (ans: boolean[]): number => {
    let delta = 0;
    ans.forEach((yes, i) => {
      const w = questions[i]?.positiveWeight ?? 8;
      delta += yes ? w : -w * 0.6;
    });
    const raw = Math.round(baseScore + delta);
    return Math.max(30, Math.min(99, raw));
  };

  const adjustedScore = calcAdjusted(answers);

  const handleAnswer = (yes: boolean) => {
    const newAnswers = [...answers, yes];
    setAnswers(newAnswers);

    if (questionIndex < questions.length - 1) {
      setDir(1);
      setQuestionIndex((q) => q + 1);
    } else {
      const finalScore = calcAdjusted(newAnswers);
      saveSurveyScore(careerId, finalScore);
      setFinished(true);
    }
  };

  const goBack = () => {
    if (questionIndex === 0) {
      router.push("/careers");
      return;
    }
    setDir(-1);
    setAnswers((a) => a.slice(0, -1));
    setQuestionIndex((q) => q - 1);
  };

  const scoreColor =
    adjustedScore >= 80 ? "#6BCB77" : adjustedScore >= 65 ? "var(--accent)" : "var(--muted)";

  // Guard: if questionIndex goes out of bounds (e.g. rapid clicks), show result
  if (!finished && questionIndex >= questions.length) {
    const finalScore = calcAdjusted(answers);
    saveSurveyScore(careerId, finalScore);
    return (
      <ResultScreen
        careerId={careerId}
        careerName={career.name}
        adjustedScore={finalScore}
        originalScore={baseScore}
        scoreColor={finalScore >= 80 ? "#6BCB77" : finalScore >= 65 ? "var(--accent)" : "var(--muted)"}
      />
    );
  }

  if (finished) {
    return (
      <ResultScreen
        careerId={careerId}
        careerName={career.name}
        adjustedScore={adjustedScore}
        originalScore={baseScore}
        scoreColor={scoreColor}
      />
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col" style={{ backgroundColor: "var(--background)" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 md:px-10">
        <Link href="/careers" className="text-sm font-bold tracking-widest uppercase" style={{ color: "var(--foreground)", opacity: 0.5 }}>
          Prisma
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: "var(--muted)" }}>{career.name}</span>
          <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
            {questionIndex + 1} / {questions.length}
          </span>
        </div>
      </header>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 py-2">
        {questions.map((_, i) => (
          <motion.div
            key={i}
            animate={{ width: i === questionIndex ? 24 : 6, backgroundColor: i < questionIndex ? "var(--accent)" : i === questionIndex ? "var(--accent)" : "var(--border)" }}
            className="h-1.5 rounded-full"
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-10 md:px-10">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={questionIndex}
              custom={dir}
              initial={{ x: 40 * dir, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40 * dir, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              {/* Scenario */}
              <div
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>
                  Real-world scenario
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {currentQ.scenario}
                </p>
              </div>

              {/* Question */}
              <h2 className="text-2xl font-bold tracking-tight leading-snug md:text-3xl">
                {currentQ.question}
              </h2>

              {/* Answer buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleAnswer(true)}
                  className="group flex flex-col items-center justify-center gap-2 rounded-xl border py-8 text-sm font-bold transition-all duration-200 active:scale-[0.98] hover:scale-[1.01]"
                  style={{
                    borderColor: "var(--accent)",
                    color: "var(--accent)",
                    backgroundColor: "rgba(200,169,110,0.05)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(200,169,110,0.12)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(200,169,110,0.05)")}
                >
                  <span className="text-2xl font-black">Yes</span>
                  <span className="text-xs font-normal opacity-70">That sounds like me</span>
                </button>

                <button
                  onClick={() => handleAnswer(false)}
                  className="group flex flex-col items-center justify-center gap-2 rounded-xl border py-8 text-sm font-bold transition-all duration-200 active:scale-[0.98] hover:scale-[1.01]"
                  style={{
                    borderColor: "var(--border-hover)",
                    color: "var(--muted)",
                    backgroundColor: "var(--surface)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.color = "var(--foreground)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
                >
                  <span className="text-2xl font-black">No</span>
                  <span className="text-xs font-normal opacity-70">Not really me</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Back */}
          <button
            onClick={goBack}
            className="mt-6 flex items-center gap-1.5 text-xs transition-opacity hover:opacity-80"
            style={{ color: "var(--subtle)" }}
          >
            <ArrowLeft size={12} />
            {questionIndex === 0 ? "Back to careers" : "Previous question"}
          </button>
        </div>
      </main>
    </div>
  );
}

// ── Result Screen ─────────────────────────────────────────────────────────────

function ResultScreen({
  careerId,
  careerName,
  adjustedScore,
  originalScore,
  scoreColor,
}: {
  careerId: string;
  careerName: string;
  adjustedScore: number;
  originalScore: number;
  scoreColor: string;
}) {
  const router = useRouter();
  const delta = adjustedScore - originalScore;
  const deltaLabel = delta > 0 ? `+${delta}` : `${delta}`;
  const deltaColor = delta > 0 ? "#6BCB77" : delta < 0 ? "#F87171" : "var(--muted)";

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6 py-10" style={{ backgroundColor: "var(--background)" }}>
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <div className="rounded-2xl border p-8" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--muted)" }}>Validated Match Score</p>
            <div className="flex items-end justify-center gap-3">
              <span className="font-mono text-7xl font-black leading-none" style={{ color: scoreColor }}>
                {adjustedScore}
              </span>
              <span className="mb-2 text-2xl font-bold" style={{ color: scoreColor, opacity: 0.7 }}>%</span>
            </div>
            {delta !== 0 && (
              <div className="mt-3 flex items-center justify-center gap-1.5">
                <span className="text-xs" style={{ color: "var(--muted)" }}>Initial: {originalScore}%</span>
                <span className="font-mono text-xs font-bold" style={{ color: deltaColor }}>{deltaLabel} after survey</span>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">{careerName}</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              {adjustedScore >= 75
                ? "Strong fit. Your survey responses confirmed real alignment."
                : adjustedScore >= 60
                ? "Moderate fit. Worth exploring — some aspects may challenge you."
                : "Consider other options from your matches before committing to this path."}
            </p>
          </div>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={() => router.push(`/roadmap/${careerId}`)}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold transition-all active:scale-[0.98] hover:opacity-90"
              style={{ backgroundColor: "var(--accent)", color: "#000" }}
            >
              Build My Roadmap
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => router.push("/careers")}
              className="text-xs transition-opacity hover:opacity-80"
              style={{ color: "var(--muted)" }}
            >
              Explore other career matches
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
