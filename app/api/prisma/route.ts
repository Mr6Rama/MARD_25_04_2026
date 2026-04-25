import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/* ─────────────────────────── Types ─────────────────────────── */
interface UserProfile {
  name: string;
  context: string;
  goal: string;
  blocker: string;
  ideaContext: string;
  skills: string;
  achievements: string;
  natural: string;
}

interface Hypothesis {
  id: string;
  title: string;
  tagline: string;
  fit: string;
  tradeoffs: string[];
  financial: {
    entryPath: string;
    income1yr: string;
    income3yr: string;
    income5yr: string;
  };
  firstTask: string;
}

/* ─────────────────────────── Prompts ─────────────────────────── */
function hypothesesPrompt(p: UserProfile): string {
  return `You are Prisma, a precise AI life navigation engine. You convert raw human potential into structured opportunity.

Based on this user profile, generate exactly 3 distinct career hypotheses calibrated specifically to this person.

USER PROFILE:
- Name: ${p.name}
- Context / Background: ${p.context}
- Primary Goal: ${p.goal}
- Biggest Blocker: ${p.blocker}
- Idea / Context: ${p.ideaContext}
- Current Skills: ${p.skills}
- Key Achievements: ${p.achievements}
- What comes naturally: ${p.natural}

Rules:
- Be SPECIFIC to this person — reference their actual skills, goal, and blocker
- Each hypothesis must be distinct (don't suggest variations of the same path)
- Tradeoffs must be honest, not motivational fluff
- Income figures should be realistic for the path, not inflated
- First task must be completable in 7 days, starting from zero

Return ONLY valid JSON. No preamble, no markdown, no explanation:
{
  "hypotheses": [
    {
      "id": "1",
      "title": "Specific Role Title",
      "tagline": "One sharp sentence describing this path",
      "fit": "Two specific sentences explaining why this fits based on their actual profile",
      "tradeoffs": ["Specific challenge 1", "Specific challenge 2"],
      "financial": {
        "entryPath": "How to get started and rough cost",
        "income1yr": "$X–$Y",
        "income3yr": "$X–$Y",
        "income5yr": "$X–$Y+"
      },
      "firstTask": "One concrete, specific task completable in 7 days"
    }
  ],
  "insight": "One paragraph that cuts across all three paths and reveals something non-obvious about this person's profile"
}`;
}

function roadmapPrompt(hypothesis: Hypothesis, profile: UserProfile): string {
  return `You are Prisma. The user has selected their career path: "${hypothesis.title}"

Their profile:
- Name: ${profile.name}
- Context: ${profile.context}
- Goal: ${profile.goal}
- Skills: ${profile.skills}
- Blocker: ${profile.blocker}

Generate a precise 3-milestone execution roadmap for this path. Be specific — no generic advice.

Return ONLY valid JSON:
{
  "milestones": [
    {
      "id": 1,
      "title": "Milestone title",
      "timeframe": "Week 1–4",
      "goal": "Specific, measurable goal",
      "tasks": ["Concrete task 1", "Concrete task 2", "Concrete task 3"]
    },
    {
      "id": 2,
      "title": "Milestone title",
      "timeframe": "Month 2–3",
      "goal": "Specific, measurable goal",
      "tasks": ["Concrete task 1", "Concrete task 2", "Concrete task 3"]
    },
    {
      "id": 3,
      "title": "Milestone title",
      "timeframe": "Month 4–6",
      "goal": "Specific, measurable goal",
      "tasks": ["Concrete task 1", "Concrete task 2", "Concrete task 3"]
    }
  ],
  "financial": {
    "entryInvestment": "Specific amount or 'free'",
    "month6Income": "$X–$Y or 'pre-revenue'",
    "year1Income": "$X–$Y",
    "year3Income": "$X–$Y"
  },
  "firstTask": {
    "title": "Your first task title",
    "deadline": "Due in 7 days",
    "description": "Exactly what to do",
    "deliverable": "What you will have when complete"
  }
}`;
}

