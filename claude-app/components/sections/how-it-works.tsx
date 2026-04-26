"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Tell Prisma about yourself",
    description: "A 4-question profile covering your interests, strengths, work style, and environment preferences. Takes under 3 minutes.",
    detail: "No long surveys. No personality tests. Just the signal that matters.",
  },
  {
    number: "02",
    title: "Get matched to careers",
    description: "Our AI processes your profile against 15 career paths and returns a ranked list with honest match percentages.",
    detail: "Scores vary from 52% to 96% — intentionally. Not everything is a great fit.",
  },
  {
    number: "03",
    title: "Validate each match",
    description: "For each career, answer 3 real-world scenario questions. Your score adjusts based on how the actual job conditions align with how you actually operate.",
    detail: "This is where most guidance tools stop. Prisma keeps going.",
  },
  {
    number: "04",
    title: "Get your complete roadmap",
    description: "Universities in Kazakhstan and the US. Scholarships including Bolashak and Fulbright. Relevant internships. And an AI-generated 12-month action plan.",
    detail: "Not a brochure. A real plan with deadlines, exams, skills, and projects.",
  },
];

function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-5"
    >
      {/* Step number + connecting line */}
      <div className="flex flex-col items-center">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black"
          style={{ backgroundColor: "rgba(200,169,110,0.12)", border: "1px solid rgba(200,169,110,0.25)", color: "#C8A96E" }}
        >
          {step.number}
        </div>
        {index < STEPS.length - 1 && (
          <div className="mt-2 w-px flex-1" style={{ backgroundColor: "rgba(222,219,200,0.06)", minHeight: 40 }} />
        )}
      </div>

      {/* Content */}
      <div className={`pb-10 ${index === STEPS.length - 1 ? "pb-0" : ""}`}>
        <h3 className="text-base font-bold tracking-tight md:text-lg">{step.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "rgba(222,219,200,0.55)" }}>
          {step.description}
        </p>
        <p className="mt-2 text-xs" style={{ color: "rgba(222,219,200,0.3)" }}>{step.detail}</p>
      </div>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section id="how-it-works" className="px-6 py-20 md:px-10 lg:px-20 xl:px-32">
      <div className="mx-auto max-w-5xl">

        {/* Header row */}
        <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#C8A96E" }}>
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight leading-tight md:text-4xl" style={{ color: "#DEDBC8" }}>
              From &ldquo;I don&apos;t know what I want&rdquo; to a complete plan — in one session.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-end gap-4"
          >
            <p className="text-sm leading-relaxed" style={{ color: "rgba(222,219,200,0.5)" }}>
              Most career guidance is too slow, too generic, or too expensive. Prisma does the work instantly — matching your actual profile to real opportunities with a concrete path forward.
            </p>
            <Link
              href="/quiz"
              className="group inline-flex items-center gap-2 self-start text-sm font-semibold transition-all"
              style={{ color: "#C8A96E" }}
            >
              Start the assessment
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-x-20">
          <div>
            {STEPS.slice(0, 2).map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
          <div>
            {STEPS.slice(2).map((step, i) => (
              <StepCard key={step.number} step={step} index={i + 2} />
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 flex flex-col items-start gap-4 rounded-2xl border p-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "rgba(200,169,110,0.15)", backgroundColor: "rgba(200,169,110,0.04)" }}
        >
          <div>
            <p className="text-base font-bold" style={{ color: "#DEDBC8" }}>Ready to map your future?</p>
            <p className="mt-0.5 text-sm" style={{ color: "rgba(222,219,200,0.45)" }}>
              Takes 3–5 minutes. No account required.
            </p>
          </div>
          <Link
            href="/quiz"
            className="group flex shrink-0 items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-black transition-all active:scale-[0.98] hover:opacity-90"
            style={{ backgroundColor: "#C8A96E" }}
          >
            Start for free
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
