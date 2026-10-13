// src/app/api/posts/interact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const InteractionSchema = z.object({
  action: z.enum(["like", "comment"]),
  postSlug: z.string().min(1, "Post slug is required"),
  commentText: z.string().min(1, "Comment text cannot be empty").max(1000, "Comment cannot exceed 1000 characters").optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please sign in to like or comment on posts." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = InteractionSchema.parse(body);

    if (data.action === "comment" && !data.commentText?.trim()) {
      return NextResponse.json({ error: "Comment text cannot be empty." }, { status: 400 });
    }

    // Check if user already liked this post
    if (data.action === "like") {
      const existingLikes = await prisma.progressEvent.findMany({
        where: {
          userId: session.user.id,
          eventType: "COMMUNITY_INTERACTION",
        },
      });

      const alreadyLiked = existingLikes.find((ev) => {
        const p = ev.payload as { action?: string; postSlug?: string } | null;
        return p?.action === "like" && p?.postSlug === data.postSlug;
      });

      if (alreadyLiked) {
        // Toggle unlike: delete the interaction event
        await prisma.progressEvent.delete({ where: { id: alreadyLiked.id } });
        return NextResponse.json({ success: true, action: "unliked" });
      }
    }

    // Create interaction record in database
    const authorName = session.user.name || session.user.email?.split("@")[0] || "Learner";

    const interaction = await prisma.progressEvent.create({
      data: {
        userId: session.user.id,
        eventType: "COMMUNITY_INTERACTION",
        payload: {
          action: data.action,
          postSlug: data.postSlug,
          commentText: data.commentText?.trim(),
          authorName,
          authorEmail: session.user.email,
        },
      },
    });

    return NextResponse.json({
      success: true,
      action: data.action === "like" ? "liked" : "commented",
      comment: data.action === "comment" ? {
        id: interaction.id,
        authorName,
        text: data.commentText!.trim(),
        createdAt: new Date().toISOString(),
      } : undefined,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message || "Validation error" }, { status: 400 });
    }
    console.error("Interaction error:", err);
    return NextResponse.json({ error: "Could not record interaction." }, { status: 500 });
  }
}
