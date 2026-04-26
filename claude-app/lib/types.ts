export interface QuizAnswers {
  interests: string[];
  strengths: string[];
  workStyle: string;
  environment: string;
  voiceTranscript?: string;
}

export interface CareerMatch {
  careerId: string;
  careerName: string;
  matchScore: number;
  reason: string;
  highlights: string[];
}

export interface SurveyQuestion {
  id: string;
  question: string;
  scenario: string;
  positiveWeight: number;
}

export interface Career {
  id: string;
  name: string;
  description: string;
  category: "technology" | "science" | "business" | "creative" | "social" | "engineering" | "health" | "law";
  matchTags: string[];
  requiredSkills: string[];
  typicalTasks: string[];
  salaryRange: {
    kz: { min: number; max: number };
    us: { min: number; max: number };
  };
  growthOutlook: "excellent" | "good" | "moderate";
  timeToEnter: string;
  keyCompanies: string[];
  surveyQuestions: SurveyQuestion[];
}

export interface University {
  id: string;
  name: string;
  country: "KZ" | "US" | "UK" | "EU";
  city: string;
  difficulty: "reach" | "match" | "safety";
  relevantCareers: string[];
  avgTuition: string;
  ranking?: string;
  programs: string[];
  applicationUrl: string;
  notes?: string;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  type: "government" | "university" | "international" | "corporate";
  amount: string;
  eligibility: string[];
  deadline: string;
  relevantCareers: string[];
  applicationUrl: string;
  notes?: string;
}

export interface Internship {
  id: string;
  name: string;
  role: string;
  location: string;
  type: "remote" | "onsite" | "hybrid";
  duration: string;
  relevantCareers: string[];
  requirements: string[];
  howToApply: string;
  applicationUrl: string;
}

export interface RoadmapStep {
  period: string;
  title: string;
  actions: string[];
  milestone: string;
}

export interface GeneratedRoadmap {
  actionPlan: RoadmapStep[];
  requiredExams: Array<{
    name: string;
    targetScore: string;
    prepTime: string;
    resources: string[];
  }>;
  keySkills: Array<{
    skill: string;
    howToLearn: string;
    timeInvest: string;
  }>;
  portfolioProjects: Array<{
    title: string;
    description: string;
    impact: string;
  }>;
}

export interface UserProfile {
  id?: string;
  interests: string[];
  strengths: string[];
  workStyle: string;
  environment: string;
  topCareers: string[];
  voiceTranscript?: string;
  displayName: string;
  city: string;
  createdAt?: number;
}

export interface SimilarProfile {
  displayName: string;
  city: string;
  similarity: number;
  sharedInterests: string[];
  sharedStrengths: string[];
  topCareer: string;
  topCareerId: string;
}
