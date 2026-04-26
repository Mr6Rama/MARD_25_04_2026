import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { CAREERS, getCareerById } from "@/data/careers";
import { GeneratedRoadmap } from "@/lib/types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { careerId, adjustedScore } = await req.json();

    if (!careerId) {
      return NextResponse.json({ error: "careerId is required" }, { status: 400 });
    }

    const career = getCareerById(careerId);
    if (!career) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    const prompt = `You are Prisma's career guidance AI. Generate a concrete, actionable roadmap for a student in Kazakhstan pursuing ${career.name}.

Career context:
- Name: ${career.name}
- Required skills: ${career.requiredSkills.join(", ")}
- Match score: ${adjustedScore ?? 75}%
- Time to enter: ${career.timeToEnter}

Generate a JSON object with this exact structure:
{
  "actionPlan": [
    {
      "period": "Months 1–2",
      "title": "Foundation",
      "actions": ["action 1", "action 2", "action 3"],
      "milestone": "what they achieve by end of this period"
    }
  ],
  "requiredExams": [
    {
      "name": "exam name",
      "targetScore": "e.g. 1400+ SAT",
      "prepTime": "e.g. 6 months",
      "resources": ["Khan Academy", "Official prep guide"]
    }
  ],
  "keySkills": [
    {
      "skill": "skill name",
      "howToLearn": "specific resource or method",
      "timeInvest": "e.g. 30 min/day for 3 months"
    }
  ],
  "portfolioProjects": [
    {
      "title": "project title",
      "description": "what to build and why",
      "impact": "what this demonstrates to universities/employers"
    }
  ]
}

Requirements:
- actionPlan: 4 periods covering months 1–12. Each period has 3–4 specific actions.
- requiredExams: 2–4 relevant exams (IELTS/TOEFL always included; SAT, subject tests, etc. as relevant)
- keySkills: 4–5 most important skills with specific learning resources
- portfolioProjects: 3 concrete projects appropriate to the career

Be specific, realistic, and tailored to the Kazakhstan student context. Use real platforms, resources, and organizations.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.6,
    });

    const roadmap: GeneratedRoadmap = JSON.parse(response.choices[0].message.content ?? "{}");

    return NextResponse.json({ roadmap, career: { id: career.id, name: career.name, description: career.description } });
  } catch (error) {
    console.error("Roadmap generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate roadmap. Check your OPENAI_API_KEY." },
      { status: 500 }
    );
  }
}
