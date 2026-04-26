"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, Check, ArrowUpRight } from "lucide-react";

/* ═══════════════════════════════════════════
   TYPES
═══════════════════════════════════════════ */
type Step = 1 | 2 | 3 | "generating" | "hypotheses" | "roadmap";

interface FormData {
  name: string;
  context: string;
  goal: string;
  blocker: string;
  ideaContext: string;
  skills: string;
  achievements: string;
  natural: string;
}

interface Hypothesis {
  id: string;
  title: string;
  tagline: string;
  fit: string;
  tradeoffs: string[];
  financial: {
    entryPath: string;
    income1yr: string;
    income3yr: string;
    income5yr: string;
  };
  firstTask: string;
}

interface Milestone {
  id: number;
  title: string;
  timeframe: string;
  goal: string;
  tasks: string[];
}

interface Roadmap {
  milestones: Milestone[];
  financial: {
    entryInvestment: string;
    month6Income: string;
    year1Income: string;
    year3Income: string;
  };
  firstTask: {
    title: string;
    deadline: string;
    description: string;
    deliverable: string;
  };
}

/* ═══════════════════════════════════════════
   SHARED PRIMITIVES
═══════════════════════════════════════════ */
const INPUT =
  "w-full bg-transparent border border-[rgba(222,219,200,0.15)] rounded-lg px-4 py-3 text-[#E1E0CC] placeholder:text-[rgba(222,219,200,0.25)] focus:outline-none focus:border-[rgba(222,219,200,0.45)] transition-colors text-sm resize-none";

const LABEL = "block text-[10px] tracking-[0.18em] text-[rgba(222,219,200,0.45)] mb-2 uppercase";

function Field({
  label,
  value,
  onChange,
  placeholder,
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  rows?: number;
}) {
  return (
    <div>
      <label className={LABEL}>{label}</label>
      {rows ? (
        <textarea
          className={INPUT}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <input
          className={INPUT}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

function ContinueBtn({
  onClick,
  label = "Continue",
  disabled = false,
}: {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ gap: "0.75rem" }}
      className="group inline-flex items-center gap-2 rounded-full bg-[#DEDBC8] py-2 pl-6 pr-2 text-sm font-medium text-black transition-colors disabled:opacity-40"
    >
      {label}
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110">
        <ArrowRight className="h-3.5 w-3.5 text-[#E1E0CC]" />
      </span>
    </motion.button>
  );
}

/* ═══════════════════════════════════════════
   LEFT PANEL
═══════════════════════════════════════════ */
const LEFT_CONTENT: Record<number, { heading: string; body: string }> = {
  1: {
    heading: "Start with identity.",
    body: "Capture the minimum context needed to keep the roadmap coherent.",
  },
  2: {
    heading: "Define the goal and constraints.",
    body: "Answer a few focused prompts and the same roadmap pipeline will turn the inputs into milestones, execution stages, and tasks.",
  },
  3: {
    heading: "Reveal your starting assets.",
    body: "What you can already do is the most undervalued starting point in any roadmap.",
  },
};

function LeftPanel({ step }: { step: Step }) {
  const numStep = typeof step === "number" ? step : null;
  const content = numStep ? LEFT_CONTENT[numStep] : null;

  return (
    <aside className="hidden lg:flex lg:w-[36%] xl:w-[32%] bg-[#050505] border-r border-[rgba(222,219,200,0.07)] flex-col justify-between p-8 xl:p-12 min-h-screen">
      {/* Top */}
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full border border-[rgba(222,219,200,0.25)] flex items-center justify-center">
            <span className="text-[10px] font-medium text-[#E1E0CC]">P</span>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] text-[rgba(222,219,200,0.5)] uppercase">
              Prisma
            </p>
            <p className="text-[9px] tracking-[0.15em] text-[rgba(222,219,200,0.3)] uppercase">
              Build what matters
            </p>
          </div>
        </div>

        {numStep && (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
            >
              <p className="text-[10px] tracking-[0.18em] text-[rgba(222,219,200,0.35)] uppercase">
                Initialization Flow
              </p>
              <h2 className="text-2xl xl:text-3xl font-light text-[#E1E0CC] leading-tight max-w-[260px]">
                {content?.heading}
              </h2>
              <p className="text-sm text-[rgba(222,219,200,0.45)] leading-relaxed max-w-[260px]">
                {content?.body}
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-4">
        {numStep && (
          <div className="flex gap-1.5">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-[2px] rounded-full transition-all duration-500"
                style={{
                  width: n <= numStep ? "24px" : "8px",
                  background:
                    n <= numStep
                      ? "rgba(222,219,200,0.7)"
                      : "rgba(222,219,200,0.15)",
                }}
              />
            ))}
          </div>
        )}
        <p className="text-[9px] tracking-[0.15em] text-[rgba(222,219,200,0.2)] uppercase">
          Premium Setup Flow · No Noise · Same Generation Logic
        </p>
      </div>
    </aside>
  );
}

