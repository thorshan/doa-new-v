import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Scale, ShieldAlert, FileText, Globe } from "lucide-react";

const TermsOfService = () => {
  const navigate = useNavigate();
  const sections = [
    { id: "acceptance", title: "Acceptance of Terms", icon: FileText },
    { id: "accounts", title: "User Accounts", icon: Scale },
    { id: "content", title: "Content & IP", icon: Globe },
    { id: "prohibited", title: "Prohibited Acts", icon: ShieldAlert },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-text font-sans">
      {/* Header */}
      <div className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary font-black uppercase tracking-tighter hover:opacity-70 transition-opacity"
          >
            <ChevronLeft size={20} /> Back to Home
          </button>
          <img src="/assets/logo.png" alt="Logo" className="h-10" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="hidden md:block w-64 shrink-0 sticky top-32 h-fit">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text/30 mb-6">
            On this page
          </p>
          <nav className="flex flex-col gap-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 hover:text-primary font-bold text-sm transition-all text-left"
              >
                <s.icon size={16} /> {s.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <article className="flex-1 max-w-3xl">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">
            Terms of Service
          </h1>
          <p className="text-text/40 font-bold mb-12 uppercase tracking-widest text-sm">
            Last Updated: February 2026
          </p>

          <div className="prose prose-invert prose-primary max-w-none space-y-16">
            <section id="acceptance" className="scroll-mt-32">
              <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">
                  01
                </span>
                Acceptance of Terms
              </h2>
              <p className="text-text/70 leading-relaxed text-lg">
                By accessing or using the <strong>DOA Portal</strong> ("the
                Platform"), you agree to be bound by these Terms of Service. If
                you do not agree to all terms, you may not access our services.
                Our services are intended for users who are at least 13 years of
                age.
              </p>
            </section>

            <section id="accounts" className="scroll-mt-32">
              <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">
                  02
                </span>
                User Accounts
              </h2>
              <p className="text-text/70 leading-relaxed text-lg mb-4">
                To access certain features, you must register for an account.
                You are responsible for maintaining the confidentiality of your
                password and account details.
              </p>
              <ul className="list-disc pl-6 space-y-3 text-text/70">
                <li>You must provide accurate and complete information.</li>
                <li>
                  You are solely responsible for all activity that occurs under
                  your account.
                </li>
                <li>
                  We reserve the right to suspend accounts that violate our
                  community guidelines.
                </li>
              </ul>
            </section>

            <section id="content" className="scroll-mt-32">
              <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">
                  03
                </span>
                Intellectual Property
              </h2>
              <p className="text-text/70 leading-relaxed text-lg">
                The Platform and its original content (excluding user-generated
                content), features, and functionality are and will remain the
                exclusive property of DOA and its licensors. Our trademarks and
                trade dress may not be used in connection with any product or
                service without prior written consent.
              </p>
            </section>

            <section id="prohibited" className="scroll-mt-32">
              <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">
                  04
                </span>
                Prohibited Activities
              </h2>
              <div className="bg-surface border border-border rounded-3xl p-8 space-y-4">
                <p className="font-bold text-text italic">
                  You agree not to engage in:
                </p>
                <ul className="grid grid-cols-1 gap-3 text-sm text-text/60 font-medium">
                  <li>
                    • Data mining, robots, or similar data gathering tools.
                  </li>
                  <li>
                    • Attempting to bypass any security measures of the
                    Platform.
                  </li>
                  <li>
                    • Using the Platform for any unauthorized commercial
                    purpose.
                  </li>
                  <li>
                    • Harassing or intimidating other users of the service.
                  </li>
                </ul>
              </div>
            </section>
          </div>

          <footer className="mt-20 pt-10 border-t border-border">
            <p className="text-sm text-text/40 font-bold italic">
              Questions about our Terms? Contact us at{" "}
              <span className="text-primary">legal@doa-jp.com</span>
            </p>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default TermsOfService;
