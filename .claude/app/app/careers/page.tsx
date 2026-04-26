"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, RefreshCw, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCareerMatches, getQuizAnswers } from "@/lib/quiz-store";
import { CareerMatch, SimilarProfile, QuizAnswers } from "@/lib/types";
import { cn } from "@/lib/utils";

// ── Skeleton ──────────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <div className="flex flex-col gap-3 border-b py-6" style={{ borderColor: "var(--border)" }}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="skeleton h-5 w-48 rounded" />
          <div className="skeleton h-3 w-24 rounded" />
        </div>
        <div className="skeleton h-8 w-16 rounded" />
      </div>
      <div className="skeleton h-2 w-full rounded-full" />
      <div className="skeleton h-3 w-3/4 rounded" />
    </div>
  );
}

// ── Match Bar ─────────────────────────────────────────────────────────────────

function MatchBar({ score, index }: { score: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const color = score >= 80 ? "#6BCB77" : score >= 65 ? "var(--accent)" : "var(--muted)";

  return (
    <div ref={ref} className="relative h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "var(--border)" }}>
      <motion.div
        className="absolute left-0 top-0 h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${score}%` } : { width: 0 }}
        transition={{ duration: 1.1, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

// ── Career Row ────────────────────────────────────────────────────────────────

function CareerRow({ match, index }: { match: CareerMatch; index: number }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const scoreColor = match.matchScore >= 80 ? "#6BCB77" : match.matchScore >= 65 ? "var(--accent)" : "var(--muted)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer border-b py-6 transition-all"
      style={{ borderColor: "var(--border)" }}
      onClick={() => router.push(`/survey/${match.careerId}`)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base font-bold tracking-tight md:text-lg">{match.careerName}</h3>
          <div className="flex flex-wrap gap-2">
            {match.highlights.map((h, i) => (
              <span key={i} className="rounded-full border px-2.5 py-0.5 text-xs"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
                {h}
              </span>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end">
          <span className="font-mono text-2xl font-bold tabular-nums leading-none md:text-3xl" style={{ color: scoreColor }}>
            {match.matchScore}
            <span className="text-base font-normal" style={{ color: scoreColor, opacity: 0.7 }}>%</span>
          </span>
        </div>
      </div>

      <div className="mt-4">
        <MatchBar score={match.matchScore} index={index} />
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{match.reason}</p>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
          className="flex shrink-0 items-center gap-1 text-xs font-semibold"
          style={{ color: "var(--accent)" }}
        >
          Validate <ArrowRight size={12} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── People Like You ───────────────────────────────────────────────────────────

function PeopleLikeYou({ quizAnswers }: { quizAnswers: QuizAnswers }) {
  const [profiles, setProfiles] = useState<SimilarProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/similar-profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quizAnswers),
    })
      .then((r) => r.json())
      .then((d) => setProfiles(d.profiles ?? []))
      .catch(() => setProfiles([]))
      .finally(() => setLoading(false));
  }, [quizAnswers]);

  if (!loading && profiles.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-12 mb-2"
    >
      <div className="mb-5 flex items-center gap-2">
        <Users size={14} style={{ color: "var(--muted)" }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
          People with similar profiles
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-32 rounded-xl" />
            ))
          : profiles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.7 }}
                className="rounded-xl border p-4 flex flex-col gap-3"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-black"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    {p.displayName}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate">{p.city}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span
                        className="font-mono text-xs font-bold"
                        style={{ color: p.similarity >= 70 ? "#6BCB77" : p.similarity >= 50 ? "var(--accent)" : "var(--muted)" }}
                      >
                        {p.similarity}%
                      </span>
                      <span className="text-xs" style={{ color: "var(--subtle)" }}>similar</span>
                    </div>
                  </div>
                </div>

                {(p.sharedInterests.length > 0 || p.sharedStrengths.length > 0) && (
                  <div className="flex flex-wrap gap-1">
                    {[...p.sharedInterests, ...p.sharedStrengths].slice(0, 3).map((tag, j) => (
                      <span key={j} className="rounded-full border px-2 py-0.5 text-[10px]"
                        style={{ borderColor: "var(--border)", color: "var(--subtle)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-1.5 pt-1 border-t" style={{ borderColor: "var(--border)" }}>
                  <ArrowRight size={10} style={{ color: "var(--accent)" }} />
                  <span className="text-xs font-medium truncate" style={{ color: "var(--foreground)" }}>
                    {p.topCareer}
                  </span>
                </div>
              </motion.div>
            ))}
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function CareersPage() {
  const router = useRouter();
  const [matches, setMatches] = useState<CareerMatch[] | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);

  useEffect(() => {
    const stored = getCareerMatches();
    const answers = getQuizAnswers();

    if (!stored || !answers) {
      router.replace("/quiz");
      return;
    }

    setMatches(stored);
    setQuizAnswers(answers);

    // Fire-and-forget: save profile to Firebase
    fetch("/api/save-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        interests: answers.interests,
        strengths: answers.strengths,
        workStyle: answers.workStyle,
        environment: answers.environment,
        topCareers: stored.slice(0, 3).map((m) => m.careerId),
        voiceTranscript: answers.voiceTranscript,
      }),
    }).catch(() => {});
  }, [router]);

  return (
    <div className="min-h-[100dvh] px-6 py-8 md:px-10 lg:px-20" style={{ backgroundColor: "var(--background)" }}>
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-2 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold tracking-widest uppercase" style={{ color: "var(--foreground)", opacity: 0.5 }}>
            Prisma
          </Link>
          <Link href="/quiz" className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-80"
            style={{ color: "var(--muted)" }}>
            <RefreshCw size={12} />
            Retake quiz
          </Link>
        </div>

        {/* Title */}
        <div className="mt-10 mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            Your Career Matches
          </motion.h1>
          {quizAnswers && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-2 text-sm"
              style={{ color: "var(--muted)" }}
            >
              Based on: {quizAnswers.interests.join(", ")} · {quizAnswers.workStyle} · {quizAnswers.environment}
              {quizAnswers.voiceTranscript && (
                <span className="ml-1.5 rounded-full border px-2 py-0.5 text-xs"
                  style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
                  + voice
                </span>
              )}
            </motion.p>
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-2 text-xs"
          style={{ color: "var(--subtle)" }}
        >
          Click any career to run the 3-question validation survey
        </motion.p>

        {/* Match list */}
        {!matches
          ? Array.from({ length: 7 }).map((_, i) => <SkeletonRow key={i} />)
          : matches.map((match, i) => <CareerRow key={match.careerId} match={match} index={i} />)
        }

        {/* People Like You */}
        {quizAnswers && <PeopleLikeYou quizAnswers={quizAnswers} />}

        {/* Footer note */}
        {matches && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 text-xs"
            style={{ color: "var(--subtle)" }}
          >
            Scores are AI-generated estimates based on your profile. The survey refines them.
          </motion.p>
        )}
      </div>
    </div>
  );
}
