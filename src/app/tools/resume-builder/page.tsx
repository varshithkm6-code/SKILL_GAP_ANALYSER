// src/app/tools/resume-builder/page.tsx
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  Printer,
  Copy,
  Download,
  RotateCcw,
  Sparkles,
  Check,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Share2
} from "lucide-react";

interface ResumeData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  links: string;
  summary: string;
  skills: string;
  experience: string;
  projects: string;
  education: string;
  certifications: string;
}

const PRESET_PROFILES: Record<string, ResumeData> = {
  frontend: {
    fullName: "Aarav Sharma",
    jobTitle: "Senior Frontend Engineer",
    email: "aarav.sharma@email.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, Karnataka, India",
    links: "linkedin.com/in/aarav-sharma · github.com/aaravsharma",
    summary:
      "Results-driven Frontend Engineer with 4+ years of experience designing scalable web applications. Specialist in React, Next.js, and TypeScript with a track record of slashing page load times by 42% and building accessible design systems.",
    skills:
      "React, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, Redux Toolkit, GraphQL, REST APIs, Vitest, Playwright, WebSockets, Git, Docker",
    experience:
      "Senior Frontend Developer | TechCorp India | 2023–Present\n• Architected migration of core dashboard from legacy SPA to Next.js 15 App Router, improving Google Lighthouse score from 61 to 96.\n• Engineered real-time collaborative workspace supporting 25,000+ daily active users with sub-50ms WebSocket latency.\n• Mentored 4 junior engineers on strict TypeScript typing and WCAG 2.1 AA accessibility compliance.\n\nFrontend Software Engineer | Innovate Labs | 2021–2023\n• Developed and deployed responsive e-commerce checkout flow processing ₹1.2 Cr in monthly transactions.\n• Cut bundle size by 38% through route splitting, dynamic imports, and modern asset optimizations.",
    projects:
      "Clinical Career Readiness Analyzer\n• Built an open-source deterministic skill gap auditing engine using Next.js and Tailwind CSS.\n• Deployed on Vercel with 100% automated CI/CD coverage and 10,000+ monthly active learners.\n\nDesign System UI Component Library\n• Published accessible npm package with 28 headless components, unit-tested with Vitest.",
    education:
      "Bachelor of Technology (B.Tech) in Computer Science\nNational Institute of Technology (NIT) | 2017–2021 | CGPA: 8.7/10",
    certifications:
      "Meta Front-End Developer Professional Certificate (2023)\nAWS Certified Cloud Practitioner (2022)",
  },
  dataScientist: {
    fullName: "Priya Nair",
    jobTitle: "Data Scientist & ML Engineer",
    email: "priya.nair@email.com",
    phone: "+91 98234 56789",
    location: "Hyderabad, Telangana, India",
    links: "linkedin.com/in/priya-nair-ds · github.com/priyanair",
    summary:
      "Analytical Data Scientist with 3+ years of experience operationalizing predictive models and statistical experiments. Expert in Python, SQL, and XGBoost, with experience driving ₹4.5 Cr in annual cost reductions through automated customer churn prevention.",
    skills:
      "Python, SQL, PyTorch, Scikit-Learn, Pandas, NumPy, XGBoost, A/B Testing, Tableau, Power BI, Docker, FastAPI, AWS (S3, SageMaker)",
    experience:
      "Data Scientist | Analytics Matrix India | 2023–Present\n• Designed and trained predictive customer churn model with 89.4% ROC-AUC using gradient boosted decision trees.\n• Reduced quarterly customer attrition by 14%, preserving ₹4.5 Cr in recurring annual enterprise contracts.\n• Automated weekly ETL pipelines extracting 5M+ transactional records using Snowflake and Airflow.\n\nJunior Data Analyst | FinTech Growth | 2022–2023\n• Conducted multivariate statistical analysis across 100,000+ micro-loan applications to evaluate credit risk.\n• Built executive KPI dashboards in Tableau used weekly by CXO stakeholders.",
    projects:
      "Credit Default Prediction Engine\n• Implemented end-to-end classification model with SHAP interpretability to explain high-risk credit rejections.\n\nHealthcare Readmission Analytics\n• Trained multi-class logistic regression and random forest models achieving 84% recall on medical dataset.",
    education:
      "B.Tech in Information Technology\nAnna University, Chennai | 2018–2022 | CGPA: 8.9/10",
    certifications:
      "NASSCOM FutureSkills Prime Certified Data Science Professional (2023)\nGoogle Professional Data Engineer (2024)",
  },
  aiEngineer: {
    fullName: "Rohan Kulkarni",
    jobTitle: "Generative AI & LLM Engineer",
    email: "rohan.kulkarni@email.com",
    phone: "+91 91234 87654",
    location: "Pune, Maharashtra, India",
    links: "linkedin.com/in/rohan-ai · huggingface.co/rohank",
    summary:
      "AI Engineer specializing in production RAG systems, model fine-tuning (LoRA), and agentic workflows. Proven track record deploying low-latency LLM microservices serving 100,000+ daily queries with sub-200ms token generation.",
    skills:
      "Python, PyTorch, LangChain, LlamaIndex, Hugging Face, vLLM, Pinecone, ChromaDB, FastAPI, Docker, Kubernetes, MLOps, Prompt Engineering",
    experience:
      "AI Engineer | Cognitive Cloud Solutions | 2024–Present\n• Engineered multimodal document RAG pipeline analyzing complex insurance policies with 94% answer accuracy.\n• Optimized model inference using vLLM and 4-bit AWQ quantization, slashing GPU hosting expenditure by 52%.\n• Built automated hallucination auditing pipeline utilizing LLM-as-a-judge frameworks.\n\nMachine Learning Software Engineer | DataSprint | 2022–2024\n• Fine-tuned open-source Llama-3 models using QLoRA for domain-specific medical customer assistance.\n• Deployed containerized Triton inference microservices on AWS EKS.",
    projects:
      "Autonomous Multi-Agent Researcher\n• Developed agentic search tool using LangGraph that automates literature reviews and synthesizes citations.\n\nIndian Language Transliteration Engine\n• Trained custom sequence-to-sequence model for Hindi and Marathi phonetic keyboard transliteration.",
    education:
      "B.Tech in Computer Science & Engineering\nPune Institute of Computer Technology | 2018–2022",
    certifications:
      "DeepLearning.AI Generative AI with LLMs (2023)\nAWS Certified Machine Learning – Specialty (2024)",
  },
};

