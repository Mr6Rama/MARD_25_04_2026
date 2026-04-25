# Prisma Landing Page — Claude Context

## Project Overview
**Prisma** — AI-powered life navigation engine for students/early individuals.
Three pillars: Conscious Career Choice · Financial Pathway Planning · Talent Packaging.
Core concept: not a chatbot — a structured execution system (roadmap + daily check-ins + real-time adaptation).

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (CSS-based theme, no tailwind.config.js)
- **UI Library**: shadcn/ui (components in `/components/ui/`)
- **Animation**: framer-motion
- **Icons**: lucide-react
- **Fonts**: Almarai (global, weights 300/400/700/800) + Instrument Serif (italic accent) via next/font/google

## File Structure
```
app/
  layout.tsx        — Almarai + Instrument Serif fonts, Prisma metadata
  page.tsx          — 3 sections: PrismaHero, AboutSection, FeaturesSection
  globals.css       — Tailwind v4 theme (@theme inline), Prisma color system,
                      .noise-overlay (0.85 freq / 3 oct), .bg-noise (0.9 / 4 oct)

components/
  ui/
    prisma-hero.tsx — WordsPullUp, WordsPullUpMultiStyle, PrismaHero (video bg, nav, CTA)
    button.tsx      — shadcn button
  sections/
    about.tsx       — AnimatedLetter scroll-linked opacity + WordsPullUpMultiStyle heading
    features.tsx    — 4-card grid: video card + 3 feature cards (Career, Financial, Talent)

lib/
  utils.ts          — shadcn cn() helper
```

## Brand / Design System
- **Background**: `#000000` (global black)
- **Primary/cream**: `#DEDBC8` (Tailwind `text-primary`) — `#E1E0CC` for inline hero text
- **Card bg**: `#101010` (about), `#212121` (feature cards)
- **Gray text**: `text-gray-400` / `text-gray-500`
- **Font global**: Almarai via `--font-almarai` CSS var
- **Font accent**: Instrument Serif italic via `font-serif italic` Tailwind class
- Dark, moody, cinematic aesthetic — NO blue accent, NO light sections

## Key Components
- **WordsPullUp**: splits text into words, each slides up from y:20 with staggered 0.08s delay, triggered by `useInView`
- **WordsPullUpMultiStyle**: same but takes `segments[]` with per-word className (for mixed styles)
- **AnimatedLetter**: each char gets `useTransform(scrollYProgress, [charProgress-0.1, charProgress+0.05], [0.2, 1])` — creates progressive scroll reveal
- **PrismaHero**: video bg + noise overlay (`.noise-overlay`) + gradient overlay + black navbar pill from top + giant "Prisma *" heading + description + CTA button

## Session Commands
- `/resume` — Read this file to restore full context before working
- `/save` — Update this file with new decisions made this session

## Key Decisions
- Hero uses actual video (cloudfront CDN, spec URL) not gradient blobs
- Nav embedded in hero, hangs from top as black pill
- Page is 3 sections only: Hero → About → Features
- `AnimatedLetter` uses per-character `useTransform` (not in a loop — each is its own component with its own hook call)
- Feature cards use inline `initial/animate/transition` (not `variants`) to avoid TS ease-type error
- `EASE = [0.22, 1, 0.36, 1] as const` for features stagger

## Do NOT
- Add dark mode toggle
- Add more sections (the 3 are intentional)
- Use a separate top-level navbar
- Switch fonts away from Almarai/Instrument Serif
