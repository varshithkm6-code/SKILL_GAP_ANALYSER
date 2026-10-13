// src/components/layout/SiteFooter.tsx
import Link from "next/link";
import { Sparkles, ShieldCheck, Heart, ExternalLink, ArrowRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-[#0B0D1B] text-white">
      {/* National Skilling Trust Signal Bar */}
      <div className="border-b border-white/10 py-6 px-4">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              National Skilling Mission Alignment
            </span>
            <p className="text-xs text-white/60">
              Supporting the vision of an industry-ready workforce across Indian tech corridors.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold text-white/80">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Skill India</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Digital India</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Make in India</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Startup India</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Atmanirbhar Bharat</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-xs">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white text-xs"
                style={{ background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)" }}>
                SB
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                SkillBridge <span className="text-indigo-400">India</span>
              </span>
            </div>
            <p className="text-white/60 text-xs leading-relaxed max-w-sm">
              An independent, clinical-grade career intelligence platform helping learners and engineers across India bridge the gap between education and high-paying tech roles.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Link href="/webdemo" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition">
                <span>Try Interactive Demo</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/tools/resume-builder" className="text-xs text-indigo-300 hover:text-white transition">
                Free Resume Builder →
              </Link>
            </div>
          </div>

          {/* Courses Col */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-indigo-300">
              Career Courses
            </h4>
            <ul className="space-y-2 text-white/60">
              <li><Link href="/courses/artificial-intelligence" className="hover:text-white transition">Artificial Intelligence</Link></li>
              <li><Link href="/courses/data-science" className="hover:text-white transition">Data Science &amp; ML</Link></li>
              <li><Link href="/courses/full-stack-development" className="hover:text-white transition">Full-Stack Development</Link></li>
              <li><Link href="/courses/cloud-devops" className="hover:text-white transition">Cloud &amp; DevOps</Link></li>
              <li><Link href="/courses/cybersecurity" className="hover:text-white transition">Cybersecurity</Link></li>
              <li><Link href="/courses/ui-ux-design" className="hover:text-white transition">UI/UX &amp; Product Design</Link></li>
            </ul>
          </div>

          {/* Career Guides Col */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-indigo-300">
              Career Guides
            </h4>
            <ul className="space-y-2 text-white/60">
              <li><Link href="/career-guides/data-scientist" className="hover:text-white transition">Data Scientist Guide</Link></li>
              <li><Link href="/career-guides/artificial-intelligence-engineer" className="hover:text-white transition">AI Engineer Guide</Link></li>
              <li><Link href="/career-guides/full-stack-developer" className="hover:text-white transition">Full-Stack Engineer</Link></li>
              <li><Link href="/career-guides/cloud-devops-engineer" className="hover:text-white transition">DevOps &amp; Cloud Architect</Link></li>
              <li><Link href="/roles" className="hover:text-white transition">12+ Role Benchmarks</Link></li>
              <li><Link href="/career-guides" className="hover:text-white transition">All Career Guides →</Link></li>
            </ul>
          </div>

          {/* Tools & Demos Col */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-indigo-300">
              Free Career Tools
            </h4>
            <ul className="space-y-2 text-white/60">
              <li><Link href="/tools/resume-builder" className="hover:text-white transition font-medium text-indigo-200">📄 Free ATS Resume Builder</Link></li>
              <li><Link href="/webdemo" className="hover:text-white transition font-medium text-amber-300">⚡ Interactive Product Demo</Link></li>
              <li><Link href="/tools" className="hover:text-white transition">Skill Gap Analyzer</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition">Live Readiness Scorecard</Link></li>
              <li><Link href="/history" className="hover:text-white transition">Assessment History</Link></li>
              <li><Link href="/counselor" className="hover:text-white transition">Counselor Portal</Link></li>
            </ul>
          </div>

          {/* Gov & Company Col */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-indigo-300">
              Platform &amp; Insights
            </h4>
            <ul className="space-y-2 text-white/60">
              <li><Link href="/government-skill-programs" className="hover:text-white transition">PMKVY 4.0 &amp; SIDH</Link></li>
              <li><Link href="/government-skill-programs" className="hover:text-white transition">NASSCOM FutureSkills</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Career Strategy Blog</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Methodology</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact &amp; Mentorship</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} SkillBridge India. Independent educational resource. Not affiliated with any commercial placement agency.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-white transition">Clinical Math Auditability</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-white transition">Help Desk</Link>
            <span>·</span>
            <span className="text-white/30">Deterministic Scoring (0ms Bias)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
