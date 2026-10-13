// src/app/blog/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BLOG_POSTS_DATA, BlogPost } from "@/data/blogPosts";
import { Newspaper, Search, Clock, Calendar, ArrowRight, Tag, BookOpen } from "lucide-react";

export default function BlogHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const categories = ["All", "Career Strategy", "Hiring Trends", "Resume & ATS", "Gov Programs"];

  const filteredPosts = BLOG_POSTS_DATA.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
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
              <Newspaper className="w-3.5 h-3.5" />
              <span>Career Intelligence &amp; Tech Hiring Insights in India</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
              SkillBridge <span className="gradient-text">Blog &amp; Insights</span>
            </h1>

            <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
              Actionable guides on navigating Indian placement seasons, cracking off-campus opportunities, mastering ATS resumes, and leveraging government skilling subsidies.
            </p>
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
                placeholder="Search articles or topics..."
                className="control-input pl-9 text-xs h-10 w-full"
              />
            </div>
          </div>
        </section>

        {/* Blog Posts List */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 pb-20">
          <div className="space-y-6">
            {filteredPosts.map((post) => {
              const isExpanded = expandedSlug === post.slug;
              return (
                <article
                  key={post.slug}
                  className="p-7 sm:p-8 rounded-3xl border border-border bg-surface hover:border-primary/40 transition-all duration-300 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-primary-subtle text-primary border border-primary/20 uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-ink hover:text-primary transition-colors cursor-pointer"
                      onClick={() => setExpandedSlug(isExpanded ? null : post.slug)}>
                      {post.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed mt-2">
                      {post.summary}
                    </p>
                  </div>

                  {/* Expanded Content View */}
                  {isExpanded && (
                    <div className="p-6 rounded-2xl bg-canvas border border-border/80 space-y-4 text-xs sm:text-sm text-ink leading-relaxed animate-fade-in-up">
                      {post.content.map((paragraph, i) => (
                        <p key={i} className="text-muted leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Tags and Action Bar */}
                  <div className="pt-3 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-canvas border border-border text-muted">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setExpandedSlug(isExpanded ? null : post.slug)}
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                    >
                      <span>{isExpanded ? "Collapse Article" : "Read Full Article"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 bg-surface rounded-2xl border border-border space-y-3">
              <span className="text-3xl">🔍</span>
              <h3 className="text-base font-bold text-ink">No articles found</h3>
              <p className="text-xs text-muted">Try clearing your search query or picking another category.</p>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
