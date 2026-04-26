import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { SAMPLE_PROFILES } from "@/data/sample-profiles";
import { UserProfile, SimilarProfile } from "@/lib/types";

const INTEREST_LABELS: Record<string, string> = {
  technology: "Technology",
  design: "Art & Design",
  science: "Science & Research",
  business: "Business & Finance",
  people: "People & Social",
  writing: "Writing & Media",
  nature: "Nature & Environment",
  law: "Law & Justice",
  health: "Health & Medicine",
  education: "Education & Training",
};

const STRENGTH_LABELS: Record<string, string> = {
  analytical: "Analytical Thinking",
  creative: "Creative Thinking",
  leadership: "Leadership",
  communication: "Communication",
  technical: "Technical Aptitude",
  "problem-solving": "Problem Solving",
  empathy: "Empathy",
  organization: "Organization",
  research: "Research",
  persuasion: "Persuasion",
};

const CAREER_NAMES: Record<string, string> = {
  "software-engineering": "Software Engineering",
  "data-science": "Data Science & ML",
  "ux-ui-design": "UX/UI Design",
  "product-management": "Product Management",
  "medicine": "Medicine",
  "architecture": "Architecture",
  "finance-banking": "Finance & Banking",
  "law": "Law",
  "psychology": "Psychology",
  "civil-engineering": "Civil Engineering",
  "marketing": "Marketing",
  "journalism-media": "Journalism & Media",
  "biotechnology": "Biotechnology",
  "international-relations": "International Relations",
  "entrepreneurship": "Entrepreneurship",
};

function jaccard(a: string[], b: string[]): number {
  if (a.length === 0 && b.length === 0) return 1;
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = [...setA].filter((x) => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}

function computeSimilarity(user: UserProfile, profile: UserProfile): number {
  const jInterests = jaccard(user.interests, profile.interests);
  const jStrengths = jaccard(user.strengths, profile.strengths);
  const workMatch = user.workStyle === profile.workStyle ? 1 : 0;
  const envMatch = user.environment === profile.environment ? 1 : 0;
  return jInterests * 0.40 + jStrengths * 0.40 + workMatch * 0.10 + envMatch * 0.10;
}

export async function POST(req: NextRequest) {
  try {
    const user: UserProfile = await req.json();

    // Merge sample profiles with real Firestore profiles
    let profiles: UserProfile[] = [...SAMPLE_PROFILES];
    try {
      const q = query(collection(db, "profiles"), limit(100));
      const snapshot = await getDocs(q);
      const real = snapshot.docs.map((d) => d.data() as UserProfile);
      profiles = [...profiles, ...real];
    } catch {
      // Firestore unavailable — use sample profiles only
    }

    const scored: SimilarProfile[] = profiles.map((profile) => {
      const similarity = computeSimilarity(user, profile);
      const sharedInterests = user.interests
        .filter((i) => profile.interests.includes(i))
        .map((i) => INTEREST_LABELS[i] ?? i);
      const sharedStrengths = user.strengths
        .filter((s) => profile.strengths.includes(s))
        .map((s) => STRENGTH_LABELS[s] ?? s);
      const topCareerId = profile.topCareers[0] ?? "";
      return {
        displayName: profile.displayName,
        city: profile.city,
        similarity: Math.round(similarity * 100),
        sharedInterests,
        sharedStrengths,
        topCareer: CAREER_NAMES[topCareerId] ?? topCareerId,
        topCareerId,
      };
    });

    const top3 = scored.sort((a, b) => b.similarity - a.similarity).slice(0, 3);
    return NextResponse.json({ profiles: top3 });
  } catch (error) {
    console.error("Similar profiles error:", error);
    return NextResponse.json({ error: "Failed to compute similar profiles" }, { status: 500 });
  }
}