/* ─────────────────────────── Mock data (no API key) ─────────────────────────── */
const MOCK_HYPOTHESES = {
  hypotheses: [
    {
      id: "1",
      title: "AI / ML Engineer",
      tagline: "Build the intelligence layer of the next generation of products.",
      fit: "Your analytical mindset and comfort with abstraction map directly to machine learning systems design. You mentioned impact matters — AI has the highest leverage per hour of any engineering discipline right now.",
      tradeoffs: [
        "18–24 month learning curve before senior-level work",
        "Competitive at entry level; requires a portfolio to differentiate",
      ],
      financial: {
        entryPath: "Self-taught via fast.ai + Kaggle ($0–500) or CS degree",
        income1yr: "$45K–$70K",
        income3yr: "$90K–$130K",
        income5yr: "$140K–$220K+",
      },
      firstTask:
        "Complete fast.ai Lesson 1 and train a classifier on one dataset you care about. Deploy it to Hugging Face Spaces.",
    },
    {
      id: "2",
      title: "Product Manager at a Tech Startup",
      tagline: "Sit at the intersection of user problems and engineering solutions.",
      fit: "Your ability to see systems holistically and communicate across domains is exactly what PMs do. Your goal of building something with real users makes this a natural fit for the next 3 years.",
      tradeoffs: [
        "Hard to break into without a software or design background first",
        "Role scope varies wildly — junior PMs often do coordination, not strategy",
      ],
      financial: {
        entryPath: "Associate PM programs (Google APM, Meta RPM) or startup route ($0)",
        income1yr: "$55K–$80K",
        income3yr: "$90K–$130K",
        income5yr: "$120K–$180K+",
      },
      firstTask:
        "Write a product teardown of one app you use daily — what problem it solves, who it's for, what you'd change. Post it on LinkedIn.",
    },
    {
      id: "3",
      title: "Technical Founder",
      tagline: "Build something people pay for, from nothing.",
      fit: "Your stated goal and the fact that you already have an idea/context suggests you're not looking for a job — you're looking for a path to ownership. This is the highest-risk, highest-upside option.",
      tradeoffs: [
        "No income for 6–18 months without funding or early revenue",
        "Most first companies fail — the education is the value",
      ],
      financial: {
        entryPath: "Bootstrap ($0) or accelerator (YC: equity for $500K)",
        income1yr: "$0 or $20K–$50K if early revenue",
        income3yr: "$0 or $80K–$200K+ if product-market fit",
        income5yr: "Highly variable: $0 to $1M+",
      },
      firstTask:
        "Talk to 5 people who would be your target customer. Ask only: 'What's the hardest part of [problem]?' Don't mention your idea.",
    },
  ],
  insight:
    "Your profile shows someone who wants to build, not just execute — but hasn't yet committed to a specific domain. The fastest way to get clarity is to pick one hypothesis, do the first task, and observe how it feels. The right path will generate energy, not just interest.",
};

const MOCK_ROADMAP = {
  milestones: [
    {
      id: 1,
      title: "Foundations",
      timeframe: "Week 1–4",
      goal: "Complete core fundamentals and ship one small proof of concept",
      tasks: [
        "Complete the entry-level course or resource for this path",
        "Build one small project that demonstrates the core skill",
        "Share it publicly (GitHub, LinkedIn, or relevant community)",
      ],
    },
    {
      id: 2,
      title: "First Proof",
      timeframe: "Month 2–3",
      goal: "Get one external validation: a user, a client, or a rejection letter",
      tasks: [
        "Identify 10 target people or companies for your path",
        "Reach out to 10, aiming for 3 conversations",
        "Incorporate feedback into your next project or application",
      ],
    },
    {
      id: 3,
      title: "Market Entry",
      timeframe: "Month 4–6",
      goal: "Land a first paying client, internship, or program acceptance",
      tasks: [
        "Apply to 20+ opportunities (jobs, programs, or clients)",
        "Build a second, stronger project based on feedback from month 2–3",
        "Get one external offer, acceptance, or paying client",
      ],
    },
  ],
  financial: {
    entryInvestment: "Free to $500 depending on course choices",
    month6Income: "Pre-revenue / pre-employment",
    year1Income: "$45K–$70K",
    year3Income: "$90K–$130K",
  },
  firstTask: {
    title: "Start today",
    deadline: "Due in 7 days",
    description:
      "Complete the first task from your chosen path. Spend at least 2 focused hours on it.",
    deliverable:
      "A URL, file, or document that proves you started — something you could show someone.",
  },
};

/* ─────────────────────────── Route handler ─────────────────────────── */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, ...data } = body;

  const hasApiKey = !!process.env.ANTHROPIC_API_KEY;

  if (action === "hypotheses") {
    if (!hasApiKey) {
      await new Promise((r) => setTimeout(r, 1800)); // simulate latency
      return NextResponse.json(MOCK_HYPOTHESES);
    }
    const msg = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [{ role: "user", content: hypothesesPrompt(data as UserProfile) }],
    });
    const text = msg.content[0].type === "text" ? msg.content[0].text : "{}";
    const match = text.match(/\{[\s\S]*\}/);
    return NextResponse.json(JSON.parse(match?.[0] ?? "{}"));
  }

  if (action === "roadmap") {
    if (!hasApiKey) {
      await new Promise((r) => setTimeout(r, 1200));
      return NextResponse.json(MOCK_ROADMAP);
    }
    const { hypothesis, profile } = data as {
      hypothesis: Hypothesis;
      profile: UserProfile;
    };
    const msg = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [{ role: "user", content: roadmapPrompt(hypothesis, profile) }],
    });
    const text = msg.content[0].type === "text" ? msg.content[0].text : "{}";
    const match = text.match(/\{[\s\S]*\}/);
    return NextResponse.json(JSON.parse(match?.[0] ?? "{}"));
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
