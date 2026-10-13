// src/app/webdemo/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScoreGauge } from "@/components/dashboard/ScoreGauge";
import { SkillRadar } from "@/components/dashboard/SkillRadar";
import { Chip } from "@/components/ui/Chip";
import {
  PlayCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Users,
  Compass,
  FileText,
  Sliders,
  RotateCcw,
  ShieldCheck,
  Check,
  TrendingUp,
  AlertTriangle,
  Award,
  Layers,
  ChevronRight
} from "lucide-react";

interface Persona {
  id: string;
  name: string;
  targetRole: string;
  baselineScore: number;
  skills: Array<{ name: string; user: number; required: number; evidence: string }>;
  milestones: Array<{ id: string; title: string; timeframe: string; scoreBoost: number; done: boolean }>;
}

const DEMO_PERSONAS: Persona[] = [
  {
    id: "alex",
    name: "Alex Chen",
    targetRole: "Frontend Developer Benchmark",
    baselineScore: 68,
    skills: [
      { name: "React", user: 4, required: 4, evidence: "Work Experience (Tier 2)" },
      { name: "TypeScript", user: 2, required: 3, evidence: "Personal Projects (Tier 3)" },
      { name: "System Design", user: 1, required: 3, evidence: "Self-Reported (Tier 4)" },
      { name: "CSS / UI", user: 4, required: 3, evidence: "Work Experience (Tier 2)" },
      { name: "REST APIs", user: 3, required: 3, evidence: "Work Experience (Tier 2)" },
      { name: "Testing", user: 1, required: 2, evidence: "Self-Reported (Tier 4)" },
    ],
    milestones: [
      { id: "m1", title: "Complete TypeScript Generics & Strict Mode Capstone", timeframe: "30 Days", scoreBoost: 7, done: false },
      { id: "m2", title: "Architect Frontend Caching & Offline PWA State", timeframe: "60 Days", scoreBoost: 9, done: false },
      { id: "m3", title: "Implement Vitest & Playwright E2E Suite with CI/CD", timeframe: "90 Days", scoreBoost: 7, done: false },
    ],
  },
  {
    id: "priya",
    name: "Priya Nair",
    targetRole: "Data Scientist Benchmark",
    baselineScore: 74,
    skills: [
      { name: "Python", user: 4, required: 4, evidence: "Work Experience (Tier 2)" },
      { name: "SQL", user: 4, required: 4, evidence: "Work Experience (Tier 2)" },
      { name: "Machine Learning", user: 3, required: 4, evidence: "Certifications (Tier 2)" },
      { name: "Statistics", user: 3, required: 3, evidence: "Work Experience (Tier 2)" },
      { name: "MLOps", user: 1, required: 3, evidence: "Personal Repo (Tier 3)" },
      { name: "Tableau / BI", user: 4, required: 3, evidence: "Work Experience (Tier 2)" },
    ],
    milestones: [
      { id: "m1", title: "Deploy Production ML Inference API with FastAPI & Docker", timeframe: "30 Days", scoreBoost: 8, done: false },
      { id: "m2", title: "Implement Automated Feature Store & Drift Monitoring", timeframe: "60 Days", scoreBoost: 7, done: false },
      { id: "m3", title: "Publish End-to-End Predictive Pipeline with SHAP Explainability", timeframe: "90 Days", scoreBoost: 6, done: false },
    ],
  },
];

