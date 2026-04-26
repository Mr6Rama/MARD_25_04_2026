import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { CAREERS } from "@/data/careers";
import { QuizAnswers, CareerMatch } from "@/lib/types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const careerList = CAREERS.map((c) => `- ${c.id}: ${c.name} (${c.category})`).join("\n");

export async function POST(req: NextRequest) {
  try {
    const body: QuizAnswers = await req.json();
    const { interests, strengths, workStyle, environment, voiceTranscript } = body;

    if (!interests?.length || !strengths?.length || !workStyle || !environment) {
      return NextResponse.json({ error: "Incomplete quiz answers" }, { status: 400 });
    }

    const voiceSection = voiceTranscript?.trim()
      ? `\n- Voice Self-Description: "${voiceTranscript.trim()}"`
      : "";

    const prompt = `You are Prisma's career guidance AI for students in Kazakhstan.

User Profile:
- Interests: ${interests.join(", ")}
- Strengths: ${strengths.join(", ")}
- Work Style: ${workStyle}
- Preferred Environment: ${environment}${voiceSection}

Available Careers:
${careerList}

Return a JSON object with a "matches" array of exactly 7 careers from the available list, ordered from highest to lowest fit. Each match must include:
- careerId (string, must be an exact id from the available careers list)
- careerName (string)
- matchScore (integer between 52 and 96, be realistic — vary scores meaningfully)
- reason (string, 1 concise sentence explaining the core fit)
- highlights (array of exactly 3 short strings, specific alignment points between the profile and the career)

${voiceTranscript ? "IMPORTANT: The voice self-description provides direct qualitative signal — weight it alongside the structured profile." : ""}

IMPORTANT: Vary the scores realistically. Not everything should be 80%+. The top match can be 90-96%, the bottom should be around 52-65%. The distribution should feel genuine, not artificially inflated.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const data = JSON.parse(response.choices[0].message.content ?? "{}");

    if (!data.matches || !Array.isArray(data.matches)) {
      throw new Error("Invalid response structure from OpenAI");
    }

    const validated: CareerMatch[] = data.matches
      .filter((m: CareerMatch) => CAREERS.some((c) => c.id === m.careerId))
      .slice(0, 7);

    return NextResponse.json({ matches: validated });
  } catch (error) {
    console.error("Career match error:", error);
    return NextResponse.json(
      { error: "Failed to process career matches. Check your OPENAI_API_KEY." },
      { status: 500 }
    );
  }
}
