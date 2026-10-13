// src/app/profile/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/layout/Navbar";
import { Chip } from "@/components/ui/Chip";
import { useToast } from "@/components/ui/Toast";
import { SettingsModal } from "@/components/layout/SettingsModal";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Award,
  BarChart3,
  Edit3,
  Save,
  Plus,
  Trash2,
  Star,
  CheckCircle2,
  ArrowRight,
  Settings,
  History,
  TrendingUp,
  Loader2,
  Lock,
} from "lucide-react";

interface UserProfileSkill {
  skillName: string;
  proficiency: number;
  evidenceType: "SELF_RATED" | "PROJECT" | "EXPERIENCE" | "CERTIFICATION";
  evidenceNotes?: string;
}

interface UserData {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
}

interface HistorySummary {
  totalAssessments: number;
  latestScore: number | null;
  targetRole: string | null;
}

const EVIDENCE_TIERS = [
  { value: "SELF_RATED", label: "Self-Rated", weight: "0.75x" },
  { value: "PROJECT", label: "Portfolio Project", weight: "0.90x" },
  { value: "EXPERIENCE", label: "Work Experience", weight: "0.95x" },
  { value: "CERTIFICATION", label: "Verified Certificate", weight: "1.00x" },
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { toast } = useToast();

  const [user, setUser] = useState<UserData | null>(null);
  const [skills, setSkills] = useState<UserProfileSkill[]>([]);
  const [historySummary, setHistorySummary] = useState<HistorySummary>({
    totalAssessments: 0,
    latestScore: null,
    targetRole: null,
  });

  const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [savingName, setSavingName] = useState(false);

  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillProficiency, setNewSkillProficiency] = useState(3);
  const [newSkillEvidence, setNewSkillEvidence] = useState<UserProfileSkill["evidenceType"]>("PROJECT");
  const [savingSkills, setSavingSkills] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [meRes, profRes, histRes] = await Promise.all([
          fetch("/api/me"),
          fetch("/api/profile"),
          fetch("/api/history"),
        ]);

        if (meRes.ok) {
          const meData = await meRes.json();
          if (meData.user) {
            setUser(meData.user);
            setNameInput(meData.user.name || "");
          }
        }

        if (profRes.ok) {
          const profData = await profRes.json();
          if (profData.profile?.profileSkills) {
            const loaded = profData.profile.profileSkills.map(
              (ps: { skill: { canonicalName: string }; proficiency: number; evidenceType: string; evidenceNotes?: string }) => ({
                skillName: ps.skill.canonicalName,
                proficiency: ps.proficiency,
                evidenceType: ps.evidenceType as UserProfileSkill["evidenceType"],
                evidenceNotes: ps.evidenceNotes,
              })
            );
            setSkills(loaded);
          }
        }

        if (histRes.ok) {
          const histData = await histRes.json();
          if (histData.analyses && histData.analyses.length > 0) {
            setHistorySummary({
              totalAssessments: histData.analyses.length,
              latestScore: Math.round(histData.analyses[0].score),
              targetRole: histData.analyses[0].role?.title || null,
            });
          }
        }
      } catch (err) {
        console.error("Profile load error:", err);
      } finally {
        setLoading(false);
      }
    }

    if (status !== "loading") {
      loadData();
    }
  }, [status]);

  const handleUpdateName = async () => {
    if (!nameInput.trim()) return;
    setSavingName(true);
    try {
      const res = await fetch("/api/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update name");

      setUser((prev) => (prev ? { ...prev, name: data.user.name } : null));
      setEditingName(false);
      toast({ type: "success", title: "Profile Updated", description: "Your name has been updated." });
    } catch (e) {
      toast({ type: "error", title: "Update Failed", description: e instanceof Error ? e.message : "Error saving name" });
    } finally {
      setSavingName(false);
    }
  };

  const saveSkillsToBackend = async (updatedSkills: UserProfileSkill[]) => {
    setSavingSkills(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parsedData: { education: [], experience: [], certifications: [], projects: [] },
          skills: updatedSkills,
        }),
      });
      if (!res.ok) throw new Error("Failed to save competencies");
      setSkills(updatedSkills);
      toast({ type: "success", title: "Competencies Saved", description: "Your skill profile was updated." });
    } catch (err) {
      toast({ type: "error", title: "Save Failed", description: "Could not persist competencies to database." });
    } finally {
      setSavingSkills(false);
    }
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const exists = skills.some((s) => s.skillName.toLowerCase() === newSkillName.trim().toLowerCase());
    if (exists) {
      toast({ type: "info", title: "Already Added", description: `${newSkillName} is already in your profile.` });
      return;
    }

    const updated = [
      ...skills,
      {
        skillName: newSkillName.trim(),
        proficiency: newSkillProficiency,
        evidenceType: newSkillEvidence,
      },
    ];
    saveSkillsToBackend(updated);
    setNewSkillName("");
    setNewSkillProficiency(3);
  };

  const handleRemoveSkill = (skillName: string) => {
    const updated = skills.filter((s) => s.skillName !== skillName);
    saveSkillsToBackend(updated);
  };

  const handleProficiencyChange = (skillName: string, delta: number) => {
    const updated = skills.map((s) => {
      if (s.skillName === skillName) {
        const next = Math.max(1, Math.min(5, s.proficiency + delta));
        return { ...s, proficiency: next };
      }
      return s;
    });
    saveSkillsToBackend(updated);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex flex-col bg-canvas text-ink">
        <Navbar />
        <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-12 flex items-center justify-center">
          <div className="text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-xs text-muted">Loading your career profile...</p>
          </div>
        </main>
      </div>
    );
  }

  if (status === "unauthenticated" || !user) {
    return (
      <div className="min-h-screen flex flex-col bg-canvas text-ink">
        <Navbar />
        <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-12 flex items-center justify-center">
          <div className="card p-12 text-center max-w-md w-full space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto text-primary">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-ink">Sign In Required</h2>
            <p className="text-xs text-muted leading-relaxed">
              Please sign in to view and manage your candidate profile, saved competencies, and assessment analytics.
            </p>
            <Link href="/login?callbackUrl=/profile" className="btn-primary text-xs px-5 py-2.5 inline-flex items-center gap-1.5 justify-center w-full">
              <span>Sign In to Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Navbar />

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Profile Header Banner */}
        <div className="card p-6 sm:p-8 bg-surface space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl shrink-0 border border-primary/20 shadow-sm">
                {user.name ? user.name.slice(0, 2).toUpperCase() : user.email.slice(0, 2).toUpperCase()}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  {editingName ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="control-input text-base font-bold h-9 w-52"
                        placeholder="Your full name"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={handleUpdateName}
                        disabled={savingName}
                        className="btn-primary text-xs px-3 h-9"
                      >
                        {savingName ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingName(false);
                          setNameInput(user.name || "");
                        }}
                        className="btn-secondary text-xs px-3 h-9"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl font-bold tracking-tight text-ink">
                        {user.name || "Candidate Profile"}
                      </h1>
                      <button
                        type="button"
                        onClick={() => setEditingName(true)}
                        className="p-1 rounded-md text-muted hover:text-ink hover:bg-surface-subtle transition"
                        title="Edit name"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                  <Chip variant="strong" className="text-[10px] uppercase font-mono tracking-wider">
                    {user.role}
                  </Chip>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted pt-0.5">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-muted" />
                    <span>{user.email}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-muted" />
                    <span>Joined {new Date(user.createdAt).toLocaleDateString(undefined, { month: "short", year: "numeric" })}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="btn-secondary text-xs h-9 px-3 gap-1.5"
              >
                <Settings className="w-3.5 h-3.5 text-muted" />
                <span>Settings</span>
              </button>
              <Link href="/dashboard" className="btn-primary text-xs h-9 px-4 gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Run Assessment</span>
              </Link>
            </div>
          </div>

          {/* Key Metrics / Profile Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 border-t border-border">
            <div className="p-4 rounded-xl bg-canvas border border-border">
              <div className="text-[11px] font-semibold text-muted uppercase tracking-wider">Latest Score</div>
              <div className="text-2xl font-extrabold text-primary mt-1">
                {historySummary.latestScore !== null ? `${historySummary.latestScore}/100` : "—"}
              </div>
              <div className="text-[10px] text-muted mt-0.5">
                {historySummary.targetRole || "No target role yet"}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-border">
              <div className="text-[11px] font-semibold text-muted uppercase tracking-wider">Assessments</div>
              <div className="text-2xl font-extrabold text-ink mt-1">
                {historySummary.totalAssessments}
              </div>
              <div className="text-[10px] text-muted mt-0.5">Recorded in trajectory</div>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-border">
              <div className="text-[11px] font-semibold text-muted uppercase tracking-wider">Skills Tracked</div>
              <div className="text-2xl font-extrabold text-ink mt-1">
                {skills.length}
              </div>
              <div className="text-[10px] text-muted mt-0.5">Active profile competencies</div>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-border">
              <div className="text-[11px] font-semibold text-muted uppercase tracking-wider">Reliability Tier</div>
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                {skills.filter((s) => s.evidenceType === "CERTIFICATION" || s.evidenceType === "EXPERIENCE").length > 0 ? "High" : "Standard"}
              </div>
              <div className="text-[10px] text-muted mt-0.5">Evidence multiplier active</div>
            </div>
          </div>
        </div>

        {/* Competencies & Skills Manager Section */}
        <div className="card p-6 sm:p-8 bg-surface space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-ink">Profile Competencies &amp; Evidence Tiers</h2>
              <p className="text-xs text-muted mt-0.5">
                These ratings and evidence badges feed directly into your deterministic scoring engine.
              </p>
            </div>
            {savingSkills && (
              <span className="text-xs text-primary flex items-center gap-1.5 self-start sm:self-auto">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving updates...</span>
              </span>
            )}
          </div>

          {/* Add New Skill Input Row */}
          <div className="p-4 rounded-2xl bg-canvas border border-border flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Add skill (e.g. React, Python, Docker, SQL)..."
              className="control-input text-xs flex-1 h-10"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddSkill();
              }}
            />
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-surface border border-border rounded-lg px-2.5 h-10">
                <span className="text-[11px] text-muted font-medium mr-1">Level:</span>
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setNewSkillProficiency(lvl)}
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        lvl <= newSkillProficiency ? "fill-amber-400 text-amber-400" : "text-muted/30"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <select
                value={newSkillEvidence}
                onChange={(e) => setNewSkillEvidence(e.target.value as UserProfileSkill["evidenceType"])}
                className="control-input text-xs h-10 w-44"
              >
                {EVIDENCE_TIERS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label} ({t.weight})
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleAddSkill}
                disabled={!newSkillName.trim()}
                className="btn-primary text-xs px-4 h-10 gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>
          </div>

          {/* Skills Grid */}
          {skills.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-2xl space-y-2">
              <Award className="w-8 h-8 text-muted/50 mx-auto" />
              <div className="text-sm font-semibold text-ink">No skills added yet</div>
              <p className="text-xs text-muted max-w-sm mx-auto">
                Add skills manually above or upload your resume on the Skill Gap Analyzer dashboard.
              </p>
              <Link href="/dashboard" className="btn-secondary text-xs px-4 py-2 inline-flex mt-2">
                Go to Assessment Dashboard →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skills.map((s) => (
                <div
                  key={s.skillName}
                  className="p-4 rounded-xl bg-canvas border border-border flex flex-col justify-between gap-3 hover:border-primary/40 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-ink leading-tight">{s.skillName}</h4>
                      <span className="text-[10px] font-semibold text-primary uppercase tracking-wider block mt-1">
                        {s.evidenceType.replace("_", " ")}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(s.skillName)}
                      className="p-1 rounded-md text-muted hover:text-status-critical transition"
                      title="Remove skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/60">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <Star
                          key={lvl}
                          className={`w-3.5 h-3.5 ${
                            lvl <= s.proficiency ? "fill-amber-400 text-amber-400" : "text-muted/30"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <button
                        type="button"
                        onClick={() => handleProficiencyChange(s.skillName, -1)}
                        disabled={s.proficiency <= 1}
                        className="w-6 h-6 rounded flex items-center justify-center bg-surface border border-border hover:bg-surface-subtle disabled:opacity-30 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-bold text-xs">{s.proficiency}</span>
                      <button
                        type="button"
                        onClick={() => handleProficiencyChange(s.skillName, 1)}
                        disabled={s.proficiency >= 5}
                        className="w-6 h-6 rounded flex items-center justify-center bg-surface border border-border hover:bg-surface-subtle disabled:opacity-30 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links / Career Resources */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/dashboard"
            className="card p-5 bg-surface hover:border-primary transition-all duration-200 flex items-center justify-between group"
          >
            <div>
              <div className="text-sm font-bold text-ink group-hover:text-primary transition">Skill Gap Analyzer</div>
              <div className="text-xs text-muted mt-0.5">Recalculate readiness against benchmarks</div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/history"
            className="card p-5 bg-surface hover:border-primary transition-all duration-200 flex items-center justify-between group"
          >
            <div>
              <div className="text-sm font-bold text-ink group-hover:text-primary transition">Assessment History</div>
              <div className="text-xs text-muted mt-0.5">View progression curve &amp; past reports</div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/tools/resume-builder"
            className="card p-5 bg-surface hover:border-primary transition-all duration-200 flex items-center justify-between group"
          >
            <div>
              <div className="text-sm font-bold text-ink group-hover:text-primary transition">ATS Resume Builder</div>
              <div className="text-xs text-muted mt-0.5">Export optimized CV matching your skills</div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </main>

      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
