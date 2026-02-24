import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  User,
  ChevronDown,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { ROLES } from "../../constants/roles";
import {
  SiInstagram,
  SiTiktok,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { AVATAR } from "../avatar";
import { useAuth } from "../../hooks/useAuth";
import LanguageToggler from "../components/LangToggler";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../constants/translations";

// --- 1. TYPEWRITER EFFECT COMPONENT ---
const TypewriterSkill = ({ skills }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === skills[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1500);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % skills.length);
      return;
    }
    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 75 : 150,
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, skills]);

  return (
    <span className="italic min-h-[1.2em]">
      {skills[index].substring(0, subIndex)}
      <span className="animate-pulse border-r-4 border-primary ml-1" />
    </span>
  );
};

// --- 2. SCROLL REVEAL HOOK ---
const useScrollReveal = (threshold = 0.15) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

// --- 3. ANIMATED SECTION COMPONENT ---
const AnimatedSection = ({ section, navigate, t, lang }) => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section
      ref={ref}
      id={section.id}
      className="px-4 sm:px-6 md:px-20 py-24 md:py-32 scroll-mt-[90px] overflow-hidden"
    >
      <div
        className={`flex items-center gap-6 mb-24 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div
          className={`h-px flex-1 bg-border origin-left transition-transform duration-1000 delay-300 ${isVisible ? "scale-x-100" : "scale-x-0"}`}
        />
        <h1
          className={`text-base sm:text-lg md:text-xl font-bold ${section.color}`}
        >
          {section.title}
        </h1>
        <div
          className={`h-px flex-1 bg-border origin-right transition-transform duration-1000 delay-300 ${isVisible ? "scale-x-100" : "scale-x-0"}`}
        />
      </div>

      <div className="relative flex flex-col md:flex-row items-center gap-12">
        <div
          className={`z-10 flex-1 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
        >
          <h5 className="text-3xl sm:text-4xl md:text-6xl font-black text-text mb-6 leading-none tracking-tighter">
            {section.sub}
          </h5>
          <p
            className={`text-text/60 text-sm sm:text-base md:text-lg leading-relaxed font-medium max-w-xl mb-10 ${lang === "mm" ? "leading-loose" : ""}`}
          >
            {lang === "jp"
              ? "「ドア」を最大限に活用する方法を学びましょう！"
              : lang === "mm"
                ? "doa ကို အကောင်းဆုံး အသုံးချနည်းကို လေ့လာပါ။ သင်၏ အရည်အချင်းများကို မြှင့်တင်ရန် အကြံပြုချက်များကို လေ့လာပါ။"
                : "Discover how to make the most out of doa! Learn tips and tricks to improve your skills."}
          </p>
          <button
            onClick={() => navigate(section.path)}
            className="group relative overflow-hidden px-7 sm:px-10 py-3.5 sm:py-4 border-2 border-primary text-primary rounded-2xl font-black transition-all tracking-widest text-xs sm:text-sm active:scale-95"
          >
            <span className="relative z-10 group-hover:text-inverted transition-colors duration-300">
              {t.explore}
            </span>
            <div className="absolute inset-0 bg-primary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
        </div>
        <div
          className={`flex-1 w-full flex justify-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-30 scale-100" : "opacity-0 scale-75"}`}
        >
          <img
            src={section.img}
            className="max-h-[450px] object-contain drop-shadow-2xl"
            alt={section.title}
          />
        </div>
      </div>
    </section>
  );
};

