// src/app/courses/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { COURSES_DATA, Course } from "@/data/courses";
import { BookOpen, Search, ArrowRight, Clock, Award, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";

export default function CoursesCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "AI & ML",
    "Software Development",
    "Cloud & DevOps",
    "Data & Analytics",
    "Cybersecurity",
    "Design & Product",
  ];

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skillsTaught.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-surface border-b border-border py-14 sm:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Industry-Grade Skilling Roadmaps · Practical &amp; Job-Focused</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
              High-Impact Career Courses in{" "}
              <span className="gradient-text">In-Demand Tech</span>
            </h1>

            <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
              Every course is built backward from real Indian hiring requirements and global tech benchmarks. Transparent timelines, hands-on projects, and verifiable compensation brackets.
            </p>

            {/* Quick Metrics */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-muted">
              <div><span className="font-bold text-ink">24+</span> Curated Modules</div>
              <span>·</span>
              <div><span className="font-bold text-ink">₹5–35 LPA</span> Verified Salary Bands</div>
              <span>·</span>
              <div><span className="font-bold text-ink">100%</span> Hands-On Capstones</div>
            </div>
          </div>
        </section>

        {/* Filter and Search Bar */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 pb-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-primary text-white shadow-sm"
                      : "bg-surface text-muted hover:text-ink border border-border hover:bg-surface-subtle"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses or skills (e.g. AI, React)..."
                className="control-input pl-9 text-xs h-10 w-full"
              />
            </div>
          </div>
        </section>

        {/* Course Cards Grid */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.slug}
                className="rounded-2xl border border-border bg-surface hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-7 space-y-4">
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-3xl p-2.5 rounded-xl bg-canvas border border-border/80 group-hover:scale-110 transition-transform">
                      {course.icon}
                    </span>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-subtle text-primary uppercase tracking-wider">
                        {course.category}
                      </span>
                      <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>{course.salaryBand}</span>
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-ink group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed mt-2 line-clamp-3">
                      {course.shortDesc}
                    </p>
                  </div>

                  {/* Meta Chips */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted pt-2 border-t border-border/60">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{course.duration}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-accent" />
                      <span>{course.level}</span>
                    </span>
                  </div>

                  {/* Skills Taught */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Key Competencies:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {course.skillsTaught.slice(0, 4).map((skill) => (
                        <span key={skill} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-canvas border border-border text-ink">
                          {skill}
                        </span>
                      ))}
                      {course.skillsTaught.length > 4 && (
                        <span className="text-[10px] text-muted self-center">
                          +{course.skillsTaught.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 bg-surface-subtle border-t border-border flex items-center justify-between gap-3">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="btn-primary text-xs font-bold w-full justify-center gap-1.5"
                  >
                    <span>View Curriculum &amp; Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16 bg-surface rounded-2xl border border-border space-y-3">
              <span className="text-3xl">🔍</span>
              <h3 className="text-base font-bold text-ink">No courses match your search</h3>
              <p className="text-xs text-muted">Try adjusting your filters or search keywords.</p>
              <button
                type="button"
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="btn-secondary text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
