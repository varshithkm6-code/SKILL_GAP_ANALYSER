// lib/ingestion/resume-parser.ts
// Handles PDF, DOCX, TXT, and Markdown text extraction (server-side only)
// NOTE: This module uses Node.js-only libraries and must never be imported by client code.
import "server-only";
import { getAIProvider } from "@/ai";
import type { ParsedResume } from "@/ai/types";
import { extractSkillsAndDataFromText } from "./skill-extractor";

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  // Dynamic import to avoid browser bundling
  const pdfParseMod = await import("pdf-parse");
  const pdfParse = (pdfParseMod as { default?: (b: Buffer) => Promise<{ text: string }> }).default || (pdfParseMod as unknown as (b: Buffer) => Promise<{ text: string }>);
  const data = await pdfParse(buffer);
  return (data.text || "").replace(/\0/g, "").trim();
}

export async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ buffer });
  return (result.value || "").replace(/\0/g, "").trim();
}

export function extractTextFromPlain(buffer: Buffer): string {
  return buffer.toString("utf-8").replace(/\0/g, "").trim();
}

export async function parseResumeFile(
  buffer: Buffer,
  mimeType: string,
  fileName?: string
): Promise<{ rawText: string; parsedData: ParsedResume }> {
  let rawText = "";
  const lowerName = (fileName || "").toLowerCase();
  const lowerMime = (mimeType || "").toLowerCase();

  const isPdf = lowerMime.includes("pdf") || lowerName.endsWith(".pdf");
  const isDocx = lowerMime.includes("word") || lowerMime.includes("docx") || lowerName.endsWith(".docx");
  const isText = lowerMime.includes("text") || lowerName.endsWith(".txt") || lowerName.endsWith(".md");

  if (isPdf) {
    try {
      rawText = await extractTextFromPDF(buffer);
    } catch (err) {
      console.warn("[ResumeParser] PDF parse error, attempting plaintext fallback:", err);
      rawText = extractTextFromPlain(buffer);
    }
  } else if (isDocx) {
    rawText = await extractTextFromDOCX(buffer);
  } else if (isText || buffer.length > 0) {
    rawText = extractTextFromPlain(buffer);
  } else {
    throw new Error(`Unsupported file type: ${mimeType || fileName || "unknown"}`);
  }

  if (!rawText || rawText.trim().length === 0) {
    throw new Error("Could not extract readable text from the uploaded resume.");
  }

  return parseResumeRawText(rawText);
}

export async function parseResumeRawText(
  rawText: string
): Promise<{ rawText: string; parsedData: ParsedResume }> {
  try {
    const ai = getAIProvider();
    const parsedData = await ai.parseResume(rawText);
    // Ensure skills are populated
    if (!parsedData.skills || parsedData.skills.length === 0) {
      const fallback = extractSkillsAndDataFromText(rawText);
      return { rawText, parsedData: fallback };
    }
    return { rawText, parsedData };
  } catch (err) {
    console.warn("[ResumeParser] AI provider failed, falling back to rule-based extractor:", err);
    const fallback = extractSkillsAndDataFromText(rawText);
    return { rawText, parsedData: fallback };
  }
}

export function validateUpload(file: { size: number; type: string; name?: string }): void {
  const MAX_SIZE = 4 * 1024 * 1024; // 4 MB
  const ALLOWED_EXTS = [".pdf", ".docx", ".txt", ".md"];
  const fileName = (file.name || "").toLowerCase();

  if (file.size > MAX_SIZE) {
    throw new Error("File exceeds 4 MB limit. Maximum allowed size is 4 MB.");
  }

  const isAllowedExt = ALLOWED_EXTS.some((ext) => fileName.endsWith(ext));
  const isAllowedMime =
    file.type.includes("pdf") ||
    file.type.includes("word") ||
    file.type.includes("docx") ||
    file.type.includes("text") ||
    file.type === "application/octet-stream";

  if (!isAllowedExt && !isAllowedMime) {
    throw new Error("Invalid file type. Supported formats: PDF, DOCX, TXT, Markdown.");
  }
}