// --- 4. MAIN COMPONENT ---
const GetStarted = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toggleTheme, theme } = useTheme();
  const menuRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { language = "en" } = useLanguage() || {};

  const t = {
    manual: translations[language]?.manual || "manual",
    about: translations[language]?.about_team || "about team",
    apps: translations[language]?.apps || "applications",
    user_manual: translations[language]?.user_manual || "user manual",
    about_team: translations[language]?.about_team || "about our team",
    use_app: translations[language]?.use_app || "use our app",
    explore: translations[language]?.explore_now || "explore now",
    s_speaking: translations[language]?.speaking || "speaking",
    s_reading: translations[language]?.reading || "reading",
    s_listening: translations[language]?.listening || "listening",
    s_vocab: translations[language]?.vocabulary || "vocabulary",
    s_grammar: translations[language]?.grammar || "grammar",
  };

  const navLinks = [
    { name: t.manual, id: "manual" },
    { name: t.about, id: "about" },
    { name: t.apps, id: "apps" },
  ];

  const skills = [
    t.s_speaking,
    t.s_reading,
    t.s_listening,
    t.s_vocab,
    t.s_grammar,
  ];

  const socials = [
    { icon: SiTiktok, path: "https://www.tiktok.com/@doa_jp_official" },
    { icon: SiInstagram, path: "https://www.instagram.com/doa_jp_official" },
    { icon: SiYoutube, path: "https://www.youtube.com/@doa-jp" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (document.readyState !== "complete") return;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const docHeight = scrollHeight - clientHeight;
        setIsScrolled(scrollTop > 50);
        if (docHeight > 0) setScrollProgress((scrollTop / docHeight) * 100);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  // Close mobile drawer on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setDrawerOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setDrawerOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const AvatarComponent = ({ avatarId, size = "w-10 h-10" }) => (
    <div
      className={`${size} rounded-full bg-primary flex items-center justify-center text-inverted font-black overflow-hidden shadow-inner`}
    >
      {avatarId ? (
        <img
          src={AVATAR[avatarId]}
          className="w-full h-full object-cover"
          alt="avatar"
        />
      ) : (
        <User size={20} />
      )}
    </div>
  );

  return (
    <div
      className={`bg-background min-h-screen transition-colors duration-300 font-sans selection:bg-primary selection:text-inverted overflow-x-hidden ${language === "mm" ? "font-myanmar" : "font-noto-jp"}`}
    >
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-[1200] transition-all duration-300 ${isScrolled ? "bg-surface/80 backdrop-blur-md shadow-md" : "bg-transparent"}`}
      >
        <div className="h-[3px] w-full bg-transparent overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <nav className="h-[90px] px-6 md:px-20 flex items-center justify-between">
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <img
              src="/assets/logo.png"
              alt="logo"
              className="h-[70px] md:h-[80px] object-contain group-hover:scale-110 transition-transform"
            />
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((nav, i) => (
              <button
                key={i}
                onClick={() => handleScrollTo(nav.id)}
                className="px-4 py-2 text-sm font-semibold text-text hover:text-primary transition-colors tracking-widest"
              >
                {nav.name}
              </button>
            ))}
            <div className="h-6 w-px bg-border mx-2" />
            <LanguageToggler />
            <button
              onClick={toggleTheme}
              className="p-2 text-primary hover:bg-primary/10 rounded-full transition-all mx-2"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {!isAuthenticated ? (
              <div className="flex items-center gap-2 ml-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-bold text-text hover:text-primary transition-colors"
                >
                  login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 bg-primary text-inverted rounded-full font-bold transition-all hover:shadow-lg active:scale-95"
                >
                  register
                </Link>
              </div>
            ) : (
              <div className="relative ml-4" ref={menuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-surface border border-border/50 transition-all"
                >
                  <AvatarComponent avatarId={user?.avatarId} />
                  <ChevronDown
                    size={14}
                    className={`text-text/50 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-surface border border-border rounded-2xl shadow-2xl py-2 z-[1500] animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-border/50 mb-1">
                      <p className="text-[10px] font-black text-text/30 tracking-[0.2em]">
                        account
                      </p>
                      <p className="text-sm font-bold text-text truncate">
                        {user?.name}
                      </p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-text hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <LayoutDashboard size={16} /> dashboard
                    </Link>
                    {user?.role === ROLES.ADMIN && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-text hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Settings size={16} /> admin console
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-error hover:bg-error/10 transition-colors mt-1"
                    >
                      <LogOut size={16} /> logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 text-text"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu size={32} />
          </button>
        </nav>
      </header>

      {/* MOBILE DRAWER */}
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-[1300] backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed right-0 top-0 h-full w-[85%] max-w-[320px] bg-surface z-[1400] shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
            {/* Drawer Header */}
            <div className="p-6 border-b border-border flex justify-between items-center">
              <img
                src="/assets/logo.png"
                className="h-12 object-contain"
                alt="logo"
              />
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 text-text bg-background rounded-full hover:bg-primary/10 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Auth Profile Section */}
            <div className="p-6 bg-primary/5">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <AvatarComponent avatarId={user?.avatarId} size="w-14 h-14" />
                  <div className="overflow-hidden">
                    <p className="text-sm font-black text-text truncate tracking-tight">
                      {user.name}
                    </p>
                    <p className="text-[10px] font-bold text-primary tracking-widest uppercase">
                      {user.role}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={() => setDrawerOpen(false)}
                    className="py-3 text-center text-xs font-black border border-border rounded-xl text-text hover:bg-surface transition-colors"
                  >
                    login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setDrawerOpen(false)}
                    className="py-3 text-center text-xs font-black bg-primary text-inverted rounded-xl hover:opacity-90 transition-opacity"
                  >
                    register
                  </Link>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto p-6 space-y-2">
              <p className="text-xs font-black text-text/30 tracking-[0.2em] mb-4 uppercase">
                Menu
              </p>
              {navLinks.map((nav, i) => (
                <button
                  key={i}
                  onClick={() => handleScrollTo(nav.id)}
                  className="w-full text-left py-4 text-xl sm:text-2xl font-black text-text flex justify-between items-center tracking-tighter hover:text-primary transition-colors"
                >
                  {nav.name}{" "}
                  <ChevronDown className="-rotate-90 text-text/20" size={20} />
                </button>
              ))}
              {isAuthenticated && user?.role === ROLES.ADMIN && (
                <Link
                  to="/admin"
                  onClick={() => setDrawerOpen(false)}
                  className="w-full text-left py-4 text-xl sm:text-2xl font-black text-text flex justify-between items-center tracking-tighter hover:text-primary transition-colors"
                >
                  admin console <Settings size={20} className="text-text/20" />
                </Link>
              )}
            </div>

            {/* Settings & Socials (The missing part) */}
            <div className="p-6 border-t border-border space-y-6 bg-background/50">
              {/* Toggles Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LanguageToggler />
                </div>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 px-4 py-2 bg-surface border border-border rounded-xl text-primary font-bold text-xs shadow-sm active:scale-95 transition-all"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  <span className="text-text">
                    {theme === "dark" ? "Light" : "Dark"} mode
                  </span>
                </button>
              </div>

              {/* Social Icons */}
              <div className="flex justify-around items-center pt-2">
                {socials.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={i}
                      href={s.path}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 text-text/40 hover:text-primary hover:scale-125 transition-all"
                    >
                      <Icon size={22} />
                    </a>
                  );
                })}
              </div>

              {/* Logout Action */}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 p-4 font-black text-error bg-error/5 rounded-2xl hover:bg-error/10 transition-colors border border-error/10"
                >
                  <LogOut size={18} /> logout
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* HERO SECTION */}
      <section className="relative min-h-[100svh] px-4 sm:px-6 md:px-20 pt-24 pb-12 flex items-center">
        <div className="z-10 w-full md:w-2/3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-text leading-tight">
            upgrade your japanese
          </h1>
          <div className="mt-4 text-primary text-4xl sm:text-5xl md:text-[7rem] font-black leading-[0.95] min-h-[1.2em] tracking-tighter">
            <TypewriterSkill skills={skills} />
          </div>
          <button
            onClick={() =>
              navigate(isAuthenticated ? "/dashboard" : "/register")
            }
            className="mt-10 px-5 py-3 sm:px-6 sm:py-3.5 bg-primary text-inverted font-black text-base md:text-lg rounded-4xl shadow-2xl hover:-translate-y-1 transition-all active:scale-95 shadow-primary/30 tracking-widest"
          >
            Get started
          </button>
        </div>
        <div className="absolute top-0 right-0 w-full h-full opacity-10 md:opacity-30 pointer-events-none">
          <img
            src="/assets/world-d.svg"
            className="w-full h-full object-contain mt-24 [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]"
            alt=""
          />
        </div>
      </section>

      {/* DYNAMIC SECTIONS */}
      {[
        {
          id: "manual",
          title: t.manual,
          sub: t.user_manual,
          img: "/assets/manual.svg",
          color: "text-primary",
          path: "/coming-soon",
        },
        {
          id: "about",
          title: t.about,
          sub: t.about_team,
          img: "/assets/about.svg",
          color: "text-primary",
          path: "/coming-soon",
        },
        {
          id: "apps",
          title: t.apps,
          sub: t.use_app,
          img: "/assets/apps.svg",
          color: "text-primary",
          path: "/coming-soon",
        },
      ].map((section) => (
        <AnimatedSection
          key={section.id}
          section={section}
          navigate={navigate}
          t={t}
          lang={language}
        />
      ))}

      {/* FOOTER */}
      <footer className="py-20 md:py-24 border-t border-border bg-surface/30 flex flex-col items-center text-center px-4 sm:px-6">
        <div className="flex space-x-6 mb-12">
          {socials.map((social, i) => {
            const Icon = social.icon;
            return (
              <a
                key={i}
                href={social.path}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 flex items-center justify-center text-text/40 hover:text-inverted hover:bg-primary border border-border rounded-full transition-all"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
        <p className="text-text font-black text-lg sm:text-xl mb-4">
          Upgrade Japanese With ドア
        </p>
        <p className="text-xs text-text/30 font-bold tracking-[0.3em] sm:tracking-[0.5em]">
          &copy; {new Date().getFullYear()} — doa
        </p>
      </footer>
    </div>
  );
};

export default GetStarted;
