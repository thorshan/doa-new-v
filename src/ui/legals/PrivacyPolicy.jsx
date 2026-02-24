import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Database, Lock, Eye, Bell } from "lucide-react";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-text font-sans">
      {/* Header */}
      <div className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary font-black uppercase tracking-tighter hover:opacity-70 transition-opacity"
          >
            <ChevronLeft size={20} /> Home
          </button>
          <img src="/assets/logo.png" alt="Logo" className="h-10" />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <div className="inline-flex p-4 rounded-3xl bg-primary/10 text-primary mb-6 animate-bounce">
            <Lock size={40} />
          </div>
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 leading-none">
            Privacy Policy
          </h1>
          <p className="text-text/40 font-black uppercase tracking-[0.4em] text-xs">
            Your data security is our priority
          </p>
        </div>

        <div className="space-y-16">
          <section className="bg-surface border border-border rounded-[2.5rem] p-10 md:p-12 shadow-2xl shadow-primary/5 transition-transform hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-inverted shadow-lg shadow-primary/20">
                <Database size={24} />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight">
                Data Collection
              </h2>
            </div>
            <p className="text-text/70 text-lg leading-relaxed mb-6">
              We collect information you provide directly to us when you create
              an account, such as your name, email address, and profile picture.
              Additionally, we automatically collect:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-background/50 rounded-2xl border border-border/50">
                <h4 className="font-black uppercase text-xs text-primary mb-2">
                  Technical Data
                </h4>
                <p className="text-sm text-text/60">
                  IP addresses, browser type, and operating system details for
                  security and optimization.
                </p>
              </div>
              <div className="p-6 bg-background/50 rounded-2xl border border-border/50">
                <h4 className="font-black uppercase text-xs text-primary mb-2">
                  Usage Data
                </h4>
                <p className="text-sm text-text/60">
                  Lessons completed, time spent learning, and interaction with
                  our AI tools.
                </p>
              </div>
            </div>
          </section>

          <section className="px-6 border-l-4 border-primary/20">
            <div className="flex items-center gap-4 mb-6">
              <Eye className="text-primary" size={28} />
              <h2 className="text-3xl font-black uppercase tracking-tight">
                How We Use Data
              </h2>
            </div>
            <div className="space-y-4 text-text/70 text-lg">
              <p>We use the collected information to:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span>
                    Personalize your Japanese learning path based on your
                    progress.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span>
                    Communicate updates, security alerts, and support messages.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span>
                    Monitor and analyze trends to improve Platform
                    functionality.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-primary text-inverted rounded-[2.5rem] p-10 md:p-12 shadow-2xl shadow-primary/30">
            <div className="flex items-center gap-4 mb-6">
              <Bell size={28} />
              <h2 className="text-3xl font-black uppercase tracking-tight leading-none">
                Cookies & Tracking
              </h2>
            </div>
            <p className="text-inverted/80 text-lg leading-relaxed mb-8">
              We use cookies to keep you logged in and to remember your language
              preferences. You can instruct your browser to refuse all cookies
              or to indicate when a cookie is being sent.
            </p>
            <button className="bg-inverted text-primary px-8 py-3 rounded-xl font-black uppercase tracking-widest text-sm hover:opacity-90 transition-opacity">
              Manage Preferences
            </button>
          </section>

          <div className="pt-10 text-center">
            <p className="text-text/40 font-bold uppercase tracking-widest text-xs mb-4">
              Have questions about your privacy?
            </p>
            <a
              href="mailto:privacy@doa-jp.com"
              className="text-2xl font-black text-primary hover:underline underline-offset-8"
            >
              privacy@doa-jp.com
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
