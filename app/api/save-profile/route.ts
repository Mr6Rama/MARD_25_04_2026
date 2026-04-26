import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { UserProfile } from "@/lib/types";

const FIRST_INITIALS = ["A", "D", "M", "N", "S", "K", "Y", "R", "B", "Z", "G", "T", "E", "F", "I"];
const LAST_INITIALS = ["K", "S", "B", "N", "A", "M", "T", "R", "D", "Z", "O", "U", "J", "H"];
const KZ_CITIES = ["Almaty", "Astana", "Shymkent", "Karaganda", "Aktobe", "Atyrau", "Pavlodar", "Taraz", "Semey", "Aktau", "Kostanay", "Oral"];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { interests, strengths, workStyle, environment, topCareers, voiceTranscript } = body;

    if (!interests?.length || !strengths?.length || !workStyle || !environment) {
      return NextResponse.json({ error: "Incomplete profile data" }, { status: 400 });
    }

    const profile: UserProfile = {
      interests,
      strengths,
      workStyle,
      environment,
      topCareers: topCareers ?? [],
      voiceTranscript: voiceTranscript ?? undefined,
      displayName: `${randomItem(FIRST_INITIALS)}.${randomItem(LAST_INITIALS)}.`,
      city: randomItem(KZ_CITIES),
      createdAt: Date.now(),
    };

    try {
      const docRef = await addDoc(collection(db, "profiles"), profile);
      return NextResponse.json({ profileId: docRef.id });
    } catch {
      // Firestore unavailable — profile not persisted, not critical
      return NextResponse.json({ profileId: null });
    }
  } catch (error) {
    console.error("Save profile error:", error);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}
