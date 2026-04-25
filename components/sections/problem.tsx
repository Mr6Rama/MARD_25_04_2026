"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-[#0D0D1A] py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-4">The Problem</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            The Problem<br />We Solve
          </h2>
        </motion.div>

        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <p className="text-white/60 text-lg leading-relaxed">
            Today&apos;s early founders struggle with scattered planning, inconsistent execution,
            and a lack of daily accountability.
          </p>
          <p className="text-white/50 text-base leading-relaxed">
            Even when they know what needs to be done, the absence of a clear roadmap,
            real-time adaptation, and structured follow-through leads to chaos, lost momentum,
            and stalled progress.
          </p>
          <blockquote className="border-l-2 border-blue-500 pl-5 mt-8">
            <p className="text-white/70 text-lg italic">
              &ldquo;What is so special about founders?&rdquo;
            </p>
          </blockquote>
        </motion.div>

      </div>
    </section>
  );
}
