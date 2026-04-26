"use client";

import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { WordsPullUpMultiStyle } from "@/components/ui/prisma-hero";

const EASE = [0.22, 1, 0.36, 1] as const;

const featureCards = [
  {
    number: "01",
    title: "Career Hypothesis Engine",
    icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85",
    items: [
      "Maps your interests, strengths, and values",
      "Generates 3–5 personalized career hypotheses",
      "Shows trade-offs and real-world examples",
      "Outputs your Career Direction Map",
    ],
  },
  {
    number: "02",
    title: "Financial Clarity Layer",
    icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85",
    items: [
      "Calculates cost of entry for each path",
      "Finds scholarships, grants, and competitions",
      "ROI estimates and income trajectory",
    ],
  },
  {
    number: "03",
    title: "Talent Packaging System",
    icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85",
    items: [
      "Builds your proof-of-talent portfolio plan",
      "Curates competitions and internships",
      "Crafts your personal narrative and CV",
    ],
  },
];

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="min-h-screen bg-black relative py-20 px-4 sm:px-6 md:px-10">
      {/* Subtle noise texture */}
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />

      <div className="relative max-w-7xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <div className="max-w-3xl">
          <WordsPullUpMultiStyle
            segments={[
              {
                text: "AI-guided workflows for life-ready individuals.",
                className: "text-primary font-normal",
              },
              {
                text: "Built for clarity. Powered by structure.",
                className: "text-gray-500 font-normal",
              },
            ]}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug"
          />
        </div>

        {/* 4-column card grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]"
        >
          {/* Card 1 — video */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0, ease: EASE }}
            className="relative overflow-hidden rounded-2xl lg:rounded-3xl"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <p className="text-base md:text-lg font-medium" style={{ color: "#E1E0CC" }}>
                Your path, structured.
              </p>
            </div>
          </motion.div>

          {/* Cards 2-4 — feature cards */}
          {featureCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: (i + 1) * 0.15, ease: EASE }}
              className="bg-[#212121] rounded-2xl lg:rounded-3xl p-5 md:p-6 flex flex-col gap-5 overflow-hidden"
            >
              {/* Icon */}
              <img
                src={card.icon}
                alt={card.title}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover"
              />

              {/* Title + number */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-primary font-medium text-sm md:text-base leading-snug">
                  {card.title}
                </h3>
                <span className="text-gray-600 text-xs font-medium shrink-0">{card.number}</span>
              </div>

              {/* Checklist */}
              <ul className="flex flex-col gap-2 flex-1">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-400 text-xs leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Learn more */}
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-primary text-xs font-medium group"
              >
                Learn more
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  style={{ transform: "rotate(-45deg)" }}
                />
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
