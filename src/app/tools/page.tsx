// src/app/tools/page.tsx
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Wrench, FileText, Target, Calculator, Bot, Award, CheckCircle2, ArrowRight, Sparkles, PlayCircle } from "lucide-react";

export const metadata = {
  title: "Free Career Tools & Analyzers — SkillBridge India",
  description: "Explore free, instant career tools: ATS Resume Builder, Deterministic Skill Gap Analyzer, Salary Benchmark Calculator, and Interview Simulator.",
};

export default function ToolsHubPage() {
  const tools = [
    {
      title: "ATS Resume Builder",
      href: "/tools/resume-builder",
      icon: "📄",
      badge: "Most Popular",
      desc: "Live interactive builder that formats your resume for Applicant Tracking Systems (ATS). Download, print, or copy instantly without sign-up.",
      features: ["Live Real-Time Preview", "1-Click PDF & Print Export", "Role Preset Auto-Fills", "Zero Watermarks"],
      cta: "Build My Resume Free →",
      isPrimary: true,
    },
    {
      title: "Clinical Skill Gap Analyzer",
      href: "/register",
      icon: "🎯",
      badge: "Clinical Math",
      desc: "Benchmark your current competencies against 12+ industry role standards. Receive a deterministic 0–100 readiness score with categorized gap breakdown.",
      features: ["Evidence-Weighted Scoring", "Core vs Depth Weighting", "Zero Demographic Bias", "Live Radar Diagram"],
      cta: "Analyze My Skill Gap →",
      isPrimary: false,
    },
    {
      title: "Interactive Web Demo",
      href: "/webdemo",
      icon: "⚡",
      badge: "Self-Guided Tour",
      desc: "Experience the Personio-style interactive walkthrough of our readiness engine, live score recalculation, and counselor dashboards with zero sign-up.",
      features: ["Hands-On Sandbox", "Interactive Weight Sliders", "Simulated Roadmap Recalibration", "Counselor Cohort Analytics"],
      cta: "Launch Interactive Tour →",
      isPrimary: false,
    },
    {
      title: "Role Benchmark Explorer",
      href: "/roles",
      icon: "🧭",
      badge: "12+ Standards",
      desc: "Deep-dive into 114+ tracked competencies, proficiency level rubrics (1 to 5), and nice-to-have skill weights across tech roles in India.",
      features: ["Tiered Proficiency Rubrics", "Skill Weights & Multipliers", "Nice-to-Have Bonus Map", "Salary Expectations"],
      cta: "Explore Role Standards →",
      isPrimary: false,
    },
    {
      title: "30/60/90-Day Learning Plan",
      href: "/dashboard",
      icon: "📅",
      badge: "Automated",
      desc: "Turn identified critical skill deficiencies into an executable, milestone-driven roadmap that recalculates your score in real-time as you complete tasks.",
      features: ["Milestone Checklists", "Dynamic Recalibration", "Evidence Verification", "Exportable Plan"],
      cta: "View Sample Roadmap →",
      isPrimary: false,
    },
    {
      title: "Counselor & Campus Analytics",
      href: "/counselor",
      icon: "👥",
      badge: "Institutional",
      desc: "For colleges and training institutes: monitor student cohort readiness, track skill distributions, and flag at-risk candidates for targeted intervention.",
      features: ["Cohort Readiness Index", "At-Risk Warning Flags", "Curriculum Gap Analysis", "Audit Logs"],
      cta: "Access Counselor Portal →",
      isPrimary: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-surface border-b border-border py-14 sm:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
              <Wrench className="w-3.5 h-3.5" />
              <span>100% Free · No Credit Card · Instant In-Browser Access</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
              Free Career Tools for{" "}
              <span className="gradient-text">Job Readiness</span>
            </h1>

            <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
              Practical, recruiter-tested career utilities designed to help Indian engineers and learners build ATS-ready resumes, pinpoint skill gaps, and navigate tech hiring benchmarks.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-muted">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-status-strong" /> 100% In-Browser</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-status-strong" /> No Sign-Up Barrier for Free Tools</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-status-strong" /> ATS Recruiter Compliant</span>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-14 sm:py-20">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {tools.map((tool) => (
                <div
                  key={tool.title}
                  className={`rounded-2xl p-7 border transition-all duration-300 flex flex-col justify-between ${
                    tool.isPrimary
                      ? "bg-surface border-primary/40 shadow-lg shadow-primary/5 hover:border-primary hover:-translate-y-1.5"
                      : "bg-surface border-border hover:border-primary/30 hover:shadow-md hover:-translate-y-1"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-3xl p-2.5 rounded-xl bg-canvas border border-border/80">
                        {tool.icon}
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        tool.isPrimary
                          ? "bg-primary text-white"
                          : "bg-surface-subtle text-primary border border-border"
                      }`}>
                        {tool.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-ink mb-2">{tool.title}</h3>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">{tool.desc}</p>
                    </div>

                    <div className="pt-2 border-t border-border/60 space-y-1.5">
                      <span className="text-[11px] font-bold text-ink uppercase tracking-wider block">Key Features:</span>
                      <ul className="space-y-1 text-xs text-muted">
                        {tool.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border/60">
                    <Link
                      href={tool.href}
                      className={tool.isPrimary ? "btn-primary w-full text-xs font-bold" : "btn-secondary w-full text-xs font-bold"}
                    >
                      {tool.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Banner for Personio-style Web Demo */}
        <section className="pb-20">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0B0D1B 0%, #1A1F3D 50%, #2A1F4D 100%)" }}>
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  ⚡ Interactive Product Tour
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Want to see the entire platform in action before signing up?
                </h2>
                <p className="text-sm text-white/70 leading-relaxed">
                  Try our Personio-inspired interactive web demo. Walk through profile intake, deterministic gap audit, interactive score recalculation, and counselor analytics in real-time.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link href="/webdemo" className="btn-primary text-xs font-bold px-6 py-3 h-11 bg-indigo-500 hover:bg-indigo-400">
                    Launch Interactive Tour
                  </Link>
                  <Link href="/tools/resume-builder" className="btn-secondary text-xs font-semibold px-5 py-3 h-11 bg-white/10 text-white border-white/20 hover:bg-white/20">
                    Try Resume Builder Free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
