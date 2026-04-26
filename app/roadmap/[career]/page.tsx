"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { ExternalLink, MapPin, DollarSign, Calendar, BookOpen, Briefcase, GraduationCap, Zap } from "lucide-react";
import Link from "next/link";
import { getCareerById } from "@/data/careers";
import { getUniversitiesForCareer } from "@/data/universities";
import { getScholarshipsForCareer } from "@/data/scholarships";
import { getSurveyScores, getCareerMatches } from "@/lib/quiz-store";
import { GeneratedRoadmap, University, Scholarship, Internship } from "@/lib/types";

// ── Shared helpers ────────────────────────────────────────────────────────────

function SectionHeading({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span style={{ color: "var(--accent)" }}>{icon}</span>
      <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>{label}</h2>
    </div>
  );
}

function ApplyLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="flex shrink-0 items-center gap-1 rounded-lg border px-3 py-1.5 text-xs transition-all hover:opacity-80 active:scale-[0.97]"
      style={{ borderColor: "var(--border)", color: "var(--muted)" }}
    >
      Apply <ExternalLink size={10} />
    </a>
  );
}

// ── LEFT COLUMN: Roadmap ──────────────────────────────────────────────────────

function SkeletonBlock({ h = "h-24" }: { h?: string }) {
  return <div className={`skeleton rounded-xl ${h}`} />;
}

