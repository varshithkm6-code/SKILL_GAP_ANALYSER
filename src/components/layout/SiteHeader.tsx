"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, ArrowRight, PlayCircle, Compass, BookOpen, Wrench, Building2, Newspaper, HelpCircle, Mail } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/", icon: null },
    { label: "Courses", href: "/courses", icon: BookOpen },
    { label: "Career Guides", href: "/career-guides", icon: Compass },
    { label: "Tools", href: "/tools", icon: Wrench },
    { label: "Interactive Demo", href: "/webdemo", isHot: true, icon: PlayCircle },
    { label: "Gov Programs", href: "/government-skill-programs", icon: Building2 },
    { label: "Blog", href: "/blog", icon: Newspaper },
    { label: "About", href: "/about", icon: HelpCircle },
    { label: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border shadow-xs">
      {/* Top National Skilling Ribbon */}
      <div className="bg-canvas border-b border-border/60 py-1 px-4 text-center hidden md:block">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between text-[11px] text-muted">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-primary">🇮🇳 Skill Development &amp; Career Intelligence Platform</span>
            <span>·</span>
            <span>Aligned with Skill India Digital &amp; NASSCOM FutureSkills</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/webdemo" className="hover:text-primary transition font-medium flex items-center gap-1 text-primary">
              <PlayCircle className="w-3 h-3" />
              <span>Personio-Style Interactive Demo</span>
            </Link>
            <span>·</span>
            <Link href="/tools/resume-builder" className="hover:text-primary transition">Free Resume Builder</Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-sm transition-transform duration-200 group-hover:scale-105"
            style={{ background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)" }}>
            SB
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-ink group-hover:text-primary transition-colors">
                SkillBridge
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                India
              </span>
            </div>
            <span className="text-[10px] text-muted tracking-tight hidden sm:block">
              Career Readiness &amp; Skilling
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
          {navLinks.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                  active
                    ? "bg-primary-subtle text-primary font-bold shadow-2xs"
                    : "text-muted hover:text-ink hover:bg-surface-subtle"
                }`}
              >
                {item.label}
                {item.isHot && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-accent/20 text-accent uppercase tracking-wider animate-pulse">
                    Demo
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <Link
            href="/webdemo"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-ink border border-border bg-surface hover:border-primary hover:text-primary transition"
          >
            <PlayCircle className="w-3.5 h-3.5 text-primary" />
            <span>Product Tour</span>
          </Link>
          <Link
            href="/login"
            className="btn-secondary text-xs px-3.5 py-1.5 h-9 font-semibold"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="btn-primary text-xs px-4 py-1.5 h-9 font-bold shadow-sm flex items-center gap-1"
          >
            <span>Analyze Gap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/register"
            className="btn-primary text-xs px-3 py-1 h-8 font-bold sm:hidden"
          >
            Start
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg border border-border text-ink hover:bg-surface-subtle transition"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-surface px-4 py-5 shadow-xl animate-fade-in-down">
          <div className="space-y-1.5 mb-5">
            {navLinks.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                    active
                      ? "bg-primary-subtle text-primary font-bold"
                      : "text-ink hover:bg-surface-subtle"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {Icon && <Icon className="w-4 h-4 text-primary" />}
                    <span>{item.label}</span>
                  </div>
                  {item.isHot && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent/20 text-accent">
                      Interactive
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-border flex flex-col gap-2.5">
            <Link
              href="/webdemo"
              onClick={() => setMobileOpen(false)}
              className="btn-secondary w-full justify-center text-sm font-semibold gap-2"
            >
              <PlayCircle className="w-4 h-4 text-primary" />
              <span>Interactive Product Tour</span>
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="btn-secondary justify-center text-sm font-semibold"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="btn-primary justify-center text-sm font-bold"
              >
                Get Readiness
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
