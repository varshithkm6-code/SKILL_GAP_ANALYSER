// src/app/career-guides/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CAREER_GUIDES_DATA } from "@/data/careerGuides";
import {
  TrendingUp,
  Clock,
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Briefcase,
  HelpCircle,
  Calendar,
  Layers,
  ChevronRight
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CAREER_GUIDES_DATA.map((guide) => ({
    slug: guide.slug,
  }));
}

export default async function CareerGuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = CAREER_GUIDES_DATA.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-surface border-b border-border py-12 sm:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs text-muted mb-4">
              <Link href="/" className="hover:text-primary transition">Home</Link>
              <span>/</span>
              <Link href="/career-guides" className="hover:text-primary transition">Career Guides</Link>
              <span>/</span>
              <span className="font-semibold text-ink">{guide.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Indian Tech Career Roadmap · 2026 Hiring Benchmark</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-4xl">{guide.icon}</span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
                    {guide.title} Career Guide
                  </h1>
                </div>

                <p className="text-sm sm:text-base text-muted leading-relaxed max-w-2xl">
                  {guide.overview}
                </p>

                {/* Salary Range Banner */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold">
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    <TrendingUp className="w-4 h-4" />
                    <span>Compensation Range: {guide.salaryLadder[0].range} to {guide.salaryLadder[guide.salaryLadder.length - 1].range}</span>
                  </div>
                </div>
              </div>

              {/* Action Box */}
              <div className="lg:col-span-4">
                <div className="rounded-2xl p-6 bg-canvas border border-border shadow-md space-y-4 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary block">
                    Know Where You Stand
                  </span>
                  <h3 className="text-lg font-extrabold text-ink">
                    Benchmark Your {guide.title} Fit
                  </h3>
                  <p className="text-xs text-muted">
                    Test your current competencies against {guide.title} industry benchmarks and get a personalized 30/60/90-day action plan.
                  </p>
                  <Link
                    href="/register"
                    className="btn-primary w-full text-xs font-bold justify-center h-11"
                  >
                    <span>Test My Readiness Score →</span>
                  </Link>
                  <Link
                    href="/tools/resume-builder"
                    className="btn-secondary w-full text-xs font-semibold justify-center h-10"
                  >
                    Build {guide.title} Resume
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-14">
          {/* A Day in the Life Timeline */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Daily Routine</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
                A Day in the Life of a {guide.title} in India
              </h2>
              <p className="text-xs sm:text-sm text-muted">
                What does a typical day look like at top product companies in Bengaluru, Hyderabad, or Gurugram?
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-surface border border-border space-y-4">
              {guide.dayInTheLife.map((step, i) => {
                const [time, ...rest] = step.split(": ");
                return (
                  <div key={time} className="flex items-start gap-4 pb-4 border-b border-border/60 last:border-none last:pb-0">
                    <span className="px-3 py-1 rounded-lg bg-primary-subtle text-primary font-mono text-xs font-bold shrink-0">
                      {time}
                    </span>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed pt-0.5">
                      {rest.join(": ")}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Salary Progression Ladder */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Indian Market Compensation</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
                {guide.title} Salary Progression Ladder (LPA)
              </h2>
              <p className="text-xs sm:text-sm text-muted">
                Compensation data reflects real Indian tech hiring benchmarks across Tier-1 and Tier-2 product organizations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {guide.salaryLadder.map((tier, i) => (
                <div
                  key={tier.level}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    i === 2
                      ? "bg-surface border-primary/40 shadow-md"
                      : "bg-surface border-border"
                  }`}
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-subtle text-muted uppercase tracking-wider">
                      Tier {i + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-ink">{tier.level}</h4>
                      <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                        {tier.range}
                      </div>
                      {tier.equityOrBonus && (
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 block mt-0.5">
                          {tier.equityOrBonus}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted leading-relaxed pt-2 border-t border-border/60">
                      {tier.focus}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Skills Matrix */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Competency Matrix</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
                Core &amp; Technical Skills Evaluated
              </h2>
              <p className="text-xs sm:text-sm text-muted">
                How hiring managers evaluate your technical depth during interviews.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guide.coreSkills.map((skill) => (
                <div key={skill.name} className="p-5 rounded-2xl bg-surface border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-ink">{skill.name}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      skill.importance === "Critical"
                        ? "bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20"
                        : skill.importance === "High"
                        ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                        : "bg-surface-subtle text-muted border border-border"
                    }`}>
                      {skill.importance}
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Interview Questions & Hints */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Interview Prep</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
                Common Technical Interview Questions
              </h2>
              <p className="text-xs sm:text-sm text-muted">
                Real questions asked in Indian tech interview rounds with expert guidance.
              </p>
            </div>

            <div className="space-y-4">
              {guide.interviewQuestions.map((item, i) => (
                <div key={item.question} className="p-6 rounded-2xl bg-surface border border-border space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-primary-subtle text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      Q{i + 1}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-ink">
                      {item.question}
                    </h4>
                  </div>
                  <div className="pl-10 p-3 rounded-xl bg-canvas border border-border/80 text-xs text-muted leading-relaxed">
                    <span className="font-bold text-ink block mb-0.5">💡 Solution Insight:</span>
                    {item.hint}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4-Stage Learning Roadmap */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Step-by-Step Path</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
                6-Month Execution Playbook
              </h2>
              <p className="text-xs sm:text-sm text-muted">
                Clear milestones from baseline fundamentals to landing offers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {guide.learningRoadmapSteps.map((step, i) => (
                <div key={step.title} className="p-6 rounded-2xl bg-surface border border-border space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-muted">
                      <span>Step {i + 1}</span>
                      <span className="text-primary">{step.timeline}</span>
                    </div>
                    <h4 className="text-sm font-bold text-ink">{step.title}</h4>
                    <p className="text-xs text-muted leading-relaxed">{step.milestone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Card */}
          <div className="rounded-3xl p-8 sm:p-12 text-center space-y-5 bg-gradient-to-r from-indigo-900 via-indigo-950 to-purple-900 text-white">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Benchmark your readiness for {guide.title} now
            </h3>
            <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto">
              Our deterministic scoring engine will evaluate your profile against these exact benchmarks with zero AI bias and 100% mathematical auditability.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link href="/register" className="btn-glass text-xs font-bold px-7 py-3 h-12">
                Analyze My Skill Gap Free →
              </Link>
              <Link href="/career-guides" className="btn-secondary text-xs font-semibold px-5 py-3 h-12 bg-white/10 text-white border-white/20 hover:bg-white/20">
                Explore Other Guides
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
