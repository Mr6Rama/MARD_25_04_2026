"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "5+", label: "Flagship Events" },
  { value: "1,350+", label: "Participants" },
  { value: "$10K+", label: "Invested" },
  { value: "15+", label: "Enterprise Partners" },
];

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#080812] py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            We Know Our Audience
          </h2>
          <p className="text-white/50 text-lg max-w-xl">
            We&apos;ve run 5+ founder competitions with 1,350+ participants — and saw the same
            execution problem every time.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10 rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/5 border-r border-b border-white/10 last:border-r-0 p-10 flex flex-col gap-2"
            >
              <span className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-white/50 text-sm font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 rounded-2xl overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80"
            alt="Founder competition event"
            className="w-full h-64 md:h-80 object-cover opacity-60"
          />
        </motion.div>

      </div>
    </section>
  );
}
