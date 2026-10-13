// src/app/courses/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { COURSES_DATA } from "@/data/courses";
import {
  Clock,
  Award,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Code,
  ShieldCheck,
  Briefcase
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COURSES_DATA.map((course) => ({
    slug: course.slug,
  }));
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = COURSES_DATA.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-surface border-b border-border py-12 sm:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-muted mb-4">
              <Link href="/" className="hover:text-primary transition">Home</Link>
              <span>/</span>
              <Link href="/courses" className="hover:text-primary transition">Courses</Link>
              <span>/</span>
              <span className="font-semibold text-ink">{course.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {course.category}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Avg Salary: {course.salaryBand}</span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
                  {course.title}
                </h1>

                <p className="text-sm sm:text-base text-muted leading-relaxed max-w-2xl">
                  {course.fullDesc}
                </p>

                {/* Quick Meta Stats */}
                <div className="flex flex-wrap items-center gap-6 text-xs text-muted pt-2 border-t border-border/60">
                  <span className="flex items-center gap-1.5 font-medium text-ink">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{course.duration}</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-ink">
                    <Award className="w-4 h-4 text-accent" />
                    <span>Level: {course.level}</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-ink">
                    <CheckCircle2 className="w-4 h-4 text-status-strong" />
                    <span>Job-Ready Portfolio Capstones</span>
                  </span>
                </div>
              </div>

              {/* Right CTA Card */}
              <div className="lg:col-span-4">
                <div className="rounded-2xl p-6 bg-canvas border border-border shadow-lg space-y-5">
                  <div className="space-y-1 text-center pb-4 border-b border-border/80">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Ready to Benchmark?
                    </span>
                    <h3 className="text-xl font-extrabold text-ink">
                      Audit Your Skill Readiness
                    </h3>
                    <p className="text-xs text-muted">
                      Discover your mathematical fit for this role before starting the curriculum.
                    </p>
                  </div>

                  <div className="space-y-2.5 text-xs text-muted">
                    <div className="flex items-center justify-between">
                      <span>Curriculum Modules:</span>
                      <span className="font-bold text-ink">{course.syllabus.length} Modules</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Portfolio Projects:</span>
                      <span className="font-bold text-ink">{course.projects.length} Real-World</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Target Compensation:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{course.salaryBand}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Link
                      href="/register"
                      className="btn-primary w-full text-xs font-bold justify-center h-11"
                    >
                      Audit My Skill Fit Free →
                    </Link>
                    <Link
                      href="/webdemo"
                      className="btn-secondary w-full text-xs font-semibold justify-center h-10"
                    >
                      Try Interactive Demo First
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Details Sections */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-14">
          {/* Prerequisites & Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
              <h3 className="text-base font-bold text-ink flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>Prerequisites &amp; Prior Knowledge</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-muted">
                {course.prerequisites.map((pre) => (
                  <li key={pre} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-status-strong shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{pre}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
              <h3 className="text-base font-bold text-ink flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                <span>Competencies &amp; Tools Mastered</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.skillsTaught.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary-subtle text-primary border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Syllabus */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Curriculum</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
                Step-by-Step Learning Syllabus
              </h2>
              <p className="text-xs sm:text-sm text-muted">
                Structured into progressive milestones from core concepts to enterprise deployment.
              </p>
            </div>

            <div className="space-y-4">
              {course.syllabus.map((mod, i) => (
                <div
                  key={mod.title}
                  className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/30 transition space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-primary-subtle text-primary flex items-center justify-center font-bold text-xs shrink-0">
                        {i + 1}
                      </span>
                      <h4 className="text-base font-bold text-ink">{mod.title}</h4>
                    </div>
                    <span className="text-xs font-semibold text-muted bg-canvas px-3 py-1 rounded-full border border-border/80 self-start sm:self-auto">
                      {mod.duration}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {mod.topics.map((topic) => (
                      <div key={topic} className="flex items-center gap-2 text-xs text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hands-On Capstone Projects */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Portfolio Proof</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
                Real-World Capstone Projects
              </h2>
              <p className="text-xs sm:text-sm text-muted">
                Proof-of-work repositories you will build, test, and present during hiring rounds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.projects.map((proj, i) => (
                <div key={proj} className="p-5 rounded-2xl bg-surface border border-border flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold text-sm shrink-0">
                    #{i + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink">{proj}</h4>
                    <p className="text-xs text-muted mt-1">
                      Production architecture with automated test coverage and documentation.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Certifications & Career Outcomes */}
          <div className="p-8 rounded-3xl bg-surface border border-border grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-ink flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                <span>Aligned Industry Certifications</span>
              </h3>
              <ul className="space-y-2 text-xs text-muted">
                {course.certifications.map((cert) => (
                  <li key={cert} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-status-strong" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-ink flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <span>Target Career Outcomes</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.careerOutcomes.map((role) => (
                  <span key={role} className="px-3 py-1 rounded-full text-xs font-bold bg-canvas border border-border text-ink">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="rounded-3xl p-8 sm:p-10 text-center space-y-4 bg-gradient-to-r from-indigo-900 via-indigo-950 to-purple-900 text-white">
            <h3 className="text-2xl font-extrabold text-white">
              Ready to verify your readiness for {course.title}?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto">
              Run a deterministic skill gap audit to see exactly what competencies you already possess and which ones you need to build.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link href="/register" className="btn-glass text-xs font-bold px-6 py-3 h-11">
                Start My Skill Gap Analysis →
              </Link>
              <Link href="/courses" className="btn-secondary text-xs font-semibold px-5 py-3 h-11 bg-white/10 text-white border-white/20 hover:bg-white/20">
                Browse All Courses
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
