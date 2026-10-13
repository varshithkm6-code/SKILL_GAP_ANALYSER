// src/app/api/messages/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const MessageSchema = z.object({
  text: z.string().min(1, "Message cannot be empty").max(2000, "Message cannot exceed 2000 characters"),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rawEvents = await prisma.progressEvent.findMany({
      where: {
        userId: session.user.id,
        eventType: "USER_MESSAGE",
      },
      orderBy: { createdAt: "asc" },
    });

    const messages = rawEvents.map((ev) => {
      const p = ev.payload as {
        text: string;
        sender: "candidate" | "counselor";
        senderName: string;
      } | null;

      return {
        id: ev.id,
        text: p?.text || "",
        sender: p?.sender || "candidate",
        senderName: p?.senderName || "User",
        createdAt: ev.createdAt.toISOString(),
      };
    });

    // Provide default initial guidance welcome if thread is brand new
    if (messages.length === 0) {
      const welcomeMessage = {
        id: "welcome-1",
        text: `Hello ${session.user.name?.split(" ")[0] || "there"}! I'm Dr. Sarah Mehta, Lead Academic Advisor at SkillBridge. I monitor your competency progress and role benchmarks. Feel free to ask any questions about closing critical gaps, preparing for interview rounds, or optimizing your ATS resume!`,
        sender: "counselor" as const,
        senderName: "Dr. Sarah Mehta (Counselor)",
        createdAt: new Date().toISOString(),
      };
      return NextResponse.json({ messages: [welcomeMessage] });
    }

    return NextResponse.json({ messages });
  } catch (err) {
    console.error("GET /api/messages error:", err);
    return NextResponse.json({ error: "Failed to load messages." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { text } = MessageSchema.parse(body);

    const senderName = session.user.name || session.user.email?.split("@")[0] || "Candidate";

    // 1. Save candidate message
    const userEvent = await prisma.progressEvent.create({
      data: {
        userId: session.user.id,
        eventType: "USER_MESSAGE",
        payload: {
          text: text.trim(),
          sender: "candidate",
          senderName,
        },
      },
    });

    // 2. Automated counseling guidance acknowledgment based on query topic
    let advisorReplyText = "Thank you for reaching out! I've noted this in your advising file. Keep focusing on the high-weight competencies on your 30/60/90 roadmap!";
    const lower = text.toLowerCase();
    if (lower.includes("resume") || lower.includes("ats")) {
      advisorReplyText = "Great question regarding your resume. I recommend using our built-in ATS Resume Builder (/tools/resume-builder) to format your project bullet points with quantified metrics before submitting.";
    } else if (lower.includes("interview") || lower.includes("question")) {
      advisorReplyText = "For interview prep, review the top technical interview questions generated in your latest assessment result. Focus on explaining trade-offs and system architecture.";
    } else if (lower.includes("score") || lower.includes("gauge") || lower.includes("percentage")) {
      advisorReplyText = "Remember that completing roadmap milestones dynamically updates your live Career Readiness score. Check off milestones as you build projects!";
    }

    const advisorEvent = await prisma.progressEvent.create({
      data: {
        userId: session.user.id,
        eventType: "USER_MESSAGE",
        payload: {
          text: advisorReplyText,
          sender: "counselor",
          senderName: "Dr. Sarah Mehta (Counselor)",
        },
      },
    });

    return NextResponse.json({
      success: true,
      messages: [
        {
          id: userEvent.id,
          text: text.trim(),
          sender: "candidate",
          senderName,
          createdAt: userEvent.createdAt.toISOString(),
        },
        {
          id: advisorEvent.id,
          text: advisorReplyText,
          sender: "counselor",
          senderName: "Dr. Sarah Mehta (Counselor)",
          createdAt: advisorEvent.createdAt.toISOString(),
        },
      ],
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message || "Validation error" }, { status: 400 });
    }
    console.error("POST /api/messages error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
