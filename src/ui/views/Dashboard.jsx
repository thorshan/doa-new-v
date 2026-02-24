import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronRight,
  BookOpen,
  Library,
  Calculator,
  Layers,
  PlayCircle,
  FileText,
  CheckCircle2,
  LogOut,
  Moon,
  Sun,
  Globe,
  ChevronLeft,
  XCircle,
  ArrowLeft,
  Lock,
} from "lucide-react";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../constants/translations";
import { AVATAR } from "../avatar";
import { useAuth } from "../../hooks/useAuth";
import { userApi } from "../../api/userApi";

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [currentUser, setCurrentUser] = useState(user);

  const isDashboardHome =
    location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  useEffect(() => {
    const fetchcurrentUser = async () => {
      try {
        const res = await userApi.getUserData(user?._id);
        setCurrentUser(res.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    if (user?._id) fetchcurrentUser();
  }, [user]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sheetContent, setSheetContent] = useState("main");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return translations[language]?.morning || "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const cards = useMemo(
    () => [
      {
        title: translations[language]?.basic_japanese || "Basic japanese",
        char: "あ",
        path: "/basic-info",
        gradient: "from-[#38f9d7] to-[#43e97b]",
        icon: BookOpen,
        isLocked: true,
      },
      {
        title: translations[language]?.course || "Courses",
        char: "語",
        path: "/dashboard/courses",
        gradient: "from-[#00f2fe] to-[#4facfe]",
        icon: Library,
      },
      {
        title: translations[language]?.countings || "Countings",
        char: "数",
        path: "/countings",
        gradient: "from-[#FAD961] to-[#F76B1C]",
        icon: Calculator,
      },
      {
        title: "Doa Hub",
        char: "ドア",
        path: "/hub",
        gradient: "from-[#4962ff] to-[#1c39f7]",
        icon: Layers,
      },
      {
        title: "Video Feed",
        char: "映",
        path: "/video",
        gradient: "from-[#FF512F] to-[#DD2476]",
        icon: PlayCircle,
      },
      {
        title: translations[language]?.exams || "Exams",
        char: "試",
        path: "/dashboard/exams",
        gradient: "from-[#1e3c72] to-[#2a5298]",
        icon: FileText,
      },
    ],
    [language],
  );

  const hasPassedData = useMemo(
    () => (currentUser?.level?.passed?.length ?? 0) > 0,
    [currentUser],
  );

  const isUnlocked = (index) => {
    if (currentUser.role === "admin") return true;
    if (index === 0) return !hasPassedData;
    if (index === 1 || index === 3) return true;
    return hasPassedData;
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500 bg-background ${language === "mm" ? "font-myanmar" : "font-sans"}`}
    >
      {/* PERSISTENT BACKGROUND BLOBS */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none transition-colors" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] pointer-events-none transition-colors" />

      {/* PERSISTENT HEADER */}
      <header className="px-6 md:px-20 py-10 flex justify-between items-center relative z-10">
        <div>
          {isDashboardHome ? (
            /* --- SHOW GREETING ON /dashboard --- */
            <div className="animate-in fade-in slide-in-from-left duration-500">
              <p className="text-text/50 text-sm md:text-base font-bold tracking-widest">
                {getGreeting()},
              </p>
              <h1 className="text-2xl md:text-3xl font-black text-text tracking-tighter">
                {language === "jp"
                  ? `${currentUser?.name.split(" ")[0]} さん`
                  : currentUser?.name}
              </h1>
            </div>
          ) : (
            /* --- SHOW BACK BUTTON ON SUB-ROUTES --- */
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-text/50 hover:text-primary group"
            >
              <div className="p-2">
                <ArrowLeft size={18} />
              </div>
              <span className="text-xs font-bold">
                {translations[language].go_back}
              </span>
            </button>
          )}
        </div>

        {/* PROFILE AVATAR - Persistent */}
        <button
          onClick={() => {
            setSheetContent("main");
            setDrawerOpen(true);
          }}
          className="relative hover:scale-105 active:scale-90 transition-all"
        >
          <div className="absolute -inset-1 rounded-full blur opacity-20" />
          <img
            src={AVATAR[Number(currentUser?.avatarId)] || AVATAR[1]}
            className="relative w-12 h-12 rounded-full object-cover"
            alt="profile"
          />
        </button>
      </header>

      {/* DYNAMIC CONTENT AREA */}
      <main className="relative z-10">
        {isDashboardHome ? (
          /* --- MAIN GRID VIEW --- */
          <div className="px-6 md:px-20 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {cards.map((card, i) => {
              const unlocked = isUnlocked(i);
              const Icon = card.icon;
              return (
                <button
                  key={i}
                  disabled={!unlocked}
                  onClick={() => navigate(card.path)}
                  className="relative h-24 sm:h-32 rounded-[32px] overflow-hidden group transition-all hover:shadow-2xl hover:-translate-y-1 active:scale-95 border border-white/5"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${card.gradient}`}
                  />
                  {!unlocked && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-[2px]">
                      <Lock size={30} className="text-white" />
                    </div>
                  )}
                  <span className="absolute -top-4 -right-2 text-[100px] font-black text-white/10 pointer-events-none select-none italic">
                    {card.char}
                  </span>
                  <div className="relative h-full px-8 flex items-center justify-between z-10">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md border border-white/20 shadow-inner">
                        <Icon size={26} className="text-white" />
                      </div>
                      <span className="text-base sm:text-lg font-black text-white tracking-tight">
                        {card.title}
                      </span>
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-white/40 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* --- SUB-ROUTE VIEW (Exams, etc.) --- */
          <div className="px-6 md:px-20 animate-in fade-in duration-500">
            <Outlet />
          </div>
        )}
      </main>

      {/* PERSISTENT DRAWER */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[2000] animate-in fade-in duration-300"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-background z-[2100] shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
            <div className="p-6 flex items-center justify-between border-b border-border/50">
              <div className="flex items-center gap-2">
                {sheetContent !== "main" && (
                  <button
                    onClick={() => setSheetContent("main")}
                    className="p-2 hover:bg-surface rounded-full text-text"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                <span className="text-base font-black text-text/60 pl-2">
                  {sheetContent === "main"
                    ? "Menu"
                    : translations[language].go_back}
                </span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-text/20 hover:text-error transition-colors"
              >
                <XCircle size={26} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {sheetContent === "main" && (
                <>
                  <Link
                    to={`/${user?.username}/profile`}
                    onClick={() => setDrawerOpen(false)}
                    className="p-5 bg-surface rounded-[30px] border border-border/50 flex items-center gap-4 hover:border-primary/40 transition-all group"
                  >
                    <img
                      src={AVATAR[Number(currentUser?.avatarId)] || AVATAR[1]}
                      className="w-14 h-14 rounded-full border-2 border-primary group-hover:scale-105 transition-transform object-cover"
                      alt="user"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-black text-text leading-tight">
                        {currentUser?.name}
                      </p>
                      <p className="text-xs text-primary mt-3">
                        {"@"}
                        {currentUser?.username}
                      </p>
                    </div>
                    <ChevronRight
                      size={18}
                      className="text-text/20 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>

                  <div className="space-y-3">
                    <p className="text-sm font-black text-text/70 px-4">
                      {translations[language].settings}
                    </p>
                    <div className="bg-surface rounded-[28px] border border-border/50 overflow-hidden divide-y divide-border/20">
                      <SettingsRow
                        label={
                          translations[language].appearance || "Appearance"
                        }
                        value={theme}
                        icon={theme === "dark" ? Moon : Sun}
                        onClick={() => setSheetContent("theme")}
                      />
                      <SettingsRow
                        label={translations[language].language}
                        value={
                          language === "en"
                            ? "English"
                            : language === "jp"
                              ? "日本語"
                              : "မြန်မာ"
                        }
                        icon={Globe}
                        onClick={() => setSheetContent("lang")}
                      />
                    </div>
                  </div>

                  <button
                    onClick={logout}
                    className="w-full p-5 bg-error/5 text-error rounded-3xl flex items-center justify-center gap-3 font-black hover:bg-error/10 transition-colors border border-error/10 "
                  >
                    <LogOut size={18} /> {translations[language].logout}
                  </button>
                </>
              )}

              {/* Theme Selector View */}
              {sheetContent === "theme" && (
                <div className="space-y-3">
                  {["Light", "Dark"].map((t) => (
                    <SelectorItem
                      key={t}
                      label={t}
                      isSelected={theme.toLowerCase() === t.toLowerCase()}
                      onClick={() => {
                        toggleTheme();
                        setSheetContent("main");
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Language Selector View */}
              {sheetContent === "lang" && (
                <div className="space-y-3">
                  {[
                    { id: "en", l: "English" },
                    { id: "jp", l: "日本語" },
                    { id: "mm", l: "မြန်မာ" },
                  ].map((l) => (
                    <SelectorItem
                      key={l.id}
                      label={l.l}
                      isSelected={language === l.id}
                      onClick={() => {
                        setLanguage(l.id);
                        setSheetContent("main");
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// HELPER COMPONENTS
const SettingsRow = ({ label, value, icon, onClick }) => (
  <button
    onClick={onClick}
    className="w-full p-5 flex items-center justify-between hover:bg-primary/5 transition-colors group"
  >
    <div className="flex items-center gap-4">
      <div className="p-2 bg-background rounded-xl text-text group-hover:text-primary transition-colors">
        {React.createElement(icon, { size: 16 })}
      </div>
      <span className="text-sm font-black text-text ">{label}</span>
    </div>
    <span className="text-[9px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">
      {value}
    </span>
  </button>
);

const SelectorItem = ({ label, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-5 rounded-3xl flex items-center justify-between font-black border transition-all ${
      isSelected
        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]"
        : "bg-surface border-border/50 text-text/60"
    }`}
  >
    <span>{label}</span>
    {isSelected && <CheckCircle2 size={18} />}
  </button>
);

export default Dashboard;
