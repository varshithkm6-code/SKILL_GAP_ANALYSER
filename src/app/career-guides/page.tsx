// src/app/career-guides/page.tsx
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CAREER_GUIDES_DATA } from "@/data/careerGuides";
import { Compass, TrendingUp, ArrowRight, Award, CheckCircle2, BookOpen, Sparkles } from "lucide-react";

export const metadata = {
  title: "Career Guides & Tech Salary Ladders in India — SkillBridge",
  description: "Comprehensive career guides for Indian tech roles: Data Scientist, AI Engineer, Full-Stack Developer, and DevOps Architect. Salary ladders, day-in-the-life, and interview tips.",
};

export default function CareerGuidesCatalogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-surface border-b border-border py-14 sm:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
              <Compass className="w-3.5 h-3.5" />
              <span>Realistic Salary Ladders · Day-in-the-Life · Hiring Rubrics</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
              In-Depth Tech{" "}
              <span className="gradient-text">Career Guides</span>
            </h1>

            <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
              Straight answers on tech careers in India: what you actually do day-to-day, what skills hiring managers evaluate, realistic salary progressions, and how to prepare.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-semibold text-muted">
              <div><span className="font-bold text-ink">4-Tier</span> Verified Salary Ladders</div>
              <span>·</span>
              <div><span className="font-bold text-ink">Real</span> Interview Questions &amp; Hints</div>
              <span>·</span>
              <div><span className="font-bold text-ink">Direct</span> Skill Gap Alignment</div>
            </div>
          </div>
        </section>

        {/* Guides Cards Grid */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CAREER_GUIDES_DATA.map((guide) => (
              <div
                key={guide.slug}
                className="rounded-3xl border border-border bg-surface hover:border-primary/40 hover:shadow-xl transition-all duration-300 p-8 flex flex-col justify-between group space-y-6"
              >
                <div className="space-y-5">
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl p-2.5 rounded-2xl bg-canvas border border-border group-hover:scale-105 transition-transform">
                        {guide.icon}
                      </span>
                      <div>
                        <h3 className="text-2xl font-extrabold text-ink group-hover:text-primary transition-colors">
                          {guide.title}
                        </h3>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>{guide.salaryLadder[0].range} → {guide.salaryLadder[guide.salaryLadder.length - 1].range}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {guide.shortDesc}
                  </p>

                  {/* Salary Progression Snapshot */}
                  <div className="p-4 rounded-2xl bg-canvas border border-border/80 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                      Indian Salary Progression Ladder:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {guide.salaryLadder.map((tier) => (
                        <div key={tier.level} className="flex flex-col p-2 rounded-lg bg-surface border border-border/60">
                          <span className="text-[10px] text-muted font-medium">{tier.level.split(" (")[0]}</span>
                          <span className="font-extrabold text-ink">{tier.range}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Skills */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">Critical Competencies:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {guide.coreSkills.slice(0, 4).map((skill) => (
                        <span key={skill.name} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-surface-subtle text-ink border border-border">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href={`/career-guides/${guide.slug}`}
                    className="btn-primary text-xs font-bold w-full sm:w-auto flex-1 justify-center gap-2"
                  >
                    <span>Read Complete Career Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/register"
                    className="btn-secondary text-xs font-semibold w-full sm:w-auto justify-center"
                  >
                    Audit My Fit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
