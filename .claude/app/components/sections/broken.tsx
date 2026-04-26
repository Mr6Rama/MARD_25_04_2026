"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const issues = [
  {
    number: "01.",
    title: "Lack of Execution Structure",
    description:
      "Founders often have ambition and ideas, but no clear system that turns long-term goals into daily action.",
    bg: "bg-blue-600",
    text: "text-white",
    numberColor: "text-white",
  },
  {
    number: "02.",
    title: "Weak Daily Accountability",
    description:
      "Most tools help with planning, but not with follow-through. When no system checks progress every day, momentum fades and important work gets delayed.",
    bg: "bg-[#1A1A2E]",
    text: "text-white",
    numberColor: "text-white",
  },
  {
    number: "03.",
    title: "Inefficient Course Correction",
    description:
      "When founders fall behind, they usually do not know what to adjust first. This leads to chaos, wasted time, and projects stalling before they reach real traction.",
    bg: "bg-[#F0F0F5]",
    text: "text-gray-900",
    numberColor: "text-gray-900",
  },
];

export function BrokenSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">

        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-14"
        >
          What&apos;s Broken in<br />Today&apos;s Market
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {issues.map((issue, i) => (
            <motion.div
              key={issue.number}
              initial={{ y: 40, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`${issue.bg} rounded-2xl p-8 flex flex-col gap-6`}
            >
              <span className={`text-5xl font-bold ${issue.numberColor}`}>{issue.number}</span>
              <div>
                <h3 className={`text-lg font-bold mb-3 ${issue.text}`}>{issue.title}</h3>
                <p className={`text-sm leading-relaxed ${issue.text} opacity-75`}>
                  {issue.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
