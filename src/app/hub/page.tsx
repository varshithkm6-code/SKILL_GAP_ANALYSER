// src/app/hub/page.tsx
// Post-login feature hub — central launchpad for all SkillBridge tools
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import {
  BarChart3, BookOpen, Compass, Wrench, FileText,
  PlayCircle, Building2, History, ArrowRight, Sparkles,
  Target, TrendingUp, Star, User, MessageSquare, Newspaper,
} from "lucide-react";

const FEATURES = [
  {
    href: "/dashboard", icon: "BarChart3", color: "#4F46E5", bgColor: "rgba(79,70,229,0.08)",
    badge: "Core Tool", title: "Skill Gap Analyzer",
    description: "Upload your resume, pick a target role, and get a deterministic Career Readiness Score with a 30/60/90-day roadmap.",
    cta: "Start Assessment", highlight: true,
  },
  {
    href: "/profile", icon: "User", color: "#6366F1", bgColor: "rgba(99,102,241,0.08)",
    badge: "Profile", title: "My Profile & Skills",
    description: "Manage your candidate details, star-rated competencies, evidence reliability tiers, and readiness metrics.",
    cta: "View Profile", highlight: false,
  },
  {
    href: "/blog", icon: "Newspaper", color: "#EC4899", bgColor: "rgba(236,72,153,0.08)",
    badge: "Community", title: "Community Feed & Posts",
    description: "Browse insights, like articles, share career advice, and comment on industry trends with other jobseekers.",
    cta: "Explore Feed", highlight: false,
  },
  {
    href: "/messages", icon: "MessageSquare", color: "#10B981", bgColor: "rgba(16,185,129,0.08)",
    badge: "Advising", title: "Counselor Messages",
    description: "Connect directly with academic advisors for resume reviews, role guidance, and learning roadmap questions.",
    cta: "Open Messages", highlight: false,
  },
  {
    href: "/courses", icon: "BookOpen", color: "#0EA5E9", bgColor: "rgba(14,165,233,0.08)",
    badge: "Learning", title: "Courses Catalog",
    description: "Browse curated online courses across AI/ML, Data Science, Web Development, Cloud Computing, and more.",
    cta: "Explore Courses", highlight: false,
  },
  {
    href: "/career-guides", icon: "Compass", color: "#7C3AED", bgColor: "rgba(124,58,237,0.08)",
    badge: "Career", title: "Career Guides",
    description: "In-depth roadmaps for roles like Data Scientist, Frontend Engineer, DevOps, and Product Manager.",
    cta: "Read Guides", highlight: false,
  },
  {
    href: "/tools/resume-builder", icon: "FileText", color: "#059669", bgColor: "rgba(5,150,105,0.08)",
    badge: "Tool", title: "Resume Builder",
    description: "Build an ATS-optimized resume with section templates. Export as PDF or text.",
    cta: "Build Resume", highlight: false,
  },
  {
    href: "/tools", icon: "Wrench", color: "#F59E0B", bgColor: "rgba(245,158,11,0.08)",
    badge: "Tools", title: "All Tools",
    description: "Skill Gap Analyzer, Resume Builder, JD extractor — all career tools in one place.",
    cta: "View All Tools", highlight: false,
  },
  {
    href: "/government-skill-programs", icon: "Building2", color: "#D97706", bgColor: "rgba(217,119,6,0.08)",
    badge: "Gov. Programs", title: "National Skill Programs",
    description: "Explore PMKVY, NSDC, and other Indian government skilling schemes.",
    cta: "View Programs", highlight: false,
  },
  {
    href: "/webdemo", icon: "PlayCircle", color: "#E11D48", bgColor: "rgba(225,29,72,0.08)",
    badge: "Demo", title: "Live Demo",
    description: "Watch a guided walkthrough of the platform — see how scoring and roadmap generation works.",
    cta: "Watch Demo", highlight: false,
  },
  {
    href: "/history", icon: "History", color: "#64748B", bgColor: "rgba(100,116,139,0.08)",
    badge: "History", title: "Assessment History",
    description: "Track your progress over time. Review past scores and completed milestones.",
    cta: "View History", highlight: false,
  },
];

export default async function HubPage() {
  const session = await auth();
  if (!session) redirect("/login");
  const user = session.user as { name?: string | null };
  const firstName = user?.name?.split(" ")[0] || "there";

  const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
    BarChart3, BookOpen, Compass, Wrench, FileText, PlayCircle, Building2, History, User, MessageSquare, Newspaper,
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Navbar />
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* Welcome Banner */}
        <section className="relative overflow-hidden rounded-[20px] p-8 sm:p-10"
          style={{ background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #4338CA 100%)" }}>
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20"
            style={{ background: "rgba(255,255,255,0.3)" }} />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-10"
            style={{ background: "rgba(255,255,255,0.4)" }} />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>SkillBridge Platform</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
              Hello, {firstName} 👋
            </h1>
            <p className="text-white/70 text-sm sm:text-base max-w-xl">
              Your career readiness platform is ready. Start with the Skill Gap Analyzer or explore courses, guides, and government programs below.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-sm hover:bg-white/90 transition shadow-lg">
                <BarChart3 className="w-4 h-4" />
                Start Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/courses"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition"
                style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
                <BookOpen className="w-4 h-4" />
                Browse Courses
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Target, value: "150+", label: "Skills Tracked" },
            { icon: TrendingUp, value: "12+", label: "Role Benchmarks" },
            { icon: Star, value: "100%", label: "Deterministic Scoring" },
            { icon: Sparkles, value: "0", label: "AI Hallucinations" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xl font-bold text-ink">{value}</div>
                <div className="text-[11px] text-muted leading-tight">{label}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Feature Grid */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-ink">All Features</h2>
            <p className="text-xs text-muted mt-0.5">Everything available on SkillBridge — select where to start</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {FEATURES.map((f) => {
              const Icon = iconMap[f.icon];
              return (
                <Link key={f.href} href={f.href}
                  className="group relative flex flex-col rounded-[16px] border transition-all duration-200 overflow-hidden hover:-translate-y-1 hover:shadow-lg">
                  {f.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[16px]"
                      style={{ background: "linear-gradient(90deg, #4F46E5, #7C3AED)" }} />
                  )}
                  <div className="p-5 flex flex-col gap-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                        style={{ background: f.bgColor }}>
                        <Icon className="w-5 h-5" style={{ color: f.color }} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: f.bgColor, color: f.color }}>
                        {f.badge}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-ink group-hover:text-primary transition leading-tight mb-1.5">{f.title}</h3>
                      <p className="text-xs text-muted leading-relaxed">{f.description}</p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: f.color }}>
                      {f.cta}
                      <ArrowRight className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-primary/20 bg-primary/[0.03]">
          <div>
            <h3 className="text-base font-bold text-ink">Ready to check your career readiness?</h3>
            <p className="text-xs text-muted mt-0.5">Upload your resume → select a role → get your score in under 60 seconds.</p>
          </div>
          <Link href="/dashboard" className="btn-primary px-6 shrink-0 whitespace-nowrap">
            Start Free Assessment →
          </Link>
        </section>
      </main>
    </div>
  );
}
