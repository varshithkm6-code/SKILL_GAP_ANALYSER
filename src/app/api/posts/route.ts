// src/app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { BLOG_POSTS_DATA, BlogPost } from "@/data/blogPosts";

const CreatePostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(160, "Title cannot exceed 160 characters"),
  summary: z.string().min(5, "Summary must be at least 5 characters").max(300, "Summary cannot exceed 300 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.string().default("Career Strategy"),
  tags: z.array(z.string()).default(["CareerTip"]),
});

export async function GET() {
  try {
    const session = await auth();
    const currentUserId = session?.user?.id;

    // Load custom community posts
    const customPosts = await prisma.progressEvent.findMany({
      where: { eventType: "COMMUNITY_POST" },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Load all interactions (likes and comments)
    const interactions = await prisma.progressEvent.findMany({
      where: { eventType: "COMMUNITY_INTERACTION" },
      orderBy: { createdAt: "asc" },
    });

    // Map interactions by postSlug
    const interactionsBySlug: Record<
      string,
      { likes: Set<string>; comments: Array<{ id: string; authorName: string; text: string; createdAt: string }> }
    > = {};

    interactions.forEach((item) => {
      const p = item.payload as {
        action: "like" | "comment";
        postSlug: string;
        commentText?: string;
        authorName?: string;
      } | null;

      if (!p || !p.postSlug) return;
      if (!interactionsBySlug[p.postSlug]) {
        interactionsBySlug[p.postSlug] = { likes: new Set(), comments: [] };
      }

      if (p.action === "like") {
        interactionsBySlug[p.postSlug].likes.add(item.userId);
      } else if (p.action === "comment" && p.commentText) {
        interactionsBySlug[p.postSlug].comments.push({
          id: item.id,
          authorName: p.authorName || "Anonymous Learner",
          text: p.commentText,
          createdAt: item.createdAt.toISOString(),
        });
      }
    });

    // Transform custom DB posts
    const formattedCustomPosts: Array<
      BlogPost & {
        likesCount: number;
        hasLiked: boolean;
        comments: Array<{ id: string; authorName: string; text: string; createdAt: string }>;
        authorName: string;
        isCommunityPost: boolean;
      }
    > = customPosts.map((cp) => {
      const p = cp.payload as {
        title: string;
        summary: string;
        content: string[];
        category: string;
        tags: string[];
        slug: string;
      };

      const slug = p.slug || `post-${cp.id}`;
      const inter = interactionsBySlug[slug] || { likes: new Set(), comments: [] };

      return {
        slug,
        title: p.title,
        summary: p.summary,
        category: (p.category as BlogPost["category"]) || "Career Strategy",
        date: cp.createdAt.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
        readTime: "3 min read",
        author: cp.user?.name || cp.user?.email || "Community Member",
        tags: p.tags || ["Community"],
        content: Array.isArray(p.content) ? p.content : [p.content || ""],
        authorName: cp.user?.name || cp.user?.email || "Community Member",
        likesCount: inter.likes.size,
        hasLiked: currentUserId ? inter.likes.has(currentUserId) : false,
        comments: inter.comments,
        isCommunityPost: true,
      };
    });

    // Transform static blog posts with interaction overlays
    const formattedStaticPosts = BLOG_POSTS_DATA.map((post) => {
      const inter = interactionsBySlug[post.slug] || { likes: new Set(), comments: [] };
      return {
        ...post,
        authorName: "SkillBridge Editorial",
        likesCount: inter.likes.size + (post.slug.length % 7) + 5, // baseline engagement
        hasLiked: currentUserId ? inter.likes.has(currentUserId) : false,
        comments: inter.comments,
        isCommunityPost: false,
      };
    });

    return NextResponse.json({
      posts: [...formattedCustomPosts, ...formattedStaticPosts],
      currentUserId: currentUserId || null,
    });
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be signed in to publish a post." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = CreatePostSchema.parse(body);

    const slug = `${data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .slice(0, 40)}-${Date.now().toString(36)}`;

    const event = await prisma.progressEvent.create({
      data: {
        userId: session.user.id,
        eventType: "COMMUNITY_POST",
        payload: {
          title: data.title,
          summary: data.summary,
          content: [data.content],
          category: data.category,
          tags: data.tags,
          slug,
        },
      },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    });

    return NextResponse.json({
      success: true,
      post: {
        slug,
        title: data.title,
        summary: data.summary,
        category: (data.category as BlogPost["category"]) || "Career Strategy",
        date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
        readTime: "3 min read",
        author: event.user?.name || event.user?.email || "Candidate",
        tags: data.tags,
        content: [data.content],
        authorName: event.user?.name || event.user?.email || "Candidate",
        likesCount: 0,
        hasLiked: false,
        comments: [],
        isCommunityPost: true,
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message || "Validation error" }, { status: 400 });
    }
    console.error("POST /api/posts error:", err);
    return NextResponse.json({ error: "Could not publish post." }, { status: 500 });
  }
}