function RoadmapColumn({ roadmap, loading, error }: { roadmap: GeneratedRoadmap | null; loading: boolean; error: string | null }) {
  if (error) {
    return (
      <div className="rounded-xl border border-red-900/30 bg-red-950/20 p-5">
        <p className="text-sm text-red-400">{error}</p>
        <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>Add OPENAI_API_KEY to .env.local</p>
      </div>
    );
  }

  if (loading || !roadmap) {
    return (
      <div className="flex flex-col gap-6">
        <SkeletonBlock h="h-36" />
        <SkeletonBlock h="h-48" />
        <SkeletonBlock h="h-32" />
        <SkeletonBlock h="h-44" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Exams */}
      <section>
        <SectionHeading icon={<BookOpen size={14} />} label="Exam Roadmap" />
        <div className="flex flex-col gap-3">
          {roadmap.requiredExams.map((exam, i) => (
            <div key={i} className="rounded-xl border p-4"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-bold">{exam.name}</span>
                <span className="font-mono text-xs font-bold shrink-0" style={{ color: "var(--accent)" }}>
                  {exam.targetScore}
                </span>
              </div>
              <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>Prep time: {exam.prepTime}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {exam.resources.map((r, j) => (
                  <span key={j} className="rounded border px-1.5 py-0.5 text-[10px]"
                    style={{ borderColor: "var(--border)", color: "var(--subtle)" }}>{r}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <SectionHeading icon={<Zap size={14} />} label="Skills to Build" />
        <div className="flex flex-col">
          {roadmap.keySkills.map((skill, i) => (
            <div key={i} className="flex items-start gap-3 border-b py-3" style={{ borderColor: "var(--border)" }}>
              <span className="mt-0.5 w-5 shrink-0 text-center font-mono text-xs font-bold" style={{ color: "var(--accent)" }}>
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold">{skill.skill}</span>
                <p className="mt-0.5 text-xs" style={{ color: "var(--muted)" }}>{skill.howToLearn}</p>
              </div>
              <span className="shrink-0 rounded border px-2 py-0.5 font-mono text-[10px]"
                style={{ borderColor: "var(--border)", color: "var(--subtle)" }}>{skill.timeInvest}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <SectionHeading icon={<Briefcase size={14} />} label="Portfolio Projects" />
        <div className="flex flex-col gap-3">
          {roadmap.portfolioProjects.map((proj, i) => (
            <div key={i} className="rounded-xl border p-4"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
              <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--accent)" }}>
                Project {i + 1}
              </p>
              <h4 className="text-sm font-bold">{proj.title}</h4>
              <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{proj.description}</p>
              <p className="mt-2 text-[10px] italic" style={{ color: "var(--subtle)" }}>{proj.impact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section>
        <SectionHeading icon={<Calendar size={14} />} label="12-Month Timeline" />
        <div className="flex flex-col gap-0">
          {roadmap.actionPlan.map((step, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-black"
                  style={{ backgroundColor: "var(--accent)" }}>
                  {i + 1}
                </div>
                {i < roadmap.actionPlan.length - 1 && (
                  <div className="mt-0.5 w-px flex-1" style={{ backgroundColor: "var(--border)", minHeight: 20 }} />
                )}
              </div>
              <div className="pb-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] font-bold" style={{ color: "var(--accent)" }}>{step.period}</span>
                  <span className="text-sm font-bold">{step.title}</span>
                </div>
                <ul className="mt-1.5 flex flex-col gap-1">
                  {step.actions.map((action, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-xs" style={{ color: "var(--muted)" }}>
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      {action}
                    </li>
                  ))}
                </ul>
                <p className="mt-1.5 text-xs" style={{ color: "var(--foreground)", opacity: 0.55 }}>
                  {step.milestone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── RIGHT COLUMN: Opportunities ───────────────────────────────────────────────

function UniversityCard({ uni }: { uni: University }) {
  const diffColors = {
    reach:  { bg: "rgba(248,113,113,0.07)", border: "rgba(248,113,113,0.22)", text: "#F87171", label: "Reach" },
    match:  { bg: "rgba(200,169,110,0.07)", border: "rgba(200,169,110,0.22)", text: "var(--accent)", label: "Match" },
    safety: { bg: "rgba(107,203,119,0.07)", border: "rgba(107,203,119,0.22)", text: "#6BCB77", label: "Safety" },
  };
  const d = diffColors[uni.difficulty];

  return (
    <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold">{uni.name}</h3>
            <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0"
              style={{ backgroundColor: d.bg, border: `1px solid ${d.border}`, color: d.text }}>
              {d.label}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs flex-wrap" style={{ color: "var(--muted)" }}>
            <MapPin size={10} />
            {uni.city} · {uni.country}
            {uni.ranking && <span className="opacity-60">· {uni.ranking}</span>}
          </div>
        </div>
        <ApplyLink href={uni.applicationUrl} />
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {uni.programs.slice(0, 3).map((p) => (
          <span key={p} className="rounded-full border px-2 py-0.5 text-[10px]"
            style={{ borderColor: "var(--border)", color: "var(--subtle)" }}>{p}</span>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
        <DollarSign size={10} />{uni.avgTuition}
      </div>
      {uni.notes && <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--subtle)" }}>{uni.notes}</p>}
    </div>
  );
}

function ScholarshipCard({ s }: { s: Scholarship }) {
  const typeColors: Record<string, { text: string; bg: string }> = {
    government:    { text: "#4A9EFF", bg: "rgba(74,158,255,0.08)" },
    university:    { text: "var(--accent)", bg: "rgba(200,169,110,0.08)" },
    international: { text: "#A78BFA", bg: "rgba(167,139,250,0.08)" },
    corporate:     { text: "#6BCB77", bg: "rgba(107,203,119,0.08)" },
  };
  const c = typeColors[s.type] ?? typeColors.international;

  return (
    <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold">{s.name}</h3>
            <span className="rounded-full px-2 py-0.5 text-[10px] font-medium capitalize shrink-0"
              style={{ backgroundColor: c.bg, color: c.text }}>{s.type}</span>
          </div>
          <p className="mt-0.5 text-xs" style={{ color: "var(--muted)" }}>{s.provider}</p>
        </div>
        <ApplyLink href={s.applicationUrl} />
      </div>
      <div className="mt-3 rounded-lg border px-3 py-2" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs font-semibold" style={{ color: "var(--accent)" }}>{s.amount}</p>
      </div>
      <ul className="mt-3 flex flex-col gap-1">
        {s.eligibility.slice(0, 3).map((e, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs" style={{ color: "var(--muted)" }}>
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
            {e}
          </li>
        ))}
      </ul>
      <p className="mt-2 flex items-center gap-1 text-xs" style={{ color: "var(--subtle)" }}>
        <Calendar size={10} />Deadline: {s.deadline}
      </p>
    </div>
  );
}

function InternshipCard({ intern }: { intern: Internship }) {
  const typeColors: Record<string, string> = { remote: "#6BCB77", onsite: "var(--accent)", hybrid: "#A78BFA" };
  const color = typeColors[intern.type] ?? "var(--muted)";

  return (
    <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-bold">{intern.name}</h3>
          <p className="mt-0.5 text-xs" style={{ color: "var(--accent)" }}>{intern.role}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs" style={{ color: "var(--muted)" }}>
            <span className="flex items-center gap-1"><MapPin size={10} />{intern.location}</span>
            <span className="capitalize rounded-full px-2 py-0.5 text-[10px]"
              style={{ color, backgroundColor: `${color}18` }}>{intern.type}</span>
            <span>{intern.duration}</span>
          </div>
        </div>
        <ApplyLink href={intern.applicationUrl} />
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {intern.requirements.slice(0, 4).map((r, i) => (
          <span key={i} className="rounded-full border px-2 py-0.5 text-[10px]"
            style={{ borderColor: "var(--border)", color: "var(--subtle)" }}>{r}</span>
        ))}
      </div>
    </div>
  );
}

function OpportunitiesColumn({ careerId, universities }: { careerId: string; universities: University[] }) {
  const scholarships = getScholarshipsForCareer(careerId);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [internSource, setInternSource] = useState<"jasa" | "static" | null>(null);

  useEffect(() => {
    fetch(`/api/internships?career=${careerId}`)
      .then((r) => r.json())
      .then((d) => {
        setInternships(d.internships ?? []);
        setInternSource(d.source);
      })
      .catch(() => {});
  }, [careerId]);

  const kzUnis = universities.filter((u) => u.country === "KZ");
  const usUnis = universities.filter((u) => u.country === "US");
  const usReach = usUnis.filter((u) => u.difficulty === "reach");
  const usMatch = usUnis.filter((u) => u.difficulty === "match");
  const usSafety = usUnis.filter((u) => u.difficulty === "safety");

  return (
    <div className="flex flex-col gap-10">
      {/* Universities */}
      <section>
        <SectionHeading icon={<GraduationCap size={14} />} label="Universities" />

        {kzUnis.length > 0 && (
          <div className="mb-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--subtle)" }}>
              Kazakhstan
            </p>
            <div className="flex flex-col gap-3">
              {kzUnis.map((u) => <UniversityCard key={u.id} uni={u} />)}
            </div>
          </div>
        )}

        {usUnis.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--subtle)" }}>
              United States
            </p>
            <div className="flex flex-col gap-6">
              {usReach.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-wider" style={{ color: "var(--subtle)" }}>Reach</p>
                  <div className="flex flex-col gap-3">{usReach.map((u) => <UniversityCard key={u.id} uni={u} />)}</div>
                </div>
              )}
              {usMatch.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-wider" style={{ color: "var(--subtle)" }}>Match</p>
                  <div className="flex flex-col gap-3">{usMatch.map((u) => <UniversityCard key={u.id} uni={u} />)}</div>
                </div>
              )}
              {usSafety.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-wider" style={{ color: "var(--subtle)" }}>Safety</p>
                  <div className="flex flex-col gap-3">{usSafety.map((u) => <UniversityCard key={u.id} uni={u} />)}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Scholarships */}
      {scholarships.length > 0 && (
        <section>
          <SectionHeading icon={<DollarSign size={14} />} label="Scholarships & Grants" />
          <div className="flex flex-col gap-3">
            {scholarships.map((s) => <ScholarshipCard key={s.id} s={s} />)}
          </div>
        </section>
      )}

      {/* Internships */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span style={{ color: "var(--accent)" }}><Briefcase size={14} /></span>
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Opportunities
            </h2>
          </div>
          {internSource === "jasa" && (
            <span className="rounded-full border px-2 py-0.5 text-[10px]"
              style={{ borderColor: "var(--border)", color: "var(--accent)" }}>
              Live from jasa.dev
            </span>
          )}
        </div>
        {internships.length > 0 ? (
          <div className="flex flex-col gap-3">
            {internships.map((i) => <InternshipCard key={i.id} intern={i} />)}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-24 rounded-xl" />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function RoadmapPage({ params }: { params: Promise<{ career: string }> }) {
  const { career: careerId } = use(params);
  const [roadmap, setRoadmap] = useState<GeneratedRoadmap | null>(null);
  const [roadmapLoading, setRoadmapLoading] = useState(true);
  const [roadmapError, setRoadmapError] = useState<string | null>(null);

  const career = getCareerById(careerId);
  const scores = getSurveyScores();
  const matches = getCareerMatches();
  const originalMatch = matches?.find((m) => m.careerId === careerId);
  const adjustedScore = scores[careerId] ?? originalMatch?.matchScore ?? 75;

  const universities = getUniversitiesForCareer(careerId);

  // Load AI roadmap immediately on mount
  useEffect(() => {
    fetch("/api/roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ careerId, adjustedScore }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setRoadmap(d.roadmap);
      })
      .catch((e) => setRoadmapError(e.message))
      .finally(() => setRoadmapLoading(false));
  }, [careerId, adjustedScore]);

  if (!career) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center" style={{ backgroundColor: "var(--background)" }}>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Career not found.{" "}
          <Link href="/careers" className="underline" style={{ color: "var(--accent)" }}>Back to careers</Link>
        </p>
      </div>
    );
  }

  const scoreColor = adjustedScore >= 80 ? "#6BCB77" : adjustedScore >= 65 ? "var(--accent)" : "var(--muted)";

  return (
    <div className="min-h-[100dvh]" style={{ backgroundColor: "var(--background)" }}>
      {/* Sticky header */}
      <div className="sticky top-0 z-10 border-b" style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-7xl px-6 py-4 md:px-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/careers" className="text-sm font-bold tracking-widest uppercase opacity-50 hover:opacity-80 transition-opacity"
                style={{ color: "var(--foreground)" }}>
                Prisma
              </Link>
              <span className="text-sm font-semibold">{career.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "var(--muted)" }}>Match</span>
              <span className="font-mono text-sm font-bold" style={{ color: scoreColor }}>{adjustedScore}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Career summary strip */}
      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-7xl px-6 py-6 md:px-10">
          <h1 className="text-xl font-bold tracking-tight md:text-2xl">Your roadmap to {career.name}</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{career.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {career.requiredSkills.map((s) => (
              <span key={s} className="rounded-full border px-2.5 py-0.5 text-xs"
                style={{ borderColor: "var(--border)", color: "var(--subtle)" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr]">

          {/* LEFT: Roadmap (sticky on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-[73px] lg:self-start lg:max-h-[calc(100vh-90px)] lg:overflow-y-auto lg:pr-2"
          >
            <div className="mb-6">
              <h2 className="text-lg font-bold tracking-tight">Learning Roadmap</h2>
              <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                AI-generated plan based on your {adjustedScore}% match score
              </p>
            </div>
            <RoadmapColumn roadmap={roadmap} loading={roadmapLoading} error={roadmapError} />
          </motion.div>

          {/* RIGHT: Opportunities */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6">
              <h2 className="text-lg font-bold tracking-tight">Opportunities</h2>
              <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                Universities, scholarships, and internships matched to this path
              </p>
            </div>
            <OpportunitiesColumn careerId={careerId} universities={universities} />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
