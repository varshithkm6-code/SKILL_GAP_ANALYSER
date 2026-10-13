"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, Lock, Mail, Eye, EyeOff, Loader2, Sparkles, TrendingUp, Target } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="glass-card p-8 text-center text-white/50 text-sm">Loading...</div>
    }>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [error, setError] = useState<string | null>(
    searchParams.get("error") ? "Invalid email or password" : null
  );

  const emailError =
    touched.email && !email
      ? "Email is required."
      : touched.email && !/\S+@\S+\.\S+/.test(email)
      ? "Please enter a valid email."
      : null;

  const passwordError =
    touched.password && !password
      ? "Password is required."
      : touched.password && password.length < 6
      ? "Minimum 6 characters."
      : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!email || !/\S+@\S+\.\S+/.test(email) || !password || password.length < 6) return;

    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.push("/hub");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-8 animate-scale-in w-full">
      {/* Header */}
      <div className="mb-7 text-center animate-fade-in-up">
        {/* Floating badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4"
          style={{ background: "rgba(79,70,229,0.25)", border: "1px solid rgba(99,102,241,0.4)" }}>
          <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
          <span className="text-xs font-semibold text-indigo-200">Career Readiness Platform</span>
        </div>

        <h1 className="text-2xl font-bold text-white mb-1.5 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-sm text-white/50">
          Sign in to access your readiness dashboard
        </p>
      </div>

      {/* Feature Pills */}
      <div className="flex items-center justify-center gap-2 mb-6 flex-wrap animate-fade-in-up delay-100">
        {[
          { icon: TrendingUp, label: "Live Scoring" },
          { icon: Target,     label: "Gap Analysis" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-white/60"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Icon className="w-3 h-3" />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div role="alert"
          className="p-3 rounded-xl flex items-center gap-2 mb-5 text-sm animate-fade-in-up"
          style={{ background: "rgba(225,29,72,0.15)", border: "1px solid rgba(225,29,72,0.35)" }}>
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span className="font-medium text-red-300">{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email */}
        <div className="animate-fade-in-up delay-200">
          <label htmlFor="login-email" className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none w-[17px] h-[17px] text-white/40" aria-hidden="true" />
            <input
              id="login-email"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(null); }}
              onBlur={() => setTouched((p) => ({ ...p, email: true }))}
              required
              placeholder="you@example.com"
              className={`glass-input pl-10 h-12 ${emailError ? "border-red-400/60 focus:border-red-400" : ""}`}
            />
          </div>
          {emailError && <p className="text-[11px] text-red-400 font-medium mt-1">{emailError}</p>}
        </div>

        {/* Password */}
        <div className="animate-fade-in-up delay-300">
          <label htmlFor="login-password" className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none w-[17px] h-[17px] text-white/40" aria-hidden="true" />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (error) setError(null); }}
              onBlur={() => setTouched((p) => ({ ...p, password: true }))}
              required
              placeholder="••••••••"
              className={`glass-input pl-10 pr-12 h-12 ${passwordError ? "border-red-400/60 focus:border-red-400" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white/80 transition cursor-pointer rounded-lg"
            >
              {showPassword ? <EyeOff className="w-[17px] h-[17px]" /> : <Eye className="w-[17px] h-[17px]" />}
            </button>
          </div>
          {passwordError && <p className="text-[11px] text-red-400 font-medium mt-1">{passwordError}</p>}
        </div>

        {/* Submit */}
        <div className="animate-fade-in-up delay-400 pt-1">
          <button
            id="login-submit-btn"
            type="submit"
            disabled={loading}
            className="btn-glass w-full h-12 text-sm font-bold tracking-wide relative overflow-hidden"
          >
            {/* Shimmer effect */}
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
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign in to Dashboard →</span>
            )}
          </button>
        </div>
      </form>

      {/* Divider & Register link */}
      <div className="mt-6 flex items-center gap-3 animate-fade-in-up delay-500">
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
        <span className="text-xs text-white/30 font-medium">NEW HERE?</span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
      </div>

      <div className="mt-4 text-center animate-fade-in-up delay-600">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          Create a free account
        </Link>
      </div>

      <p className="text-center text-[11px] text-white/25 mt-5 animate-fade-in-up delay-700">
        By continuing you agree to our Terms of Service
      </p>
    </div>
  );
}