export default function InteractiveWebDemoPage() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [activePersona, setActivePersona] = useState<Persona>(DEMO_PERSONAS[0]);
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({});
  
  // Weights interactive simulator
  const [weights, setWeights] = useState({
    coreCoverage: 40,
    proficiencyDepth: 30,
    evidenceReliability: 20,
    softSkills: 5,
    bonusSkills: 5,
  });

  // Calculate dynamic live score
  const milestoneBoost = activePersona.milestones
    .filter((m) => completedMilestones[m.id])
    .reduce((sum, m) => sum + m.scoreBoost, 0);

  const currentScore = Math.min(100, activePersona.baselineScore + milestoneBoost);

  const toggleMilestone = (id: string) => {
    setCompletedMilestones((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetSimulation = () => {
    setCompletedMilestones({});
    setWeights({
      coreCoverage: 40,
      proficiencyDepth: 30,
      evidenceReliability: 20,
      softSkills: 5,
      bonusSkills: 5,
    });
  };

  const radarData = activePersona.skills.map((s) => ({
    skill: s.name,
    user: s.user + (completedMilestones["m1"] && s.user < s.required ? 1 : 0),
    required: s.required,
  }));

  const steps = [
    { num: 1, label: "Profile Intake", icon: FileText },
    { num: 2, label: "Gap Scoring & Radar", icon: Sliders },
    { num: 3, label: "Live Recalibration", icon: TrendingUp },
    { num: 4, label: "Counselor Cohort View", icon: Users },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <SiteHeader />

      <main className="flex-1">
        {/* Interactive Tour Hero Header */}
        <section className="bg-surface border-b border-border py-8 sm:py-10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Personio-Style Self-Guided Product Tour · Zero Sign-Up Required</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
                  Interactive Platform Sandbox
                </h1>
                <p className="text-xs sm:text-sm text-muted max-w-xl">
                  Try out our deterministic scoring engine, simulate live roadmap recalculation, and explore cohort analytics in real time.
                </p>
              </div>

              {/* Persona Switcher & Reset */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold text-muted">Test Persona:</span>
                {DEMO_PERSONAS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setActivePersona(p);
                      setCompletedMilestones({});
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      activePersona.id === p.id
                        ? "bg-primary text-white border-primary shadow-xs"
                        : "bg-surface text-ink border-border hover:bg-surface-subtle"
                    }`}
                  >
                    {p.name} ({p.id === "alex" ? "Frontend" : "Data Science"})
                  </button>
                ))}
                <button
                  type="button"
                  onClick={resetSimulation}
                  className="p-2 rounded-xl border border-border text-muted hover:text-ink hover:bg-surface-subtle transition cursor-pointer"
                  title="Reset Sandbox"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Step-by-Step Navigation Bar */}
            <div className="mt-8 pt-6 border-t border-border/80 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
              {steps.map((st) => {
                const Icon = st.icon;
                const isActive = activeStep === st.num;
                return (
                  <button
                    key={st.num}
                    type="button"
                    onClick={() => setActiveStep(st.num)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/20 scale-102"
                        : "bg-surface text-muted hover:text-ink border border-border hover:bg-surface-subtle"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                      isActive ? "bg-white/20 text-white" : "bg-canvas text-muted"
                    }`}>
                      {st.num}
                    </span>
                    <Icon className="w-4 h-4" />
                    <span>{st.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sandbox Content Container */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
          {/* STEP 1: Profile & Resume Intake */}
          {activeStep === 1 && (
            <div className="space-y-6 animate-scale-in">
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <b className="text-ink">Step 1 Walkthrough:</b> In production, candidates upload their resume (PDF/TXT) or input competencies manually. The engine extracts verified skills and maps them against industry role benchmarks.
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Candidate Profile Card */}
                <div className="lg:col-span-5 p-6 rounded-3xl bg-surface border border-border space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-white font-black text-lg flex items-center justify-center">
                      {activePersona.name[0]}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{activePersona.name}</h3>
                      <p className="text-xs text-muted font-medium">{activePersona.targetRole}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-canvas border border-border/80 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted">Target Seniority:</span>
                      <span className="font-bold text-ink">Entry to Mid-Level</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Tracked Competencies:</span>
                      <span className="font-bold text-ink">{activePersona.skills.length} Skills</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Evidence Verification:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">Verified Proof</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="btn-primary w-full text-xs font-bold justify-center gap-1.5 h-11"
                    >
                      <span>Proceed to Deterministic Gap Audit →</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right: Extracted Skills & Evidence Matrix */}
                <div className="lg:col-span-7 p-6 rounded-3xl bg-surface border border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-ink">Extracted Competency Evidence</h4>
                    <span className="text-[11px] text-muted font-semibold">Tiered Verification</span>
                  </div>

                  <div className="space-y-2.5">
                    {activePersona.skills.map((skill) => (
                      <div key={skill.name} className="p-3.5 rounded-xl bg-canvas border border-border/80 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-ink block">{skill.name}</span>
                          <span className="text-[10px] text-muted">{skill.evidence}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-primary">
                            Level {skill.user} / {skill.required}
                          </span>
                          <Chip variant={skill.user >= skill.required ? "strong" : "partial"}>
                            {skill.user >= skill.required ? "Matched" : "Gap"}
                          </Chip>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Deterministic Gap Scoring & Radar */}
          {activeStep === 2 && (
            <div className="space-y-6 animate-scale-in">
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3">
                <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <b className="text-ink">Step 2 Walkthrough:</b> Our deterministic mathematical formula combines 5 transparent pillars. Unlike black-box LLMs, every point on this gauge is directly auditable.
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Score Gauge & Radar */}
                <div className="lg:col-span-6 p-6 rounded-3xl bg-surface border border-border space-y-6">
                  <div className="text-center pb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted block mb-1">
                      Computed Readiness Score
                    </span>
                    <ScoreGauge score={currentScore} confidence={0.92} size={180} />
                    <div className="mt-3">
                      <Chip variant={currentScore >= 80 ? "strong" : "partial"}>
                        {currentScore >= 80 ? "Job Ready Benchmark" : "Skill Gaps Identified"}
                      </Chip>
                    </div>
                  </div>

                  {/* Radar alignment */}
                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-ink">
                      <span>Radar Skill Alignment</span>
                      <div className="flex items-center gap-3 text-[10px] text-muted">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" />Candidate</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-muted/40" />Required</span>
                      </div>
                    </div>
                    <div className="h-56">
                      <SkillRadar data={radarData} />
                    </div>
                  </div>
                </div>

                {/* Right: Mathematical Weight Breakdown */}
                <div className="lg:col-span-6 p-6 rounded-3xl bg-surface border border-border space-y-5">
                  <h4 className="text-sm font-bold text-ink uppercase tracking-wider">
                    5-Pillar Mathematical Weights
                  </h4>

                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold text-ink mb-1">
                        <span>Core Skill Coverage</span>
                        <span>{weights.coreCoverage}% weight</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-canvas border overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${weights.coreCoverage}%` }} />
                      </div>
                      <span className="text-[11px] text-muted">Matches essential non-negotiables</span>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold text-ink mb-1">
                        <span>Proficiency Depth</span>
                        <span>{weights.proficiencyDepth}% weight</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-canvas border overflow-hidden">
                        <div className="h-full bg-indigo-400" style={{ width: `${weights.proficiencyDepth}%` }} />
                      </div>
                      <span className="text-[11px] text-muted">Depth against Levels 1–5 rubrics</span>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold text-ink mb-1">
                        <span>Evidence Tier Reliability</span>
                        <span>{weights.evidenceReliability}% weight</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-canvas border overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${weights.evidenceReliability}%` }} />
                      </div>
                      <span className="text-[11px] text-muted">Production code &gt; certs &gt; self-ratings</span>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold text-ink mb-1">
                        <span>Soft Skills &amp; Bonus Tools</span>
                        <span>10% weight</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-canvas border overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: "10%" }} />
                      </div>
                      <span className="text-[11px] text-muted">Communication, Redis, Docker, Tailwind</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="btn-secondary text-xs font-semibold"
                    >
                      ← Back to Intake
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="btn-primary text-xs font-bold"
                    >
                      Simulate Live Recalculation →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Live 30/60/90-Day Learning Plan & Recalculation */}
          {activeStep === 3 && (
            <div className="space-y-6 animate-scale-in">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <b className="text-ink">Step 3 Interactive Sandbox:</b> Click the milestone checkboxes below! Notice how the readiness gauge dynamically recalculates in real-time as proof is submitted.
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Interactive Roadmap Checkboxes */}
                <div className="lg:col-span-7 p-6 rounded-3xl bg-surface border border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-ink">Action Plan Milestones (Click to Complete)</h4>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                      +{milestoneBoost} pts gained
                    </span>
                  </div>

                  <div className="space-y-3">
                    {activePersona.milestones.map((m) => {
                      const isDone = Boolean(completedMilestones[m.id]);
                      return (
                        <div
                          key={m.id}
                          onClick={() => toggleMilestone(m.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                            isDone
                              ? "bg-emerald-500/5 border-emerald-500/40 shadow-xs"
                              : "bg-canvas border-border hover:border-primary/40"
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                            isDone ? "bg-emerald-600 text-white" : "border-2 border-muted/40 text-transparent"
                          }`}>
                            <Check className="w-3.5 h-3.5" />
                          </div>

                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <h5 className={`text-xs font-bold ${isDone ? "line-through text-muted" : "text-ink"}`}>
                                {m.title}
                              </h5>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-subtle text-primary shrink-0">
                                +{m.scoreBoost} Pts
                              </span>
                            </div>
                            <span className="text-[10px] text-muted font-medium block">
                              Target Timeframe: {m.timeframe} · Evidence Tier 2 Required
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Live Dynamic Score Outcome */}
                <div className="lg:col-span-5 p-6 rounded-3xl bg-surface border border-border space-y-6 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
                    Live Recalculated Score
                  </span>

                  <ScoreGauge score={currentScore} confidence={0.95} size={180} />

                  <div className="p-4 rounded-2xl bg-canvas border border-border/80 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-muted">Baseline Starting Score:</span>
                      <span className="font-bold text-ink">{activePersona.baselineScore}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Milestones Checked:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {Object.values(completedMilestones).filter(Boolean).length} / {activePersona.milestones.length}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-ink pt-1 border-t border-border/60">
                      <span>Live Career Readiness:</span>
                      <span className="text-primary">{currentScore}/100</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="btn-secondary text-xs font-semibold"
                    >
                      ← Back to Gap Audit
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(4)}
                      className="btn-primary text-xs font-bold"
                    >
                      View Counselor Portal →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Counselor & Cohort Analytics View */}
          {activeStep === 4 && (
            <div className="space-y-6 animate-scale-in">
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3">
                <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <b className="text-ink">Step 4 Institutional Walkthrough:</b> For university career centers and training institutes. Counselors monitor student cohorts, track skill distributions, and flag students needing targeted intervention.
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-surface border border-border space-y-6">
                {/* Cohort KPI Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-canvas border border-border">
                    <span className="text-[11px] text-muted font-bold uppercase tracking-wider block">Cohort Size</span>
                    <span className="text-2xl font-black text-ink">142</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">CS Batch 2026</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-canvas border border-border">
                    <span className="text-[11px] text-muted font-bold uppercase tracking-wider block">Average Readiness</span>
                    <span className="text-2xl font-black text-primary">76.4%</span>
                    <span className="text-[10px] text-muted block mt-0.5">+12.8% since intake</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-canvas border border-border">
                    <span className="text-[11px] text-muted font-bold uppercase tracking-wider block">Job Ready Candidates</span>
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">89</span>
                    <span className="text-[10px] text-muted block mt-0.5">Score &gt;= 75%</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-canvas border border-border">
                    <span className="text-[11px] text-muted font-bold uppercase tracking-wider block">Intervention Flags</span>
                    <span className="text-2xl font-black text-rose-600 dark:text-rose-400">14</span>
                    <span className="text-[10px] text-muted block mt-0.5">Critical gaps flagged</span>
                  </div>
                </div>

                {/* Simulated Student List */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-ink uppercase tracking-wider">Candidate Cohort Roster Snapshot</h4>
                  <div className="rounded-2xl border border-border overflow-hidden">
                    <div className="grid grid-cols-12 p-3 bg-surface-subtle text-[11px] font-bold text-muted border-b border-border">
                      <div className="col-span-4">Student Name</div>
                      <div className="col-span-3">Target Benchmark</div>
                      <div className="col-span-2 text-center">Score</div>
                      <div className="col-span-3 text-right">Status</div>
                    </div>
                    {[
                      { name: "Alex Chen", role: "Frontend Dev", score: currentScore, status: currentScore >= 80 ? "Job Ready" : "In Progress" },
                      { name: "Priya Nair", role: "Data Scientist", score: 78, status: "Job Ready" },
                      { name: "Rohan Kulkarni", role: "AI Engineer", score: 62, status: "At-Risk Flag" },
                      { name: "Neha Verma", role: "Full-Stack Dev", score: 84, status: "Job Ready" },
                    ].map((row) => (
                      <div key={row.name} className="grid grid-cols-12 p-3.5 text-xs border-b border-border/60 last:border-none items-center bg-surface">
                        <div className="col-span-4 font-bold text-ink">{row.name}</div>
                        <div className="col-span-3 text-muted">{row.role}</div>
                        <div className="col-span-2 text-center font-mono font-bold text-primary">{row.score}/100</div>
                        <div className="col-span-3 text-right">
                          <Chip variant={row.status === "Job Ready" ? "strong" : row.status === "At-Risk Flag" ? "critical" : "partial"}>
                            {row.status}
                          </Chip>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="btn-secondary text-xs font-semibold"
                  >
                    ← Back to Recalibration
                  </button>
                  <Link
                    href="/register"
                    className="btn-primary text-xs font-bold px-6 py-2.5 h-10"
                  >
                    Create Free Candidate Account →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Bottom Permanent CTA */}
        <section className="pb-20">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="rounded-3xl p-8 sm:p-12 text-center space-y-4 bg-gradient-to-r from-indigo-900 via-indigo-950 to-purple-900 text-white">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
                Ready to Experience the Real Platform?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Benchmark Your Actual Skills with Clinical Accuracy
              </h2>
              <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto">
                No credit cards. No opaque generative AI guesses. Just clean, deterministic mathematics, ATS-compliant resume tools, and personalized roadmaps.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link href="/register" className="btn-glass text-xs font-bold px-7 py-3 h-12">
                  Create Free Account &amp; Start Audit →
                </Link>
                <Link href="/tools/resume-builder" className="btn-secondary text-xs font-semibold px-5 py-3 h-12 bg-white/10 text-white border-white/20 hover:bg-white/20">
                  Try ATS Resume Builder Free
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