export default function ResumeBuilderPage() {
  const [data, setData] = useState<ResumeData>(PRESET_PROFILES.frontend);
  const [copied, setCopied] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Compute a simple ATS score out of 100 based on best practices
  const computeAtsScore = () => {
    let score = 0;
    if (data.fullName.trim().length > 2) score += 10;
    if (data.jobTitle.trim().length > 2) score += 10;
    if (data.email.includes("@") && data.phone.trim().length > 6) score += 15;
    if (data.summary.trim().length > 60) score += 15;
    if (data.skills.split(",").length >= 5) score += 15;
    if (data.experience.trim().length > 100) score += 20;
    if (data.education.trim().length > 20) score += 10;
    if (data.projects.trim().length > 20 || data.certifications.trim().length > 10) score += 5;
    return Math.min(100, score);
  };

  const atsScore = computeAtsScore();

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = async () => {
    const text = `
${data.fullName.toUpperCase()}
${data.jobTitle}
${data.location} | ${data.email} | ${data.phone}
${data.links}

PROFESSIONAL SUMMARY
${data.summary}

TECHNICAL & CORE SKILLS
${data.skills}

PROFESSIONAL EXPERIENCE
${data.experience}

KEY PROJECTS
${data.projects}

EDUCATION
${data.education}

CERTIFICATIONS & AWARDS
${data.certifications}
    `.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      alert("Please copy text manually.");
    }
  };

  const handleDownloadTxt = () => {
    const text = `
${data.fullName.toUpperCase()}
${data.jobTitle}
${data.location} | ${data.email} | ${data.phone}
${data.links}

PROFESSIONAL SUMMARY
${data.summary}

TECHNICAL & CORE SKILLS
${data.skills}

PROFESSIONAL EXPERIENCE
${data.experience}

KEY PROJECTS
${data.projects}

EDUCATION
${data.education}

CERTIFICATIONS & AWARDS
${data.certifications}
    `.trim();

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.fullName.replace(/\s+/g, "_")}_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadPreset = (key: string) => {
    if (PRESET_PROFILES[key]) {
      setData(PRESET_PROFILES[key]);
    }
  };

  const clearForm = () => {
    setData({
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      links: "",
      summary: "",
      skills: "",
      experience: "",
      projects: "",
      education: "",
      certifications: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Banner with Breadcrumbs */}
        <section className="bg-surface border-b border-border py-8 sm:py-10 no-print">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-2 text-xs text-muted mb-3">
              <Link href="/" className="hover:text-primary transition">Home</Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-primary transition">Tools</Link>
              <span>/</span>
              <span className="font-semibold text-ink">Resume Builder</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Free Online Tool · Recruiter ATS Optimized</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                  ATS Resume Builder
                </h1>
                <p className="text-xs sm:text-sm text-muted mt-1 max-w-xl">
                  Fill in your details — your clean, recruiter-ready resume builds live in real-time. Print, download PDF, or copy with one click. No sign-up required.
                </p>
              </div>

              {/* Top Trust Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip chip-strong text-xs py-1 px-3">✓ 100% Free</span>
                <span className="chip chip-neutral text-xs py-1 px-3">⚡ Works in Browser</span>
                <span className="chip chip-neutral text-xs py-1 px-3">🔒 No Sign-up Barrier</span>
              </div>
            </div>
          </div>
        </section>

        {/* Builder Workspace */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
          {/* Preset Buttons & Global Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-4 rounded-2xl bg-surface border border-border no-print">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-ink mr-1">Auto-Fill Sample Role:</span>
              <button
                type="button"
                onClick={() => loadPreset("frontend")}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-subtle hover:bg-primary-subtle hover:text-primary border border-border transition cursor-pointer"
              >
                Frontend Developer
              </button>
              <button
                type="button"
                onClick={() => loadPreset("dataScientist")}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-subtle hover:bg-primary-subtle hover:text-primary border border-border transition cursor-pointer"
              >
                Data Scientist
              </button>
              <button
                type="button"
                onClick={() => loadPreset("aiEngineer")}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-subtle hover:bg-primary-subtle hover:text-primary border border-border transition cursor-pointer"
              >
                Generative AI Engineer
              </button>
              <button
                type="button"
                onClick={clearForm}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-status-critical hover:bg-status-critical-bg border border-border transition cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>

            {/* Quick Export Actions */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handlePrint}
                className="btn-primary text-xs font-bold px-4 py-2 h-9 flex items-center gap-1.5"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
              <button
                type="button"
                onClick={handleCopyText}
                className="btn-secondary text-xs font-semibold px-3.5 py-2 h-9 flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-status-strong" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Text"}</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadTxt}
                className="btn-secondary text-xs font-semibold px-3 py-2 h-9 hidden sm:flex items-center gap-1"
                title="Download Plaintext"
              >
                <Download className="w-3.5 h-3.5" />
                <span>TXT</span>
              </button>
            </div>
          </div>

          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Inputs (no-print) */}
            <div className="lg:col-span-5 space-y-6 no-print">
              {/* ATS Health Meter */}
              <div className="p-4 rounded-2xl bg-surface border border-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-ink flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>ATS Health &amp; Completeness</span>
                  </span>
                  <span className="font-mono font-bold text-primary">{atsScore}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${atsScore}%`,
                      background: atsScore > 75 ? "#059669" : atsScore > 50 ? "#4F46E5" : "#E11D48",
                    }}
                  />
                </div>
                <p className="text-[11px] text-muted">
                  {atsScore >= 85
                    ? "✨ Excellent ATS readability! Ready for top job portals."
                    : "Add more quantifiable metrics and core skills to boost your score."}
                </p>
              </div>

              {/* Personal Details */}
              <div className="p-5 rounded-2xl bg-surface border border-border space-y-4">
                <h3 className="text-sm font-bold text-ink uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  <span>1. Personal &amp; Contact Info</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Full Name</label>
                    <input
                      type="text"
                      value={data.fullName}
                      onChange={(e) => setData({ ...data, fullName: e.target.value })}
                      placeholder="e.g. Aarav Sharma"
                      className="control-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Target Job Title</label>
                    <input
                      type="text"
                      value={data.jobTitle}
                      onChange={(e) => setData({ ...data, jobTitle: e.target.value })}
                      placeholder="e.g. Frontend Engineer"
                      className="control-input text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Email Address</label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      placeholder="e.g. aarav@email.com"
                      className="control-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="control-input text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Location</label>
                    <input
                      type="text"
                      value={data.location}
                      onChange={(e) => setData({ ...data, location: e.target.value })}
                      placeholder="e.g. Bengaluru, India"
                      className="control-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Links / Portfolio</label>
                    <input
                      type="text"
                      value={data.links}
                      onChange={(e) => setData({ ...data, links: e.target.value })}
                      placeholder="e.g. linkedin.com/in/aarav"
                      className="control-input text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="p-5 rounded-2xl bg-surface border border-border space-y-3">
                <h3 className="text-sm font-bold text-ink uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>2. Professional Summary</span>
                </h3>
                <textarea
                  rows={3}
                  value={data.summary}
                  onChange={(e) => setData({ ...data, summary: e.target.value })}
                  placeholder="2–3 sentences highlighting your core engineering abilities, years of experience, and quantifiable impact."
                  className="control-input text-xs resize-y"
                />
              </div>

              {/* Skills */}
              <div className="p-5 rounded-2xl bg-surface border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-ink uppercase tracking-wider flex items-center gap-2">
                    <Code className="w-4 h-4 text-primary" />
                    <span>3. Technical &amp; Core Skills</span>
                  </h3>
                  <span className="text-[10px] text-muted font-medium">Comma-separated</span>
                </div>
                <textarea
                  rows={3}
                  value={data.skills}
                  onChange={(e) => setData({ ...data, skills: e.target.value })}
                  placeholder="React, TypeScript, Next.js, Node.js, SQL, Docker, Git"
                  className="control-input text-xs resize-y"
                />
              </div>

              {/* Experience */}
              <div className="p-5 rounded-2xl bg-surface border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-ink uppercase tracking-wider flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <span>4. Professional Experience</span>
                  </h3>
                  <span className="text-[10px] text-muted font-medium">Use bullet points</span>
                </div>
                <textarea
                  rows={6}
                  value={data.experience}
                  onChange={(e) => setData({ ...data, experience: e.target.value })}
                  placeholder="Job Title | Company Name | Dates&#10;• Led project X delivering Y% metric improvement&#10;• Built feature Z serving N users"
                  className="control-input text-xs font-mono resize-y"
                />
              </div>

              {/* Projects */}
              <div className="p-5 rounded-2xl bg-surface border border-border space-y-3">
                <h3 className="text-sm font-bold text-ink uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>5. Key Projects</span>
                </h3>
                <textarea
                  rows={4}
                  value={data.projects}
                  onChange={(e) => setData({ ...data, projects: e.target.value })}
                  placeholder="Project Name&#10;• Description of architecture and technologies used"
                  className="control-input text-xs font-mono resize-y"
                />
              </div>

              {/* Education & Certs */}
              <div className="p-5 rounded-2xl bg-surface border border-border space-y-4">
                <h3 className="text-sm font-bold text-ink uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <span>6. Education &amp; Certifications</span>
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">Education</label>
                  <textarea
                    rows={3}
                    value={data.education}
                    onChange={(e) => setData({ ...data, education: e.target.value })}
                    placeholder="Degree, College / University, Year, CGPA"
                    className="control-input text-xs resize-y"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">Certifications &amp; Licenses</label>
                  <textarea
                    rows={2}
                    value={data.certifications}
                    onChange={(e) => setData({ ...data, certifications: e.target.value })}
                    placeholder="e.g. AWS Certified Developer, NASSCOM FutureSkills"
                    className="control-input text-xs resize-y"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Live ATS-Compliant Document Canvas */}
            <div className="lg:col-span-7 sticky top-20">
              <div className="rounded-2xl border border-border bg-white shadow-xl overflow-hidden">
                {/* Canvas Top Bar (no-print) */}
                <div className="px-5 py-3 border-b border-border bg-slate-50 flex items-center justify-between text-xs no-print">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-slate-800">Live ATS Resume Preview</span>
                    <span className="text-slate-400">· Standard Single-Column Clean Format</span>
                  </div>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print PDF</span>
                  </button>
                </div>

                {/* Printable ATS Document */}
                <div
                  ref={resumeRef}
                  id="printable-resume"
                  className="p-8 sm:p-12 text-[#111827] bg-white font-sans text-[13px] leading-relaxed select-text space-y-5"
                  style={{ minHeight: "800px" }}
                >
                  {/* Header */}
                  <div className="text-center pb-4 border-b border-gray-300 space-y-1">
                    <h2 className="text-2xl font-bold uppercase tracking-tight text-gray-900">
                      {data.fullName || "Your Full Name"}
                    </h2>
                    <div className="text-sm font-semibold text-indigo-700">
                      {data.jobTitle || "Your Target Job Title"}
                    </div>
                    <div className="text-xs text-gray-600 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-1">
                      {data.location && <span>{data.location}</span>}
                      {data.email && <span>• {data.email}</span>}
                      {data.phone && <span>• {data.phone}</span>}
                    </div>
                    {data.links && (
                      <div className="text-xs text-gray-500 font-mono pt-0.5">
                        {data.links}
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  {data.summary && (
                    <div className="space-y-1">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b border-gray-200 pb-0.5">
                        Professional Summary
                      </h3>
                      <p className="text-xs text-gray-700 leading-relaxed text-justify">
                        {data.summary}
                      </p>
                    </div>
                  )}

                  {/* Skills */}
                  {data.skills && (
                    <div className="space-y-1">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b border-gray-200 pb-0.5">
                        Technical &amp; Core Competencies
                      </h3>
                      <p className="text-xs text-gray-800 leading-relaxed">
                        {data.skills}
                      </p>
                    </div>
                  )}

                  {/* Experience */}
                  {data.experience && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b border-gray-200 pb-0.5">
                        Professional Experience
                      </h3>
                      <div className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                        {data.experience}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {data.projects && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b border-gray-200 pb-0.5">
                        Key Projects &amp; Implementations
                      </h3>
                      <div className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                        {data.projects}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {data.education && (
                    <div className="space-y-1">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b border-gray-200 pb-0.5">
                        Education
                      </h3>
                      <div className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                        {data.education}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {data.certifications && (
                    <div className="space-y-1">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800 border-b border-gray-200 pb-0.5">
                        Certifications &amp; Credentials
                      </h3>
                      <div className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                        {data.certifications}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
