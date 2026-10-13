"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, User, Mail, Lock, Eye, EyeOff, Loader2, Sparkles, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ name: false, email: false, password: false });
  const [error, setError] = useState<string | null>(null);

  const nameError =
    touched.name && !name.trim()
      ? "Full name is required."
      : touched.name && name.trim().length < 2
      ? "Name must be at least 2 characters."
      : null;

  const emailError =
    touched.email && !email
      ? "Email address is required."
      : touched.email && !/\S+@\S+\.\S+/.test(email)
      ? "Please enter a valid email address."
      : null;

  const passwordError =
    touched.password && !password
      ? "Password is required."
      : touched.password && password.length < 6
      ? "Password must be at least 6 characters."
      : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });

    if (
      !name.trim() ||
      name.trim().length < 2 ||
      !email ||
      !/\S+@\S+\.\S+/.test(email) ||
      !password ||
      password.length < 6
    ) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const regRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email, password }),
      });

      const regData = await regRes.json();
      if (!regRes.ok) {
        throw new Error(regData.error || "Failed to create account");
      }

      // Automatically sign in upon successful registration
      const signRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signRes?.error) {
        router.push("/login?message=Account created. Please log in.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-8 animate-scale-in w-full">
      {/* Header */}
      <div className="mb-7 text-center animate-fade-in-up">
        {/* Floating badge */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4"
          style={{ background: "rgba(79,70,229,0.25)", border: "1px solid rgba(99,102,241,0.4)" }}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
          <span className="text-xs font-semibold text-indigo-200">Get Started Free</span>
        </div>

        <h1 className="text-2xl font-bold text-white mb-1.5 tracking-tight">
          Create an Account
        </h1>
        <p className="text-sm text-white/50">
          Start your personalized Career Readiness Analysis
        </p>
      </div>

      {/* Trust pill row */}
      <div className="flex items-center justify-center gap-2 mb-6 flex-wrap animate-fade-in-up delay-100">
        {[
          "100% Free",
          "Auditable Scoring",
          "No Card Required",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-white/60"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <CheckCircle2 className="w-3 h-3 text-indigo-300" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Error Banner */}
      {error && (
        <div
          role="alert"
          className="p-3 rounded-xl flex items-center gap-2 mb-5 text-sm animate-fade-in-up"
          style={{ background: "rgba(225,29,72,0.15)", border: "1px solid rgba(225,29,72,0.35)" }}
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span className="font-medium text-red-300">{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Full Name */}
        <div className="animate-fade-in-up delay-150">
          <label htmlFor="register-name" className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">
            Full Name
          </label>
          <div className="relative">
            <User
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none w-[17px] h-[17px] text-white/40"
              aria-hidden="true"
            />
            <input
              id="register-name"
              type="text"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(null);
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              required
              placeholder="Alex Chen"
              className={`glass-input pl-10 h-12 ${nameError ? "border-red-400/60 focus:border-red-400" : ""}`}
            />
          </div>
          {nameError && (
            <p className="text-[11px] text-red-400 font-medium mt-1">{nameError}</p>
          )}
        </div>

        {/* Email */}
        <div className="animate-fade-in-up delay-200">
          <label htmlFor="register-email" className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none w-[17px] h-[17px] text-white/40"
              aria-hidden="true"
            />
            <input
              id="register-email"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              required
              placeholder="alex@example.com"
              className={`glass-input pl-10 h-12 ${emailError ? "border-red-400/60 focus:border-red-400" : ""}`}
            />
          </div>
          {emailError && (
            <p className="text-[11px] text-red-400 font-medium mt-1">{emailError}</p>
          )}
        </div>

        {/* Password */}
        <div className="animate-fade-in-up delay-300">
          <label htmlFor="register-password" className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none w-[17px] h-[17px] text-white/40"
              aria-hidden="true"
            />
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null);
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              required
              placeholder="At least 6 characters"
              className={`glass-input pl-10 pr-12 h-12 ${passwordError ? "border-red-400/60 focus:border-red-400" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white/80 transition cursor-pointer rounded-lg"
            >
              {showPassword ? (
                <EyeOff className="w-[17px] h-[17px]" />
              ) : (
                <Eye className="w-[17px] h-[17px]" />
              )}
            </button>
          </div>
          {passwordError && (
            <p className="text-[11px] text-red-400 font-medium mt-1">{passwordError}</p>
          )}
        </div>

        {/* Submit */}
        <div className="animate-fade-in-up delay-400 pt-1">
          <button
            type="submit"
            disabled={loading}
            className="btn-glass w-full h-12 text-sm font-bold tracking-wide relative overflow-hidden"
          >
            {!loading && (
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
                  transform: "translateX(-100%) skewX(-15deg)",
                  animation: "shimmerSlide 3s ease-in-out infinite",
                }}
              />
            )}
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account & Continue →</span>
            )}
          </button>
        </div>
      </form>

      {/* Divider & Sign in link */}
      <div className="mt-6 flex items-center gap-3 animate-fade-in-up delay-500">
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
        <span className="text-xs text-white/30 font-medium">ALREADY REGISTERED?</span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
      </div>

      <div className="mt-4 text-center animate-fade-in-up delay-600">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          Sign in to existing account
        </Link>
      </div>

      <p className="text-center text-[11px] text-white/25 mt-5 animate-fade-in-up delay-700">
        By registering you agree to our Terms of Service &amp; Privacy Policy
      </p>
    </div>
  );
}
