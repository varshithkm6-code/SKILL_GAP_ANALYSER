// src/app/about/page.tsx
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Scale, ShieldCheck, Lock, Award, Heart, CheckCircle2, ArrowRight, Sparkles, Users } from "lucide-react";

export const metadata = {
  title: "About Us & Clinical Scoring Methodology — SkillBridge India",
  description: "Learn why SkillBridge was created: an independent, deterministic career intelligence platform with zero demographic bias and 100% mathematically auditable scoring.",
};

export default function AboutPage() {
  const pillars = [
    { title: "Core Skill Coverage (40%)", desc: "Measures whether the candidate possesses the indispensable baseline competencies mandated for the role benchmark." },
    { title: "Proficiency Depth (30%)", desc: "Evaluates whether practical ability meets or exceeds required rubric thresholds (Levels 1 through 5)." },
    { title: "Evidence Tier Reliability (20%)", desc: "Weights demonstrated proof higher than self-attestation: verified production work > certs > personal repos > self-ratings." },
    { title: "Nice-to-Have Tech Bonus (5%)", desc: "Rewards complementary tools (e.g. Docker, Tailwind, Redis) that provide competitive edge on the job." },
    { title: "Soft Skills & Communication (5%)", desc: "Measures essential workplace durability including executive storytelling, teamwork, and cross-functional agility." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-surface border-b border-border py-14 sm:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Independent · Non-Commercial · Objective Career Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
              Closing the Gap Between{" "}
              <span className="gradient-text">Degrees &amp; Employability</span>
            </h1>

            <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
              Every learner in India deserves an honest, transparent, and practical path from education to industry employment. We exist to provide transparent answers without algorithmic hype.
            </p>
          </div>
        </section>

        {/* Origin Story & Vision */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-14 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Our Purpose</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
                Why SkillBridge was created
              </h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Millions of talented students graduate each year across India, yet many struggle to connect classroom syllabi with what the modern job market actually rewards. Resumes get discarded by automated Applicant Tracking Systems, while students are left guessing what skills they lack.
              </p>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                SkillBridge was founded around a simple, powerful principle: <b>replace subjective guesswork with clinical-grade, deterministic measurement.</b> We are an independent educational resource — not a placement agency and not a commercial bootcamp. That independence allows us to provide unvarnished, truthful guidance on salary bands, real-world skill expectations, and verified learning roadmaps.
              </p>
              <div className="pt-2">
                <Link href="/webdemo" className="btn-primary text-xs font-bold px-5 py-2.5">
                  Experience Our Interactive Tour →
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-surface border border-border shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-ink">Our Core Commitments</h3>
              <ul className="space-y-3.5 text-xs text-muted">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <b className="text-ink">Practical, Not Theoretical.</b> Every benchmark is mapped directly to live production tech stacks, not obsolete textbook questions.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <b className="text-ink">Mathematical Auditability.</b> 100% of the score is computed via reproducible math formulas. Zero black-box generative AI bias.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <b className="text-ink">Contextualized for India.</b> Salary bands, educational pathways, and government accreditation schemes are built for Indian candidates.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* 5-Pillar Mathematical Engine */}
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Methodology</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
                The 5-Pillar Deterministic Engine
              </h2>
              <p className="text-xs text-muted">
                How every candidate&apos;s Career Readiness Score (0 to 100) is calculated without bias.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map((pillar, i) => (
                <div key={pillar.title} className="p-6 rounded-2xl bg-surface border border-border space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-primary-subtle text-primary font-bold text-xs flex items-center justify-center">
                    0{i + 1}
                  </div>
                  <h4 className="text-sm font-bold text-ink">{pillar.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900 to-purple-900 text-white space-y-2 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">100% Auditable</h4>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    Zero demographic variables (name, age, gender, college prestige) are factored into scoring, guaranteeing fairness.
                  </p>
                </div>
                <Link href="/register" className="btn-glass text-xs font-bold text-white">
                  Test My Readiness →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
