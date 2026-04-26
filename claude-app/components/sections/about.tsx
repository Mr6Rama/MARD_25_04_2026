"use client";

import { motion, useScroll, useTransform, useInView, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { WordsPullUpMultiStyle } from "@/components/ui/prisma-hero";

/* ---------- AnimatedLetter ---------- */
function AnimatedLetter({
  char,
  scrollYProgress,
  index,
  totalChars,
}: {
  char: string;
  scrollYProgress: MotionValue<number>;
  index: number;
  totalChars: number;
}) {
  const charProgress = index / totalChars;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, charProgress - 0.1), charProgress + 0.05],
    [0.2, 1]
  );
  return (
    <motion.span style={{ opacity }} className="inline whitespace-pre">
      {char}
    </motion.span>
  );
}

/* ---------- About ---------- */
const bodyText =
  "Most platforms give you information. Prisma gives you transformation. By deeply understanding who you are — your interests, strengths, values, and constraints — we build a structured path that adapts in real time, turning potential into proof, one milestone at a time.";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true });

  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = bodyText.split("");
  const totalChars = chars.length;

  return (
    <section ref={sectionRef} className="relative bg-black py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-primary text-[10px] sm:text-xs mb-8 uppercase tracking-widest"
        >
          Life Navigation
        </motion.p>

        {/* Heading */}
        <div ref={headingRef} className="mb-14">
          <WordsPullUpMultiStyle
            segments={[
              { text: "We don't give advice,", className: "font-normal" },
              { text: "we build your path.", className: "font-serif italic" },
              {
                text: "Connecting identity, financial reality, and talent into one structured journey.",
                className: "font-normal",
              },
            ]}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-5xl leading-[0.95] sm:leading-[0.9]"
            style={{ color: "#E1E0CC" }}
          />
        </div>

        {/* Animated body text */}
        <div className="max-w-3xl">
          <p
            ref={paragraphRef}
            className="text-xs sm:text-sm md:text-base leading-relaxed"
            style={{ color: "#E1E0CC" }}
          >
            {chars.map((char, i) => (
              <AnimatedLetter
                key={i}
                char={char}
                scrollYProgress={scrollYProgress}
                index={i}
                totalChars={totalChars}
              />
            ))}
          </p>
        </div>

      </div>
    </section>
  );
}
