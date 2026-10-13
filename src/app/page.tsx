// src/app/page.tsx
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Chip } from "@/components/ui/Chip";
import { ScoreGauge } from "@/components/dashboard/ScoreGauge";
import { SkillRadar } from "@/components/dashboard/SkillRadar";
import {
  ShieldCheck,
  Scale,
  Award,
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
  Users,
  TrendingUp,
  Target,
  BookOpen,
  Star,
  PlayCircle,
  FileText,
  Compass,
  Building2,
  Wrench,
  Sparkles
} from "lucide-react";

export default async function HomePage() {
  const session = await auth();
  if (session) redirect("/hub");

  const sampleRadar = [
    { skill: "React", user: 4, required: 3 },
    { skill: "TypeScript", user: 3, required: 3 },
    { skill: "Next.js", user: 3, required: 2 },
    { skill: "System Design", user: 2, required: 3 },
    { skill: "Testing", user: 3, required: 3 },
    { skill: "CSS", user: 4, required: 3 },
  ];

  const stats = [
    { value: "12+", label: "Role Benchmarks" },
    { value: "114", label: "Skills Tracked" },
    { value: "100%", label: "Deterministic Math" },
    { value: "0ms", label: "AI Bias" },
  ];

  const steps = [
    {
      num: "01",
      icon: BookOpen,
      title: "Intake Your Profile & Proof",
      desc: "Upload your resume or enter competencies with verified proof tiers — certifications, work experience, or code repos.",
      color: "#4F46E5",
    },
    {
      num: "02",
      icon: Target,
      title: "Deterministic Gap Scoring",
      desc: "Our mathematical engine measures Core Skills (40%), Proficiency Depth (30%), Evidence (20%), Bonuses (10%) — zero hallucinations.",
      color: "#7C3AED",
    },
    {
      num: "03",
      icon: TrendingUp,
      title: "Live 30/60/90-Day Roadmap",
      desc: "Execute your prioritized action plan. Complete milestones and watch your Career Readiness Score recalibrate in real time.",
      color: "#06B6D4",
    },
  ];

  const floatingSkills = [
    "React", "TypeScript", "Python", "SQL", "AWS", "Node.js",
    "System Design", "Docker", "PyTorch", "Kubernetes", "Data Analysis",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink relative overflow-hidden">
      <SiteHeader />

      <main className="flex-1">
        {/* Split Hero Section */}
        <section className="relative max-w-[1280px] mx-auto px-4 sm:px-6 pt-12 pb-16 md:pt-16 md:pb-24 w-full">
          {/* Ambient Blurred Blobs */}
          <div
            className="absolute -top-16 -left-20 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10 animate-float-y"
            style={{ background: "radial-gradient(circle, rgba(79,70,229,0.14) 0%, rgba(124,58,237,0.06) 60%, transparent 80%)" }}
            aria-hidden="true"
          />
          <div
            className="absolute top-1/3 -right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10 animate-float-y delay-400"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.06) 60%, transparent 80%)" }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headline, Floating Tags, CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Animated Live Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border shadow-xs animate-fade-in-down">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-ink">
                  🇮🇳 India&apos;s National Skilling Companion &amp; Readiness Analyzer
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-ink leading-[1.12] animate-fade-in-up delay-100">
                Know exactly{" "}
                <span style={{
                  background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #06B6D4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  where you stand
                </span>{" "}
                for your dream tech role.
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-muted max-w-xl leading-relaxed animate-fade-in-up delay-200">
                Objective, deterministic career readiness benchmarks based on real Indian hiring requirements. Discover your skill gaps, generate ATS-friendly resumes, and execute a live recalculating 30/60/90-day learning roadmap.
              </p>

              {/* Floating Skill Chips (SkillsForIndia-inspired) */}
              <div className="flex flex-wrap items-center gap-2 pt-1 animate-fade-in-up delay-300">
                <span className="text-xs text-muted font-bold mr-1">Trending Benchmarks:</span>
                {floatingSkills.slice(0, 7).map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface border border-border text-ink hover:border-primary hover:text-primary transition-all duration-200 cursor-default shadow-2xs hover:-translate-y-0.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 animate-fade-in-up delay-400">
                <Link
                  href="/register"
                  className="btn-primary text-sm px-6 py-3 gap-2 h-12 font-bold shadow-md shadow-primary/20"
                >
                  <span>Analyze My Readiness Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/webdemo"
                  className="btn-secondary text-sm px-5 py-3 h-12 font-semibold flex items-center gap-2"
                >
                  <PlayCircle className="w-4 h-4 text-primary" />
                  <span>Personio-Style Tour</span>
                </Link>
                <Link
                  href="/tools/resume-builder"
                  className="btn-secondary text-sm px-4 py-3 h-12 text-muted hover:text-ink hidden sm:flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume Builder</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-muted animate-fade-in-up delay-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-status-strong" />
                  <span>Deterministic 0–100 math</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Evidence-weighted verification</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-muted" />
                  <span>Zero demographic bias</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Sample Score Card */}
            <div className="lg:col-span-5 animate-scale-in delay-200">
              <div className="relative">
                {/* Ambient glow behind sample card */}
                <div
                  className="absolute -inset-1 rounded-3xl opacity-30 blur-xl pointer-events-none -z-10"
                  style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED, #06B6D4)" }}
                  aria-hidden="true"
                />

                <div className="card p-6 bg-surface shadow-xl space-y-4 border border-border/80">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-muted font-bold block">
                        Live Assessment Preview
                      </span>
                      <span className="text-sm font-bold text-ink">Frontend Developer Benchmark</span>
                    </div>
                    <Chip variant="strong">Job Ready</Chip>
                  </div>

                  {/* Score gauge */}
                  <div className="py-1">
                    <ScoreGauge score={82} confidence={0.92} size={155} />
                  </div>

                  {/* Skill chips */}
                  <div className="space-y-1.5 pt-1 border-t border-border/60">
                    <span className="text-[11px] text-muted font-medium block">Top Competencies Evaluated:</span>
                    <div className="flex flex-wrap gap-1.5">
                      <Chip variant="strong">React (Lvl 4/5)</Chip>
                      <Chip variant="strong">TypeScript (Lvl 3/5)</Chip>
                      <Chip variant="partial">System Design (Lvl 2/3)</Chip>
                      <Chip variant="strong">CSS / UI (Lvl 4/5)</Chip>
                    </div>
                  </div>

                  {/* Mini radar */}
                  <div className="pt-1 border-t border-border/60">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-ink">Radar Alignment</span>
                      <div className="flex items-center gap-3 text-[10px] text-muted">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{background:"#4F46E5"}} />You</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block bg-muted/40" />Required</span>
                      </div>
                    </div>
                    <div className="h-44">
                      <SkillRadar data={sampleRadar} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── National Skilling Trust Signals Ribbon ── */}
        <section className="bg-surface border-y border-border py-6">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <span className="text-xs font-bold text-muted uppercase tracking-wider">
              Aligned with India&apos;s National Skilling Missions
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-ink">
              <span className="px-3 py-1 rounded-full bg-surface-subtle border border-border">Skill India</span>
              <span className="px-3 py-1 rounded-full bg-surface-subtle border border-border">Digital India</span>
              <span className="px-3 py-1 rounded-full bg-surface-subtle border border-border">Make in India</span>
              <span className="px-3 py-1 rounded-full bg-surface-subtle border border-border">Startup India</span>
              <span className="px-3 py-1 rounded-full bg-surface-subtle border border-border">Atmanirbhar Bharat</span>
            </div>
          </div>
        </section>

        {/* ── Animated Stats Bar ── */}
        <section className="py-12 bg-canvas">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  className="text-center p-5 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-colors shadow-2xs"
                >
                  <div className="text-3xl font-extrabold mb-1" style={{
                    background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    {value}
                  </div>
                  <div className="text-xs text-muted font-bold uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Showcase: Courses, Career Guides & Tools ── */}
        <section className="py-16 bg-surface border-y border-border">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block">
                Ecosystem Hubs
              </span>
              <h2 className="text-3xl font-extrabold text-ink">
                Everything you need to become industry-ready
              </h2>
              <p className="text-xs sm:text-sm text-muted">
                Explore structured courses, salary-verified career guides, and free recruitment tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Courses Card */}
              <div className="p-7 rounded-3xl bg-canvas border border-border hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-6 group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-subtle text-primary flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                    📚
                  </div>
                  <h3 className="text-xl font-bold text-ink">Industry Career Courses</h3>
                  <p className="text-xs text-muted leading-relaxed">
                    Explore 24+ structured curricula across AI, Data Science, Full-Stack, and DevOps. Built backward from real tech hiring requirements in India.
                  </p>
                  <div className="space-y-1.5 text-xs text-muted pt-2 border-t border-border/60">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Artificial Intelligence (₹8–35 LPA)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Data Science &amp; ML (₹6–28 LPA)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Full-Stack Development (₹5–25 LPA)</span>
                    </div>
                  </div>
                </div>
                <Link href="/courses" className="btn-primary text-xs font-bold justify-center gap-1.5">
                  <span>Browse All Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Career Guides Card */}
              <div className="p-7 rounded-3xl bg-canvas border border-border hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-6 group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-subtle text-primary flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                    🧭
                  </div>
                  <h3 className="text-xl font-bold text-ink">Tech Career Guides</h3>
                  <p className="text-xs text-muted leading-relaxed">
                    Transparent 4-tier salary progression ladders, day-in-the-life walkthroughs, competency rubrics, and technical interview question banks.
                  </p>
                  <div className="space-y-1.5 text-xs text-muted pt-2 border-t border-border/60">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Data Scientist Career Guide</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>AI &amp; Generative AI Engineer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Cloud &amp; DevOps Architect</span>
                    </div>
                  </div>
                </div>
                <Link href="/career-guides" className="btn-primary text-xs font-bold justify-center gap-1.5">
                  <span>Explore Career Guides</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Free Tools Card */}
              <div className="p-7 rounded-3xl bg-canvas border border-border hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-6 group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-subtle text-primary flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                    📄
                  </div>
                  <h3 className="text-xl font-bold text-ink">Free ATS Resume Builder</h3>
                  <p className="text-xs text-muted leading-relaxed">
                    Build a recruiter-compliant single-column ATS resume with live in-browser preview. One-click PDF print and copy without registration.
                  </p>
                  <div className="space-y-1.5 text-xs text-muted pt-2 border-t border-border/60">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>100% Free · No Watermarks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Real-Time In-Browser PDF Print</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Pre-fill Sample Roles</span>
                    </div>
                  </div>
                </div>
                <Link href="/tools/resume-builder" className="btn-primary text-xs font-bold justify-center gap-1.5">
                  <span>Open Resume Builder</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Personio-Inspired Interactive Web Demo Feature Banner ── */}
        <section className="py-16 bg-canvas">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0B0D1B 0%, #1A1F3D 50%, #2A1F4D 100%)" }}>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>Interactive Product Walkthrough</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                    Experience our platform before creating an account
                  </h2>
                  <p className="text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
                    Test drive the Personio-style interactive demo: simulate resume skill intake, inspect the 5-pillar mathematical engine, check off learning roadmap milestones, and view college cohort analytics.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link href="/webdemo" className="btn-primary text-xs font-bold px-6 py-3 h-11 bg-indigo-500 hover:bg-indigo-400">
                      <span>Launch Interactive Sandbox →</span>
                    </Link>
                    <Link href="/government-skill-programs" className="btn-secondary text-xs font-semibold px-4 py-3 h-11 bg-white/10 text-white border-white/20 hover:bg-white/20">
                      Gov Skill Programs
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-4 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs">
                  <span className="font-bold text-amber-300 uppercase tracking-wider block text-[11px]">
                    Tour Highlights:
                  </span>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-center gap-2">✓ Dynamic 0–100 score recalculator</li>
                    <li className="flex items-center gap-2">✓ Interactive SVG skill radar alignment</li>
                    <li className="flex items-center gap-2">✓ 30/60/90-day milestone checklist</li>
                    <li className="flex items-center gap-2">✓ Campus counselor batch analytics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-20 bg-surface border-t border-border">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink">
                Three steps from{" "}
                <span className="gradient-text">resume to readiness</span>
              </h2>
              <p className="text-sm text-muted">
                Transparent, deterministic scoring — no black-box AI decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map(({ num, icon: Icon, title, desc, color }, i) => (
                <div
                  key={num}
                  className="group relative p-7 rounded-2xl border border-border bg-canvas hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300 cursor-default overflow-hidden"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <span className="text-4xl font-black mt-1" style={{ color: `${color}30` }}>{num}</span>
                  </div>
                  <h3 className="text-base font-bold text-ink mb-2">{title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust Section ── */}
        <section className="py-16 bg-canvas border-y border-border">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="rounded-3xl p-8 sm:p-12 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" }}>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 block mb-3">
                    Auditability &amp; Fairness
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                    Why SkillBridge scores are trustworthy
                  </h2>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Unlike opaque generative AI scoring, SkillBridge is fully auditable with zero demographic bias — every point is directly traceable to role requirements and evidence.
                  </p>
                  <Link href="/register" className="btn-glass mt-6 inline-flex">
                    Start Free Analysis →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                  {[
                    { icon: Scale, title: "Auditable Math", desc: "Zero hallucinations. Every score point is directly traceable to benchmark weights." },
                    { icon: Award, title: "Evidence-Weighted", desc: "Certs &amp; production experience beat unbacked self-ratings." },
                    { icon: Lock, title: "No Demographic Attributes", desc: "Name, age, gender, and college prestige excluded by design." },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-3 p-4 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: "rgba(79,70,229,0.3)" }}>
                        <Icon className="w-4 h-4 text-indigo-300" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{title}</h4>
                        <p className="text-xs text-white/60 mt-0.5" dangerouslySetInnerHTML={{ __html: desc }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Role Library Cloud ── */}
        <section className="py-16 bg-surface">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">Role Library</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">12+ Industry-Standard Benchmarks</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {["Frontend Dev", "Backend Dev", "Full-Stack", "DevOps", "Data Analyst", "ML Engineer",
                "Mobile Dev", "Security Eng", "Cloud Arch", "Product Manager", "QA Engineer", "UX Designer"].map((role) => (
                <Link
                  key={role}
                  href="/roles"
                  className="px-4 py-2 rounded-full text-sm font-semibold border border-border bg-canvas text-muted hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all duration-200"
                >
                  {role}
                </Link>
              ))}
            </div>
            <div className="pt-2">
              <Link href="/roles" className="btn-secondary text-sm px-6">
                Browse all roles &amp; rubrics →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Final Call to Action ── */}
        <section className="py-20 bg-canvas border-t border-border">
          <div className="max-w-[700px] mx-auto px-4 sm:px-6 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface">
              <Star className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-semibold text-ink">100% Free · No Credit Card · Instant Results</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink">
              Ready to close your{" "}
              <span className="gradient-text">skill gap?</span>
            </h2>
            <p className="text-muted text-sm max-w-md mx-auto">
              Join thousands of candidates who benchmark their skills against real job requirements and get an actionable learning plan.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/register" className="btn-primary text-sm px-7 py-3 h-12 font-bold gap-2">
                <span>Get My Readiness Score</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/tools/resume-builder" className="btn-secondary text-sm px-7 py-3 h-12">
                Build ATS Resume Free
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