/* ═══════════════════════════════════════════
   STEP HEADER (right panel)
═══════════════════════════════════════════ */
function StepHeader({ step, total, title, subtitle }: { step: number; total: number; title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <p className="text-[10px] tracking-[0.18em] text-[rgba(222,219,200,0.35)] uppercase mb-5">
        Step {step} of {total}
      </p>
      <h1 className="text-2xl md:text-3xl font-light text-[#E1E0CC] mb-2 leading-snug">{title}</h1>
      <p className="text-sm text-[rgba(222,219,200,0.45)]">{subtitle}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   GENERATING SCREEN
═══════════════════════════════════════════ */
const PHASES = [
  "Analyzing your profile…",
  "Mapping career trajectories…",
  "Calibrating financial pathways…",
  "Building your roadmap…",
];

function GeneratingScreen() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % PHASES.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-screen gap-10 px-6">
      {/* Animated rings */}
      <div className="relative flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[rgba(222,219,200,0.12)]"
            style={{ width: 60 + i * 44, height: 60 + i * 44 }}
            animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.15, 0.4] }}
            transition={{ duration: 2.4, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div className="relative h-10 w-10 rounded-full border border-[rgba(222,219,200,0.4)] flex items-center justify-center">
          <span className="text-[10px] text-[rgba(222,219,200,0.7)] font-medium">P</span>
        </div>
      </div>

      {/* Phase text */}
      <div className="h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="text-sm text-[rgba(222,219,200,0.55)] text-center"
          >
            {PHASES[phase]}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="text-[10px] tracking-[0.15em] text-[rgba(222,219,200,0.2)] uppercase text-center">
        Prisma · Intelligence Layer
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HYPOTHESIS CARD
═══════════════════════════════════════════ */
function HypothesisCard({
  h,
  onSelect,
  index,
}: {
  h: Hypothesis;
  onSelect: (h: Hypothesis) => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="border border-[rgba(222,219,200,0.1)] rounded-2xl p-6 flex flex-col gap-5 bg-[rgba(222,219,200,0.02)] hover:bg-[rgba(222,219,200,0.04)] transition-colors group"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] tracking-[0.15em] text-[rgba(222,219,200,0.35)] uppercase mb-1">
            0{index + 1}
          </p>
          <h3 className="text-lg font-medium text-[#E1E0CC] leading-tight">{h.title}</h3>
          <p className="text-sm text-[rgba(222,219,200,0.5)] mt-1">{h.tagline}</p>
        </div>
      </div>

      <p className="text-sm text-[rgba(222,219,200,0.6)] leading-relaxed border-t border-[rgba(222,219,200,0.08)] pt-4">
        {h.fit}
      </p>

      <div className="flex flex-col gap-1.5">
        {h.tradeoffs.map((t, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-[rgba(222,219,200,0.3)] text-xs mt-0.5">—</span>
            <p className="text-xs text-[rgba(222,219,200,0.45)]">{t}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 bg-[rgba(222,219,200,0.04)] rounded-lg p-3">
        {[
          ["Year 1", h.financial.income1yr],
          ["Year 3", h.financial.income3yr],
          ["Year 5", h.financial.income5yr],
        ].map(([label, val]) => (
          <div key={label}>
            <p className="text-[9px] tracking-[0.12em] text-[rgba(222,219,200,0.3)] uppercase mb-0.5">{label}</p>
            <p className="text-xs text-[rgba(222,219,200,0.75)] font-medium">{val}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => onSelect(h)}
        className="w-full flex items-center justify-between rounded-lg border border-[rgba(222,219,200,0.2)] px-4 py-2.5 text-sm text-[rgba(222,219,200,0.7)] hover:bg-[rgba(222,219,200,0.06)] hover:text-[#E1E0CC] transition-all group"
      >
        Choose this path
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   ROADMAP SCREEN
═══════════════════════════════════════════ */
function RoadmapScreen({
  roadmap,
  hypothesis,
}: {
  roadmap: Roadmap;
  hypothesis: Hypothesis;
}) {
  return (
    <div className="flex flex-col gap-10 max-w-3xl pb-20">
      <div>
        <p className="text-[10px] tracking-[0.18em] text-[rgba(222,219,200,0.35)] uppercase mb-3">
          Your path is set
        </p>
        <h1 className="text-3xl md:text-4xl font-light text-[#E1E0CC] leading-tight mb-1">
          {hypothesis.title}
        </h1>
        <p className="text-sm text-[rgba(222,219,200,0.45)]">{hypothesis.tagline}</p>
      </div>

      {/* Milestones */}
      <div className="flex flex-col gap-3">
        <p className="text-[10px] tracking-[0.15em] text-[rgba(222,219,200,0.35)] uppercase">
          Roadmap Canvas · {roadmap.milestones.length} Stages
        </p>
        <div className="flex flex-col gap-px">
          {roadmap.milestones.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-xl p-5 flex gap-5 ${
                i === 0
                  ? "bg-[rgba(222,219,200,0.08)] border border-[rgba(222,219,200,0.15)]"
                  : "bg-[rgba(222,219,200,0.02)] border border-[rgba(222,219,200,0.06)]"
              }`}
            >
              <div className="flex flex-col items-center pt-1 gap-1">
                <div
                  className={`h-5 w-5 rounded-full border flex items-center justify-center text-[9px] font-medium shrink-0 ${
                    i === 0
                      ? "border-[rgba(222,219,200,0.6)] text-[#E1E0CC]"
                      : "border-[rgba(222,219,200,0.2)] text-[rgba(222,219,200,0.4)]"
                  }`}
                >
                  {m.id}
                </div>
                {i < roadmap.milestones.length - 1 && (
                  <div className="w-px flex-1 bg-[rgba(222,219,200,0.08)] min-h-[20px]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3
                    className={`font-medium text-sm ${
                      i === 0 ? "text-[#E1E0CC]" : "text-[rgba(222,219,200,0.5)]"
                    }`}
                  >
                    {m.title}
                  </h3>
                  <span className="text-[9px] tracking-[0.1em] text-[rgba(222,219,200,0.25)] uppercase">
                    {m.timeframe}
                  </span>
                </div>
                <p
                  className={`text-xs leading-relaxed mb-3 ${
                    i === 0 ? "text-[rgba(222,219,200,0.6)]" : "text-[rgba(222,219,200,0.35)]"
                  }`}
                >
                  {m.goal}
                </p>
                <div className="flex flex-col gap-1">
                  {m.tasks.map((task, ti) => (
                    <div key={ti} className="flex items-start gap-2">
                      <Check
                        className={`h-3 w-3 mt-0.5 shrink-0 ${
                          i === 0 ? "text-[rgba(222,219,200,0.5)]" : "text-[rgba(222,219,200,0.2)]"
                        }`}
                      />
                      <p
                        className={`text-xs ${
                          i === 0 ? "text-[rgba(222,219,200,0.5)]" : "text-[rgba(222,219,200,0.25)]"
                        }`}
                      >
                        {task}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* First task + Financial */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[rgba(222,219,200,0.06)] border border-[rgba(222,219,200,0.15)] rounded-xl p-5 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <p className="text-[9px] tracking-[0.15em] text-[rgba(222,219,200,0.4)] uppercase">
              First Task
            </p>
            <span className="text-[9px] tracking-[0.1em] text-[rgba(222,219,200,0.3)] uppercase">
              {roadmap.firstTask.deadline}
            </span>
          </div>
          <h3 className="text-base font-medium text-[#E1E0CC]">{roadmap.firstTask.title}</h3>
          <p className="text-xs text-[rgba(222,219,200,0.55)] leading-relaxed">
            {roadmap.firstTask.description}
          </p>
          <div className="border-t border-[rgba(222,219,200,0.08)] pt-3">
            <p className="text-[9px] tracking-[0.12em] text-[rgba(222,219,200,0.3)] uppercase mb-1">
              Deliverable
            </p>
            <p className="text-xs text-[rgba(222,219,200,0.5)]">{roadmap.firstTask.deliverable}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border border-[rgba(222,219,200,0.08)] rounded-xl p-5 flex flex-col gap-3"
        >
          <p className="text-[9px] tracking-[0.15em] text-[rgba(222,219,200,0.4)] uppercase">
            Financial Reality
          </p>
          {[
            ["Entry investment", roadmap.financial.entryInvestment],
            ["Month 6", roadmap.financial.month6Income],
            ["Year 1", roadmap.financial.year1Income],
            ["Year 3", roadmap.financial.year3Income],
          ].map(([label, val]) => (
            <div key={label} className="flex items-center justify-between border-b border-[rgba(222,219,200,0.06)] pb-2 last:border-0 last:pb-0">
              <p className="text-xs text-[rgba(222,219,200,0.4)]">{label}</p>
              <p className="text-xs text-[rgba(222,219,200,0.75)] font-medium">{val}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row items-start gap-4"
      >
        <a
          href="/"
          className="group inline-flex items-center gap-2 rounded-full bg-[#DEDBC8] py-2.5 pl-6 pr-2 text-sm font-medium text-black transition-colors"
        >
          Enter Prisma
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110">
            <ArrowUpRight className="h-3.5 w-3.5 text-[#E1E0CC]" />
          </span>
        </a>
        <a
          href="/onboard"
          className="text-sm text-[rgba(222,219,200,0.35)] hover:text-[rgba(222,219,200,0.6)] transition-colors self-center"
        >
          Start over
        </a>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN FLOW
═══════════════════════════════════════════ */
export function OnboardFlow() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>({
    name: "",
    context: "",
    goal: "",
    blocker: "",
    ideaContext: "",
    skills: "",
    achievements: "",
    natural: "",
  });
  const [hypotheses, setHypotheses] = useState<Hypothesis[]>([]);
  const [insight, setInsight] = useState("");
  const [selectedH, setSelectedH] = useState<Hypothesis | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof FormData) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }));

  const scrollTop = () => rightRef.current?.scrollTo({ top: 0, behavior: "smooth" });

  const next = () => {
    if (typeof step === "number" && step < 3) {
      setStep((step + 1) as Step);
      scrollTop();
    }
  };

  const back = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    scrollTop();
  };

  const generateHypotheses = async () => {
    setStep("generating");
    try {
      const res = await fetch("/api/prisma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "hypotheses", ...form }),
      });
      const data = await res.json();
      setHypotheses(data.hypotheses ?? []);
      setInsight(data.insight ?? "");
    } catch {
      setHypotheses([]);
    }
    setStep("hypotheses");
  };

  const selectHypothesis = async (h: Hypothesis) => {
    setSelectedH(h);
    setStep("generating");
    try {
      const res = await fetch("/api/prisma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "roadmap", hypothesis: h, profile: form }),
      });
      const data = await res.json();
      setRoadmap(data);
    } catch {
      setRoadmap(null);
    }
    setStep("roadmap");
    scrollTop();
  };

  const isStep = (n: number) => step === n;

  return (
    <div className="flex min-h-screen bg-black">
      <LeftPanel step={step} />

      {/* Right panel */}
      <div
        ref={rightRef}
        className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <AnimatePresence mode="wait">
          {/* ── STEP 1 ── */}
          {isStep(1) && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-screen flex flex-col justify-center px-8 md:px-14 lg:px-16 xl:px-20 py-16"
            >
              <StepHeader
                step={1}
                total={3}
                title="Start with identity."
                subtitle="Capture the minimum context needed to keep the roadmap coherent."
              />
              <div className="flex flex-col gap-5 max-w-xl">
                <Field
                  label="Your name"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Alex"
                />
                <Field
                  label="Your context"
                  value={form.context}
                  onChange={set("context")}
                  placeholder="16-year-old student at ISSAI, interested in AI and entrepreneurship"
                  rows={3}
                />
                <div className="pt-2">
                  <ContinueBtn onClick={next} disabled={!form.name.trim()} />
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2 ── */}
          {isStep(2) && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-screen flex flex-col justify-center px-8 md:px-14 lg:px-16 xl:px-20 py-16"
            >
              <StepHeader
                step={2}
                total={3}
                title="Define the goal and constraints."
                subtitle="Set the outcome, deadline, available time, and the biggest blocker."
              />
              <div className="flex flex-col gap-5 max-w-xl">
                <Field
                  label="Primary goal"
                  value={form.goal}
                  onChange={set("goal")}
                  placeholder="Ship MVP, reach first paying customers, get into Y Combinator…"
                  rows={2}
                />
                <Field
                  label="Biggest blocker"
                  value={form.blocker}
                  onChange={set("blocker")}
                  placeholder="No co-founder, unclear PMF, limited distribution…"
                />
                <Field
                  label="Idea / context"
                  value={form.ideaContext}
                  onChange={set("ideaContext")}
                  placeholder="What exactly are you building, for whom, and why now?"
                  rows={3}
                />
                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={back}
                    className="inline-flex items-center gap-1.5 text-sm text-[rgba(222,219,200,0.35)] hover:text-[rgba(222,219,200,0.6)] transition-colors"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    Back
                  </button>
                  <ContinueBtn onClick={next} disabled={!form.goal.trim()} />
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3 ── */}
          {isStep(3) && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-screen flex flex-col justify-center px-8 md:px-14 lg:px-16 xl:px-20 py-16"
            >
              <StepHeader
                step={3}
                total={3}
                title="Reveal your starting assets."
                subtitle="What you can already do is the most undervalued starting point in any roadmap."
              />
              <div className="flex flex-col gap-5 max-w-xl">
                <Field
                  label="Current skills"
                  value={form.skills}
                  onChange={set("skills")}
                  placeholder="Python, public speaking, design, sales, video editing…"
                  rows={2}
                />
                <Field
                  label="Key achievements"
                  value={form.achievements}
                  onChange={set("achievements")}
                  placeholder="Won regional olympiad, built 3 apps, closed first client, published research…"
                  rows={2}
                />
                <Field
                  label="What comes naturally"
                  value={form.natural}
                  onChange={set("natural")}
                  placeholder="Organizing people, debugging complex problems, explaining ideas, building systems…"
                  rows={2}
                />
                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={back}
                    className="inline-flex items-center gap-1.5 text-sm text-[rgba(222,219,200,0.35)] hover:text-[rgba(222,219,200,0.6)] transition-colors"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    Back
                  </button>
                  <ContinueBtn
                    onClick={generateHypotheses}
                    label="Generate my roadmap"
                    disabled={!form.skills.trim()}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ── GENERATING ── */}
          {step === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="min-h-screen flex"
            >
              <GeneratingScreen />
            </motion.div>
          )}

          {/* ── HYPOTHESES ── */}
          {step === "hypotheses" && (
            <motion.div
              key="hypotheses"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="px-8 md:px-14 lg:px-16 xl:px-20 py-16"
            >
              <div className="mb-8">
                <p className="text-[10px] tracking-[0.18em] text-[rgba(222,219,200,0.35)] uppercase mb-3">
                  Choose your direction
                </p>
                <h1 className="text-2xl md:text-3xl font-light text-[#E1E0CC] mb-2">
                  {hypotheses.length} calibrated trajectories.
                </h1>
                {insight && (
                  <p className="text-sm text-[rgba(222,219,200,0.45)] max-w-xl leading-relaxed">
                    {insight}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-20">
                {hypotheses.map((h, i) => (
                  <HypothesisCard key={h.id} h={h} onSelect={selectHypothesis} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {/* ── ROADMAP ── */}
          {step === "roadmap" && roadmap && selectedH && (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="px-8 md:px-14 lg:px-16 xl:px-20 py-16"
            >
              <RoadmapScreen roadmap={roadmap} hypothesis={selectedH} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
