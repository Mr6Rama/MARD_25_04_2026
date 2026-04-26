"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Mic, MicOff, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { saveQuizAnswers, saveCareerMatches, saveVoiceTranscript } from "@/lib/quiz-store";
import { QuizAnswers } from "@/lib/types";

// ── Data ──────────────────────────────────────────────────────────────────────

const INTERESTS = [
  { id: "technology", label: "Technology", sub: "Code, systems, digital products" },
  { id: "design", label: "Art & Design", sub: "Visual, spatial, creative work" },
  { id: "science", label: "Science & Research", sub: "Data, experiments, discovery" },
  { id: "business", label: "Business & Finance", sub: "Strategy, markets, growth" },
  { id: "people", label: "People & Social", sub: "Communities, relationships" },
  { id: "writing", label: "Writing & Media", sub: "Stories, content, journalism" },
  { id: "nature", label: "Nature & Environment", sub: "Ecology, sustainability" },
  { id: "law", label: "Law & Justice", sub: "Rights, policy, governance" },
  { id: "health", label: "Health & Medicine", sub: "Biology, patient care" },
  { id: "education", label: "Education & Training", sub: "Teaching, mentoring" },
];

const STRENGTHS = [
  { id: "analytical", label: "Analytical Thinking", sub: "Breaking down complex problems" },
  { id: "creative", label: "Creative Thinking", sub: "Generating original ideas" },
  { id: "leadership", label: "Leadership", sub: "Guiding and motivating others" },
  { id: "communication", label: "Communication", sub: "Expressing ideas clearly" },
  { id: "technical", label: "Technical Aptitude", sub: "Picking up tools and systems fast" },
  { id: "problem-solving", label: "Problem Solving", sub: "Finding solutions under pressure" },
  { id: "empathy", label: "Empathy", sub: "Understanding how others feel" },
  { id: "organization", label: "Organization", sub: "Structuring and planning work" },
  { id: "research", label: "Research", sub: "Finding and validating information" },
  { id: "persuasion", label: "Persuasion", sub: "Changing minds with reasoning" },
];

const WORK_STYLES = [
  { id: "independent", label: "Independent", sub: "I work best when I own a problem and solve it alone" },
  { id: "collaborative", label: "Collaborative", sub: "I thrive when building things alongside a team" },
  { id: "leadership", label: "Leading Others", sub: "I'm energized by setting direction and guiding people" },
  { id: "structured", label: "Within Structure", sub: "I do my best work with clear processes and systems" },
];

const ENVIRONMENTS = [
  { id: "office", label: "Office-Based", sub: "In-person, physical workspace, face-to-face collaboration" },
  { id: "remote", label: "Digital / Remote", sub: "Anywhere with a screen and internet connection" },
  { id: "field", label: "Field / Physical", sub: "Out in the world — sites, labs, clinics, outdoors" },
  { id: "flexible", label: "Flexible Mix", sub: "Combination of environments depending on the task" },
];

type StepConfig = { title: string; subtitle: string; min?: number; max?: number };

const STEPS: StepConfig[] = [
  { title: "What genuinely excites you?", subtitle: "Pick 2–5 areas that spark real interest", min: 2, max: 5 },
  { title: "Where do your strengths lie?", subtitle: "Select 2–4 that feel natural to you", min: 2, max: 4 },
  { title: "How do you work best?", subtitle: "Choose the style that describes you most accurately", min: 1, max: 1 },
  { title: "Where do you see yourself?", subtitle: "Pick the environment that fits", min: 1, max: 1 },
  { title: "Describe yourself in your own words", subtitle: "Optional — 30–60 seconds of voice improves your match accuracy" },
];

const TOTAL_STEPS = STEPS.length;

// ── Animation variants ────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

// ── Tile component ────────────────────────────────────────────────────────────

function Tile({
  label,
  sub,
  selected,
  onClick,
  large = false,
}: {
  label: string;
  sub: string;
  selected: boolean;
  onClick: () => void;
  large?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col gap-1.5 rounded-xl border p-4 text-left transition-all duration-200 active:scale-[0.98]",
        large ? "min-h-[100px]" : "min-h-[80px]"
      )}
      style={{
        borderColor: selected ? "var(--accent)" : "var(--border)",
        backgroundColor: selected ? "rgba(200,169,110,0.07)" : "var(--surface)",
      }}
    >
      {selected && (
        <span
          className="absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <Check size={10} className="text-black" strokeWidth={3} />
        </span>
      )}
      <span className="text-sm font-semibold leading-tight tracking-tight">{label}</span>
      <span className="text-xs leading-snug" style={{ color: "var(--muted)" }}>{sub}</span>
    </button>
  );
}

