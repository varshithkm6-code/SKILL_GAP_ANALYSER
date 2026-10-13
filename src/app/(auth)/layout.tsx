import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-bg min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Animated floating orbs */}
      <div className="auth-orb auth-orb-1" aria-hidden="true" />
      <div className="auth-orb auth-orb-2" aria-hidden="true" />
      <div className="auth-orb auth-orb-3" aria-hidden="true" />

      {/* Particle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full">
        <Link href="/" className="flex items-center gap-2.5 mb-8 group animate-fade-in-down">
          <div
            className="w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-indigo-500/50"
            style={{ background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)" }}
          >
            SB
          </div>
          <span className="font-bold text-xl text-white tracking-tight">
            SkillBridge
          </span>
        </Link>
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
