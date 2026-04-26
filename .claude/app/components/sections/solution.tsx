"use client";

import { motion, useInView } from "framer-motion";
import { Map, ClipboardCheck, Zap } from "lucide-react";
import { useRef } from "react";

const solutions = [
  {
    icon: Map,
    title: "Personalized Roadmap",
    description:
      "AI builds a clear milestone-based roadmap tailored to the founder's project, stage, and deadline. It turns broad ambition into a structured path with visible next steps.",
  },
  {
    icon: ClipboardCheck,
    title: "Daily Accountability",
    description:
      "StriveAI keeps founders moving with short daily check-ins and concrete actions. Instead of passive planning, it creates a rhythm of consistent execution.",
  },
  {
    icon: Zap,
    title: "Real-Time Adaptation",
    description:
      "When progress slows or priorities change, the system adjusts the plan in real time. Founders stay on track without losing momentum or wasting time on the wrong next step.",
  },
];

export function SolutionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#0D0D1A] py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-4">Our Solution</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            Our Solution,<br />Reimagined
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {solutions.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ y: 40, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-6 hover:bg-white/8 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                <s.icon className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
