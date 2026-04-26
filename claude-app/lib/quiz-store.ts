import { QuizAnswers, CareerMatch } from "./types";

const QUIZ_KEY = "prisma_quiz_answers";
const MATCHES_KEY = "prisma_career_matches";
const SURVEY_KEY = "prisma_survey_scores";
const VOICE_KEY = "prisma_voice_transcript";

export function saveQuizAnswers(answers: QuizAnswers): void {
  sessionStorage.setItem(QUIZ_KEY, JSON.stringify(answers));
}

export function getQuizAnswers(): QuizAnswers | null {
  try {
    const data = sessionStorage.getItem(QUIZ_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveCareerMatches(matches: CareerMatch[]): void {
  sessionStorage.setItem(MATCHES_KEY, JSON.stringify(matches));
}

export function getCareerMatches(): CareerMatch[] | null {
  try {
    const data = sessionStorage.getItem(MATCHES_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveSurveyScore(careerId: string, adjustedScore: number): void {
  try {
    const existing = getSurveyScores();
    existing[careerId] = adjustedScore;
    sessionStorage.setItem(SURVEY_KEY, JSON.stringify(existing));
  } catch {
    // sessionStorage unavailable
  }
}

export function getSurveyScores(): Record<string, number> {
  try {
    const data = sessionStorage.getItem(SURVEY_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function saveVoiceTranscript(transcript: string): void {
  try {
    sessionStorage.setItem(VOICE_KEY, transcript);
  } catch {
    // ignore
  }
}

export function getVoiceTranscript(): string | null {
  try {
    return sessionStorage.getItem(VOICE_KEY);
  } catch {
    return null;
  }
}

export function clearSession(): void {
  sessionStorage.removeItem(QUIZ_KEY);
  sessionStorage.removeItem(MATCHES_KEY);
  sessionStorage.removeItem(SURVEY_KEY);
  sessionStorage.removeItem(VOICE_KEY);
}
