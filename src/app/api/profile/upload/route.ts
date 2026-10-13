import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseResumeFile, parseResumeRawText, validateUpload } from "@/ingestion/resume-parser";
import { encrypt } from "@/lib/crypto";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    let rawText = "";
    let parsedData;

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      const text = body.text || body.resumeText;
      if (!text || typeof text !== "string" || text.trim().length < 20) {
        return NextResponse.json(
          { error: "Please provide at least 20 characters of resume text to analyze." },
          { status: 400 }
        );
      }
      const res = await parseResumeRawText(text.trim());
      rawText = res.rawText;
      parsedData = res.parsedData;
    } else {
      const formData = await req.formData();
      const file = (formData.get("file") || formData.get("resume")) as File | null;
      const pastedText = formData.get("pastedText") as string | null;

      if (pastedText && pastedText.trim().length >= 20) {
        const res = await parseResumeRawText(pastedText.trim());
        rawText = res.rawText;
        parsedData = res.parsedData;
      } else if (file) {
        validateUpload({ size: file.size, type: file.type, name: file.name });
        const buffer = Buffer.from(await file.arrayBuffer());
        const res = await parseResumeFile(buffer, file.type, file.name);
        rawText = res.rawText;
        parsedData = res.parsedData;
      } else {
        return NextResponse.json({ error: "No file or text provided." }, { status: 400 });
      }
    }

    const encryptedText = encrypt(rawText);
    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: { rawTextEnc: encryptedText, parsedData, updatedAt: new Date() },
      create: { userId: session.user.id, rawTextEnc: encryptedText, parsedData },
    });

    // Map extracted skills with their true evidence type and proficiency
    const extractedSkills = (parsedData.skills || []).map((s) => ({
      name: s.name,
      proficiency: s.proficiency || 3,
      evidenceType: s.evidenceType || "PROJECT",
    }));

    return NextResponse.json({
      profile,
      parsedData,
      extractedSkills,
      extractedCount: extractedSkills.length,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload and analysis failed";
    console.error("[ProfileUpload] Error:", e);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}