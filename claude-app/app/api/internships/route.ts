import { NextRequest, NextResponse } from "next/server";
import { INTERNSHIPS } from "@/data/internships";
import { Internship } from "@/lib/types";

interface JasaOpportunity {
  id?: string;
  title?: string;
  company?: string;
  location?: string;
  type?: string;
  deadline?: string;
  url?: string;
  description?: string;
  requirements?: string[];
  tags?: string[];
}

function mapJasaToInternship(o: JasaOpportunity, index: number): Internship {
  return {
    id: `jasa-${o.id ?? index}`,
    name: o.company ?? o.title ?? "Opportunity",
    role: o.title ?? "Position",
    location: o.location ?? "Kazakhstan",
    type: (o.type as Internship["type"]) ?? "hybrid",
    duration: o.deadline ? `Until ${o.deadline}` : "3–6 months",
    relevantCareers: o.tags ?? [],
    requirements: o.requirements ?? [],
    howToApply: "Apply through the company portal",
    applicationUrl: o.url ?? "https://www.jasa.dev/opportunities",
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const careerId = searchParams.get("career") ?? "";

  // Try fetching live opportunities from jasa.dev
  try {
    const res = await fetch("https://api.jasa.dev/v1/opportunities", {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const contentType = res.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        const list: JasaOpportunity[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.opportunities)
          ? data.opportunities
          : [];

        if (list.length > 0) {
          const mapped = list.slice(0, 20).map(mapJasaToInternship);
          return NextResponse.json({ internships: mapped, source: "jasa" });
        }
      }
    }
  } catch {
    // jasa.dev unreachable — fall through to static
  }

  // Fallback: static data filtered by career
  const filtered = careerId
    ? INTERNSHIPS.filter((i) => i.relevantCareers.includes(careerId))
    : INTERNSHIPS;

  return NextResponse.json({ internships: filtered.slice(0, 12), source: "static" });
}
