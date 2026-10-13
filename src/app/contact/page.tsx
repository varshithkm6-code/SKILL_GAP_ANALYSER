// src/app/contact/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Mail, Phone, MapPin, Send, CheckCircle2, HelpCircle, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "Career Guidance & Assessment",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-surface border-b border-border py-14 sm:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>We Are Here to Help · 24-Hour Response SLA</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
              Get in Touch with <span className="gradient-text">SkillBridge</span>
            </h1>

            <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
              Have questions about your readiness benchmark, role standards, college cohort partnerships, or ATS resume building? Send us a message below.
            </p>
          </div>
        </section>

        {/* Contact Form & Information Split */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-surface border border-border space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-ink">Contact Details</h3>
                  <p className="text-xs text-muted mt-1">
                    Connect directly with our academic guidance and engineering team.
                  </p>
                </div>

                <div className="space-y-4 text-xs text-muted">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-ink block">Direct Email:</span>
                      <a href="mailto:support@skillbridge.dev" className="text-primary hover:underline">
                        support@skillbridge.dev
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-ink block">Engineering Center:</span>
                      <span>Koramangala 4th Block, Bengaluru, Karnataka 560034, India</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-ink block">Operating Hours:</span>
                      <span>Monday to Friday, 9:00 AM – 6:00 PM IST</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <span className="text-[11px] font-bold text-ink uppercase tracking-wider block">
                    Institutional Partnerships:
                  </span>
                  <p className="text-xs text-muted leading-relaxed">
                    Colleges, universities, and training institutes looking to integrate cohort skill gap assessments can request custom counselor demos.
                  </p>
                  <Link href="/webdemo" className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 pt-1">
                    <span>Try Personio-Style Institutional Demo →</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Submission Form */}
            <div className="lg:col-span-7">
              <div className="p-8 rounded-3xl bg-surface border border-border shadow-sm">
                {submitted ? (
                  <div className="py-12 text-center space-y-4 animate-scale-in">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-ink">Message Received!</h3>
                    <p className="text-xs sm:text-sm text-muted max-w-md mx-auto">
                      Thank you for reaching out, <b>{formData.name}</b>. An academic counselor or technical specialist will respond to <b>{formData.email}</b> within 24 business hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="btn-secondary text-xs font-semibold px-4 py-2 mt-2"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-ink">Send Us a Message</h3>
                      <p className="text-xs text-muted mt-0.5">
                        Fill in the details below and we&apos;ll get back to you promptly.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1.5">Your Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Aarav Sharma"
                          className="control-input text-xs h-11"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1.5">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="aarav@example.com"
                          className="control-input text-xs h-11"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1.5">Inquiry Topic</label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="control-input text-xs h-11 bg-surface"
                      >
                        <option>Career Guidance &amp; Assessment</option>
                        <option>College / Campus Cohort Partnership</option>
                        <option>Employer Talent Benchmark Integration</option>
                        <option>Resume Builder Feedback / Bug Report</option>
                        <option>General Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1.5">Your Message / Query</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what you're working on or what you need assistance with..."
                        className="control-input text-xs resize-y"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full text-xs font-bold h-11 flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