// ── Voice Input Component ─────────────────────────────────────────────────────

function VoiceInput({
  onTranscript,
  transcript,
}: {
  onTranscript: (t: string) => void;
  transcript: string;
}) {
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const stopRecording = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        setRecording(false);
        setProcessing(true);
        try {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          const fd = new FormData();
          fd.append("audio", blob, "recording.webm");
          const res = await fetch("/api/voice-transcribe", { method: "POST", body: fd });
          const data = await res.json();
          if (data.transcript) {
            onTranscript(data.transcript);
          } else {
            setError("Could not transcribe audio. Please try again or skip.");
          }
        } catch {
          setError("Transcription failed. You can skip this step.");
        } finally {
          setProcessing(false);
        }
      };

      recorder.start();
      setRecording(true);
      setSeconds(0);

      timerRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s >= 59) {
            stopRecording();
            return 60;
          }
          return s + 1;
        });
      }, 1000);
    } catch {
      setError("Microphone access denied. Please allow microphone or skip this step.");
    }
  };

  const formatTime = (s: number) => `0:${s.toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {!transcript && !processing && (
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={recording ? stopRecording : startRecording}
            className={cn(
              "relative flex h-24 w-24 items-center justify-center rounded-full transition-all duration-300",
              "active:scale-[0.95]"
            )}
            style={{
              backgroundColor: recording ? "rgba(248,113,113,0.12)" : "rgba(200,169,110,0.08)",
              border: `2px solid ${recording ? "#F87171" : "var(--accent)"}`,
            }}
          >
            {recording && (
              <motion.span
                className="absolute inset-0 rounded-full"
                animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                style={{ border: `2px solid #F87171` }}
              />
            )}
            {recording ? (
              <MicOff size={32} style={{ color: "#F87171" }} />
            ) : (
              <Mic size={32} style={{ color: "var(--accent)" }} />
            )}
          </button>

          {recording ? (
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2">
                <motion.span
                  className="h-2 w-2 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ backgroundColor: "#F87171" }}
                />
                <span className="font-mono text-sm font-bold" style={{ color: "#F87171" }}>
                  {formatTime(seconds)} / 1:00
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                Speak naturally — click the mic to stop
              </p>
            </div>
          ) : (
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Click the mic to start recording
            </p>
          )}
        </div>
      )}

      {processing && (
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="h-7 w-1 rounded-full"
                animate={{ scaleY: [0.3, 1, 0.3] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                style={{ backgroundColor: "var(--accent)" }}
              />
            ))}
          </div>
          <p className="text-sm" style={{ color: "var(--muted)" }}>Transcribing with Whisper…</p>
        </div>
      )}

      {transcript && !processing && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div
            className="rounded-xl border p-5"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
              Transcript
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
              {transcript}
            </p>
          </div>
          <button
            onClick={() => { onTranscript(""); setSeconds(0); }}
            className="mt-3 flex items-center gap-1.5 text-xs transition-opacity hover:opacity-80"
            style={{ color: "var(--muted)" }}
          >
            <RotateCcw size={12} />
            Re-record
          </button>
        </motion.div>
      )}

      {error && (
        <p className="max-w-sm text-center text-xs" style={{ color: "#F87171" }}>{error}</p>
      )}

      <p className="text-xs" style={{ color: "var(--subtle)" }}>
        Your voice is processed by OpenAI Whisper and never stored as audio.
      </p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [interests, setInterests] = useState<string[]>([]);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [workStyle, setWorkStyle] = useState<string>("");
  const [environment, setEnvironment] = useState<string>("");
  const [voiceTranscript, setVoiceTranscript] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentStep = STEPS[step];

  const toggle = useCallback((id: string, list: string[], setList: (v: string[]) => void, max: number) => {
    if (max === 1) { setList([id]); return; }
    if (list.includes(id)) {
      setList(list.filter((i) => i !== id));
    } else if (list.length < max) {
      setList([...list, id]);
    }
  }, []);

  const getSelections = () => {
    if (step === 0) return interests;
    if (step === 1) return strengths;
    if (step === 2) return workStyle ? [workStyle] : [];
    if (step === 3) return environment ? [environment] : [];
    return ["voice-step"]; // voice step is always "complete"
  };

  const isNextEnabled = () => {
    if (step === 4) return true; // voice is optional
    const min = currentStep.min ?? 1;
    return getSelections().length >= min;
  };

  const goNext = async () => {
    if (step < TOTAL_STEPS - 1) {
      setDir(1);
      setStep((s) => s + 1);
      return;
    }
    // Final step: submit
    const answers: QuizAnswers = { interests, strengths, workStyle, environment, voiceTranscript: voiceTranscript || undefined };
    saveQuizAnswers(answers);
    if (voiceTranscript) saveVoiceTranscript(voiceTranscript);

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/career-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to match careers");
      saveCareerMatches(data.matches);
      router.push("/careers");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (step === 0) return;
    setDir(-1);
    setStep((s) => s - 1);
  };

  const progressPct = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="flex min-h-[100dvh] flex-col" style={{ backgroundColor: "var(--background)" }}>
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="text-sm font-bold tracking-widest uppercase" style={{ color: "var(--foreground)", opacity: 0.6 }}>
          Prisma
        </Link>
        <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
          Step {step + 1} / {TOTAL_STEPS}
        </span>
      </header>

      {/* Progress bar */}
      <div className="h-px w-full" style={{ backgroundColor: "var(--border)" }}>
        <motion.div
          className="h-full"
          style={{ backgroundColor: "var(--accent)" }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Content */}
      <main className="flex flex-1 flex-col px-6 py-10 md:px-10 lg:px-20">
        <div className="mx-auto w-full max-w-4xl">

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Step header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl" style={{ lineHeight: 1.1 }}>
                  {currentStep.title}
                </h1>
                <p className="mt-2 text-sm md:text-base" style={{ color: "var(--muted)" }}>
                  {currentStep.subtitle}
                  {currentStep.max != null && currentStep.max > 1 && (
                    <span className="ml-1 font-mono" style={{ color: "var(--accent)" }}>
                      ({getSelections().length}/{currentStep.max})
                    </span>
                  )}
                </p>
              </div>

              {step === 0 && (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-3">
                  {INTERESTS.map((item) => (
                    <Tile key={item.id} label={item.label} sub={item.sub} selected={interests.includes(item.id)}
                      onClick={() => toggle(item.id, interests, setInterests, 5)} />
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-3">
                  {STRENGTHS.map((item) => (
                    <Tile key={item.id} label={item.label} sub={item.sub} selected={strengths.includes(item.id)}
                      onClick={() => toggle(item.id, strengths, setStrengths, 4)} />
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {WORK_STYLES.map((item) => (
                    <Tile key={item.id} label={item.label} sub={item.sub} selected={workStyle === item.id}
                      onClick={() => setWorkStyle(item.id)} large />
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {ENVIRONMENTS.map((item) => (
                    <Tile key={item.id} label={item.label} sub={item.sub} selected={environment === item.id}
                      onClick={() => setEnvironment(item.id)} large />
                  ))}
                </div>
              )}

              {step === 4 && (
                <VoiceInput
                  onTranscript={setVoiceTranscript}
                  transcript={voiceTranscript}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Error */}
          {error && (
            <p className="mt-4 rounded-lg border border-red-900/40 bg-red-950/20 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={goBack}
              disabled={step === 0}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all",
                step === 0 ? "invisible" : "hover:opacity-100"
              )}
              style={{ color: "var(--muted)" }}
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <div className="flex items-center gap-3">
              {/* Skip for voice step */}
              {step === 4 && !voiceTranscript && (
                <button
                  onClick={goNext}
                  disabled={isLoading}
                  className="text-sm transition-opacity hover:opacity-80"
                  style={{ color: "var(--muted)" }}
                >
                  {isLoading ? "Analyzing…" : "Skip & Find Careers"}
                </button>
              )}

              <button
                onClick={goNext}
                disabled={!isNextEnabled() || isLoading}
                className={cn(
                  "group flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98]",
                  isNextEnabled() && !isLoading ? "text-black hover:opacity-90" : "cursor-not-allowed opacity-30"
                )}
                style={{ backgroundColor: isNextEnabled() ? "var(--accent)" : "var(--surface-3)" }}
              >
                {isLoading ? (
                  <>
                    <span>Analyzing your profile</span>
                    <span className="inline-flex gap-0.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span key={i} className="block h-1 w-1 rounded-full bg-black"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </span>
                  </>
                ) : (
                  <>
                    {step === 4
                      ? voiceTranscript ? "Find My Careers" : "Continue without voice"
                      : step === TOTAL_STEPS - 2 ? "Continue" : step === TOTAL_STEPS - 1 ? "Find My Careers" : "Continue"
                    }
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
