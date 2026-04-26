"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useRef } from "react";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white py-28 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <div className="relative rounded-3xl bg-[#080812] overflow-hidden px-8 py-20 md:px-16">
          {/* Background blobs */}
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blue-700/30 blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-violet-700/25 blur-[100px]" />

          <div className="relative z-10 flex flex-col items-center text-center gap-8">

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-4">
                Let&apos;s Build the<br />Future Together
              </h2>
              <p className="text-white/50 text-lg max-w-lg mx-auto">
                Join the founders who are already building with structure, accountability,
                and real-time AI guidance.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
            >
              <a
                href="https://striveai-x7m4.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:gap-3"
              >
                Start Building Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="mailto:striveai0104@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
                Contact Us
              </a>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-8 pt-4 border-t border-white/10 w-full justify-center"
            >
              <div className="text-center">
                <p className="text-white text-sm font-medium">Website</p>
                <a
                  href="https://striveai-x7m4.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 text-xs hover:text-white/80 transition-colors"
                >
                  striveai-x7m4.onrender.com
                </a>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <p className="text-white text-sm font-medium">E-mail</p>
                <a
                  href="mailto:striveai0104@gmail.com"
                  className="text-white/50 text-xs hover:text-white/80 transition-colors"
                >
                  striveai0104@gmail.com
                </a>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
