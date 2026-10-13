// src/app/blog/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BLOG_POSTS_DATA, BlogPost } from "@/data/blogPosts";
import {
  Newspaper,
  Search,
  Clock,
  Calendar,
  ArrowRight,
  Heart,
  MessageSquare,
  Send,
  PlusCircle,
  X,
  User,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface PostItem extends BlogPost {
  authorName?: string;
  likesCount?: number;
  hasLiked?: boolean;
  comments?: Array<{ id: string; authorName: string; text: string; createdAt: string }>;
  isCommunityPost?: boolean;
}

export default function BlogHubPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [activeCommentSlug, setActiveCommentSlug] = useState<string | null>(null);

  // New post modal state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("Career Strategy");
  const [newTags, setNewTags] = useState("Placement, Interview");
  const [submittingPost, setSubmittingPost] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Inline comment state
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [submittingComment, setSubmittingComment] = useState<Record<string, boolean>>({});

  const categories = ["All", "Career Strategy", "Hiring Trends", "Resume & ATS", "Gov Programs"];

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch("/api/posts");
        if (res.ok) {
          const data = await res.json();
          if (data.posts && data.posts.length > 0) {
            setPosts(data.posts);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch /api/posts:", err);
      } finally {
        setLoading(false);
      }

      // Fallback to static data
      const initial: PostItem[] = BLOG_POSTS_DATA.map((p) => ({
        ...p,
        authorName: "SkillBridge Editorial",
        likesCount: 12,
        hasLiked: false,
        comments: [],
        isCommunityPost: false,
      }));
      setPosts(initial);
      setLoading(false);
    }

    loadPosts();
  }, []);

  const handleLike = async (postSlug: string) => {
    if (!session) {
      alert("Please sign in to like this post.");
      return;
    }

    // Optimistic UI update
    setPosts((prev) =>
      prev.map((p) => {
        if (p.slug === postSlug) {
          const nextHasLiked = !p.hasLiked;
          const delta = nextHasLiked ? 1 : -1;
          return {
            ...p,
            hasLiked: nextHasLiked,
            likesCount: Math.max(0, (p.likesCount || 0) + delta),
          };
        }
        return p;
      })
    );

    try {
      await fetch("/api/posts/interact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like", postSlug }),
      });
    } catch (err) {
      console.error("Failed to save like interaction:", err);
    }
  };

  const handleAddComment = async (postSlug: string) => {
    const text = commentInputs[postSlug]?.trim();
    if (!text) return;

    if (!session) {
      alert("Please sign in to comment on this post.");
      return;
    }

    setSubmittingComment((prev) => ({ ...prev, [postSlug]: true }));

    try {
      const res = await fetch("/api/posts/interact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "comment", postSlug, commentText: text }),
      });

      const data = await res.json();
      if (res.ok && data.comment) {
        setPosts((prev) =>
          prev.map((p) => {
            if (p.slug === postSlug) {
              return {
                ...p,
                comments: [...(p.comments || []), data.comment],
              };
            }
            return p;
          })
        );
        setCommentInputs((prev) => ({ ...prev, [postSlug]: "" }));
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
    } finally {
      setSubmittingComment((prev) => ({ ...prev, [postSlug]: false }));
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!session) {
      setFormError("Please sign in to publish an article or career tip.");
      return;
    }

    if (!newTitle.trim() || newTitle.length < 3) {
      setFormError("Title must be at least 3 characters.");
      return;
    }

    if (!newSummary.trim() || newSummary.length < 5) {
      setFormError("Summary must be at least 5 characters.");
      return;
    }

    if (!newContent.trim() || newContent.length < 10) {
      setFormError("Post content must be at least 10 characters.");
      return;
    }

    setSubmittingPost(true);

    try {
      const parsedTags = newTags
        .split(",")
        .map((t) => t.trim().replace(/^#/, ""))
        .filter(Boolean);

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          summary: newSummary.trim(),
          content: newContent.trim(),
          category: newCategory,
          tags: parsedTags.length > 0 ? parsedTags : ["CareerTip"],
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to publish post.");
      }

      setPosts((prev) => [data.post, ...prev]);
      setFormSuccess("Your post has been published successfully!");
      setNewTitle("");
      setNewSummary("");
      setNewContent("");

      setTimeout(() => {
        setCreateModalOpen(false);
        setFormSuccess(null);
      }, 1200);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Error publishing post.");
    } finally {
      setSubmittingPost(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
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
              SkillBridge <span className="gradient-text">Community Feed &amp; Insights</span>
            </h1>

            <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
              Actionable guides on navigating Indian placement seasons, cracking off-campus opportunities, mastering ATS resumes, and peer-to-peer career strategies.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setCreateModalOpen(true)}
                className="btn-primary text-xs px-5 py-2.5 inline-flex items-center gap-2 shadow-md cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Insight / Share Experience</span>
              </button>
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
                placeholder="Search articles or topics..."
                className="control-input pl-9 text-xs h-10 w-full"
              />
            </div>
          </div>
        </section>

        {/* Blog Posts List */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 pb-20">
          {loading ? (
            <div className="text-center py-20 text-muted text-xs">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary mb-2" />
              <span>Loading community insights...</span>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post) => {
                const isExpanded = expandedSlug === post.slug;
                const isCommentsOpen = activeCommentSlug === post.slug;

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
                        {post.isCommunityPost && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            Community
                          </span>
                        )}
                        <span>·</span>
                        <span className="flex items-center gap-1 font-medium">
                          <User className="w-3.5 h-3.5 text-muted" />
                          <span>{post.authorName || "Editorial"}</span>
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </span>
                    </div>

                    <div>
                      <h2
                        className="text-xl sm:text-2xl font-bold text-ink hover:text-primary transition-colors cursor-pointer"
                        onClick={() => setExpandedSlug(isExpanded ? null : post.slug)}
                      >
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

                    {/* Tags & Action Bar with Likes & Comments */}
                    <div className="pt-3 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-canvas border border-border text-muted"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Like Button */}
                        <button
                          type="button"
                          onClick={() => handleLike(post.slug)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                            post.hasLiked
                              ? "bg-rose-500/10 text-rose-500 border border-rose-500/30"
                              : "bg-canvas text-muted hover:text-rose-500 border border-border"
                          }`}
                          title="Like this article"
                        >
                          <Heart className={`w-3.5 h-3.5 ${post.hasLiked ? "fill-rose-500" : ""}`} />
                          <span>{post.likesCount || 0}</span>
                        </button>

                        {/* Comment Toggle Button */}
                        <button
                          type="button"
                          onClick={() => setActiveCommentSlug(isCommentsOpen ? null : post.slug)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-canvas text-muted hover:text-primary border border-border transition cursor-pointer"
                          title="View comments"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{post.comments?.length || 0} Comments</span>
                        </button>

                        {/* Read Full / Collapse Button */}
                        <button
                          type="button"
                          onClick={() => setExpandedSlug(isExpanded ? null : post.slug)}
                          className="text-xs font-bold text-primary hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer ml-1"
                        >
                          <span>{isExpanded ? "Collapse" : "Read Full"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Comments Drawer / Section */}
                    {isCommentsOpen && (
                      <div className="pt-4 border-t border-border/40 space-y-4 animate-fade-in-up">
                        <div className="flex items-center justify-between text-xs font-bold text-ink">
                          <span>Discussion ({post.comments?.length || 0})</span>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                          {(!post.comments || post.comments.length === 0) ? (
                            <p className="text-xs text-muted py-2 italic">
                              No comments yet. Be the first to share your perspective!
                            </p>
                          ) : (
                            post.comments.map((c) => (
                              <div
                                key={c.id}
                                className="p-3 rounded-xl bg-canvas border border-border/70 text-xs space-y-1"
                              >
                                <div className="flex items-center justify-between text-muted text-[11px]">
                                  <span className="font-bold text-ink">{c.authorName}</span>
                                  <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-muted leading-relaxed">{c.text}</p>
                              </div>
                            ))
                          )}
                        </div>

                        {/* New Comment Input */}
                        <div className="flex items-center gap-2 pt-2">
                          <input
                            type="text"
                            value={commentInputs[post.slug] || ""}
                            onChange={(e) =>
                              setCommentInputs({ ...commentInputs, [post.slug]: e.target.value })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleAddComment(post.slug);
                            }}
                            placeholder={session ? "Write a helpful comment..." : "Sign in to join discussion..."}
                            disabled={!session}
                            className="control-input text-xs flex-1 h-9"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddComment(post.slug)}
                            disabled={!session || !commentInputs[post.slug]?.trim() || submittingComment[post.slug]}
                            className="btn-primary text-xs px-3.5 h-9 shrink-0 gap-1.5"
                          >
                            {submittingComment[post.slug] ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <>
                                <Send className="w-3.5 h-3.5" />
                                <span>Reply</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-16 bg-surface rounded-2xl border border-border space-y-3">
              <span className="text-3xl">🔍</span>
              <h3 className="text-base font-bold text-ink">No articles found</h3>
              <p className="text-xs text-muted">Try clearing your search query or picking another category.</p>
            </div>
          )}
        </section>
      </main>

      {/* Publish Post Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-ink/40 backdrop-blur-xs transition-opacity"
            onClick={() => setCreateModalOpen(false)}
          />

          <div className="relative z-50 w-full max-w-lg bg-surface border border-border rounded-card shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-primary" />
                <h3 className="text-base font-bold text-ink">Publish Career Insight</h3>
              </div>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="p-1 rounded-lg text-muted hover:text-ink transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-status-critical-bg border border-status-critical/30 text-xs text-status-critical-text flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="p-3 rounded-xl bg-status-strong-bg border border-status-strong/30 text-xs text-status-strong-text flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. How I cleared my Frontend technical round..."
                  className="control-input text-xs w-full"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="control-input text-xs w-full"
                  >
                    <option value="Career Strategy">Career Strategy</option>
                    <option value="Hiring Trends">Hiring Trends</option>
                    <option value="Resume & ATS">Resume &amp; ATS</option>
                    <option value="Gov Programs">Gov Programs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="React, Interview, Resume"
                    className="control-input text-xs w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">Summary (1–2 sentences)</label>
                <input
                  type="text"
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Key takeaway or brief preview of this tip..."
                  className="control-input text-xs w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">Article Body / Detailed Advice</label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Share your structured insights, technical interview questions, or preparation framework..."
                  className="control-input text-xs w-full resize-y"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="btn-secondary text-xs px-4 h-9"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingPost}
                  className="btn-primary text-xs px-5 h-9 font-bold"
                >
                  {submittingPost ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Publish Post</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
