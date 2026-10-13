// src/app/government-skill-programs/page.tsx
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Building2, Award, CheckCircle2, ExternalLink, HelpCircle, ArrowRight, ShieldCheck, Sparkles, BookOpen } from "lucide-react";

export const metadata = {
  title: "Government Skill Programs in India — PMKVY, Skill India & FutureSkills",
  description: "Comprehensive guide to India's government skilling programs: PMKVY 4.0, Skill India Digital Hub, NASSCOM FutureSkills Prime, and NSDC certifications.",
};

export default function GovernmentSkillProgramsPage() {
  const schemes = [
    {
      name: "PMKVY 4.0 (Pradhan Mantri Kaushal Vikas Yojana)",
      body: "Ministry of Skill Development & Entrepreneurship (MSDE)",
      focus: "Industry 4.0 skills including AI, Robotics, Mechatronics, IoT, and Cloud Computing.",
      benefits: "100% government-funded training, assessment & certification fee waiver, placement assistance, and DigiLocker verifiable certificates.",
      eligibility: "Indian youth aged 15–45, college dropouts, fresh graduates, and unorganized workforce.",
      certLevel: "NSQF Level 4 to 7",
      portalUrl: "https://www.skillindiadigital.gov.in/",
      isFeatured: true,
    },
    {
      name: "NASSCOM FutureSkills Prime",
      body: "MeitY (Govt of India) & NASSCOM",
      focus: "Emerging digital technologies: Generative AI, Big Data, Cybersecurity, Cloud, and Web3.",
      benefits: "Deep tech subsidies (up to 50% course fee rebate from Govt of India for eligible citizens), IT major industry accreditation.",
      eligibility: "Engineering students, working tech professionals, and IT career transitioners.",
      certLevel: "Industry Recognized by Top Tier-1 IT Employers",
      portalUrl: "https://futureskillsprime.in/",
      isFeatured: true,
    },
    {
      name: "Skill India Digital Hub (SIDH)",
      body: "National Skill Development Corporation (NSDC)",
      focus: "Unified digital gateway aggregating thousands of vocational and high-tech skilling courses.",
      benefits: "Biometric and Aadhaar-backed credentialing, mobile app accessibility, multi-language support across 12+ Indian languages.",
      eligibility: "Open to all Indian citizens with Aadhaar card.",
      certLevel: "NSDC Verified Digital Badges",
      portalUrl: "https://www.skillindiadigital.gov.in/",
      isFeatured: false,
    },
    {
      name: "SANKALP Scheme",
      body: "World Bank & MSDE",
      focus: "District-level skill development governance, women inclusion, and micro-entrepreneurship.",
      benefits: "Stipends during training, access to local industrial clusters, and vocational mentorship.",
      eligibility: "Youth from tier-2/3/4 districts and disadvantaged socio-economic backgrounds.",
      certLevel: "State Skill Development Mission (SSDM) Endorsed",
      portalUrl: "https://msde.gov.in/",
      isFeatured: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-surface border-b border-border py-14 sm:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
              <Building2 className="w-3.5 h-3.5" />
              <span>National Skilling Architecture · Subsidies &amp; Certifications</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
              India&apos;s National{" "}
              <span className="gradient-text">Skill Development Programs</span>
            </h1>

            <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
              A transparent breakdown of government-backed skilling initiatives, eligibility rules, certification validity, and how Indian learners can access free or subsidized training.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-muted">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-status-strong" /> DigiLocker Verified Credentials</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-status-strong" /> NSQF Framework Aligned</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-status-strong" /> MeitY &amp; MSDE Subsidies</span>
            </div>
          </div>
        </section>

        {/* Schemes Cards Grid */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Flagship Schemes</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
              Top Government Upskilling Initiatives
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              Explore programs sponsored by MSDE, MeitY, and NSDC with verified career utility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {schemes.map((scheme) => (
              <div
                key={scheme.name}
                className={`rounded-3xl border p-8 flex flex-col justify-between space-y-6 ${
                  scheme.isFeatured
                    ? "bg-surface border-primary/40 shadow-lg shadow-primary/5"
                    : "bg-surface border-border"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary-subtle text-primary border border-primary/20">
                      {scheme.certLevel}
                    </span>
                    {scheme.isFeatured && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-accent/20 text-accent uppercase tracking-wider">
                        High Priority
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-ink">{scheme.name}</h3>
                    <p className="text-xs font-semibold text-muted mt-1">{scheme.body}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-canvas border border-border space-y-2 text-xs">
                    <div>
                      <span className="font-bold text-ink block mb-0.5">Focus Areas:</span>
                      <p className="text-muted leading-relaxed">{scheme.focus}</p>
                    </div>
                    <div className="pt-2 border-t border-border/60">
                      <span className="font-bold text-ink block mb-0.5">Benefits &amp; Subsidies:</span>
                      <p className="text-muted leading-relaxed">{scheme.benefits}</p>
                    </div>
                    <div className="pt-2 border-t border-border/60">
                      <span className="font-bold text-ink block mb-0.5">Eligibility:</span>
                      <p className="text-muted leading-relaxed">{scheme.eligibility}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
                  <a
                    href={scheme.portalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>Visit Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <Link
                    href="/register"
                    className="btn-secondary text-xs font-semibold"
                  >
                    Test My Readiness
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 4-Step Enrollment Guide */}
          <div className="p-8 sm:p-10 rounded-3xl bg-surface border border-border space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">How to Apply</span>
              <h3 className="text-2xl font-extrabold text-ink">
                4 Steps to Access Government Skill Programs
              </h3>
              <p className="text-xs text-muted">
                Navigate the enrollment process smoothly from Aadhaar KYC to certification issuance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { step: "1", title: "Aadhaar e-KYC", desc: "Create a verified profile on Skill India Digital Hub or FutureSkills Prime using your Aadhaar number." },
                { step: "2", title: "Select Sector & NSQF", desc: "Choose your target emerging technology domain (AI, Data, Web, Cloud) and verify the required NSQF level." },
                { step: "3", title: "Training & Capstone", desc: "Complete mandatory practical hours and submit capstone projects evaluated by certified industry assessors." },
                { step: "4", title: "DigiLocker Badge", desc: "Pass the proctored assessment to receive a tamper-proof digital credential stored directly in your DigiLocker." },
              ].map((item) => (
                <div key={item.step} className="p-5 rounded-2xl bg-canvas border border-border space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-primary text-white font-extrabold flex items-center justify-center text-xs">
                    {item.step}
                  </span>
                  <h4 className="text-sm font-bold text-ink">{item.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="text-center space-y-1 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Clarifications</span>
              <h3 className="text-xl font-extrabold text-ink">Frequently Asked Questions</h3>
            </div>

            {[
              {
                q: "Do private tech product companies recognize PMKVY or FutureSkills certificates?",
                a: "Top IT majors and startups actively value NASSCOM FutureSkills Prime certificates because curriculum standards are co-created with industry tech leaders. However, certificates must always be backed by live GitHub repositories and demonstrated project proof.",
              },
              {
                q: "Are these government skill programs completely free?",
                a: "Programs under PMKVY 4.0 are 100% government-funded for eligible candidates. FutureSkills Prime offers blended programs where basic literacy modules are free, while deep-tech certifications have government subsidy rebates up to 50%.",
              },
              {
                q: "Can college graduates with regular degrees enroll in these programs?",
                a: "Yes! In fact, fresh engineering and science graduates are the primary target demographic for advanced courses in AI, Big Data, and Cloud Architecture.",
              },
            ].map((faq) => (
              <div key={faq.q} className="p-5 rounded-2xl bg-surface border border-border space-y-2">
                <h4 className="text-sm font-bold text-ink flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-muted leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
