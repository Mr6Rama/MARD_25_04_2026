"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote:
      "StriveAI has been genuinely useful for me because it brings structure and clarity to execution. I've already started integrating it into my projects, and it's helped me stay more focused and consistent.",
    name: "Zhunishan Berdiali",
    role: "1st place winner at Alem AI, founder from Kazakhstan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    quote:
      "The product of StriveAI is pretty helpful, it expands companies productivity in a new efficient way. The core function is easy to understand, absolutely loved the design and how the customer journey is made.",
    name: "Semenov Vladyslav",
    role: "Founder of Rivestor",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    quote:
      "I really liked StriveAI, the AI created a precise plan and organized the tasks based on their priority. I'd like to see a simpler design.",
    name: "Tauken Baimyrza",
    role: "NYU Shanghai class of 2030",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
  },
];

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#0D0D1A] py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-4">
            Early Users
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            What Early Users Are Saying
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ y: 40, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-full h-full object-cover object-top opacity-80"
                />
              </div>
              <div className="p-7 flex flex-col gap-5 flex-1">
                <span className="text-blue-500 text-2xl font-serif">&ldquo;</span>
                <p className="text-white/70 text-sm leading-relaxed italic flex-1">{t.quote}</p>
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
