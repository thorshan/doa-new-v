import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  GitFork,
  School,
  History,
  Lock,
  ChevronRight,
  Info,
} from "lucide-react";
import { useLanguage } from "../../../hooks/useLanguage";

const Exams = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const examCategories = [
    {
      id: "final",
      title: "Final Exam",
      desc: "Unlocked via Course Exams",
      icon: Trophy,
      hexColor: "#f97316", // Orange
      enabled: false,
      path: null,
    },
    {
      id: "level",
      title: "Level Test",
      desc: "Unlocked via Profile journey only",
      icon: GitFork,
      hexColor: "#0ea5e9", // Blue/Primary
      enabled: false,
      path: null,
    },
    {
      id: "jlpt",
      title: "JLPT Mock",
      desc: "Full-length JLPT simulation",
      icon: School,
      hexColor: "#6366f1", // Indigo
      enabled: true,
      path: "/dashboard/exams/mock",
    },
    {
      id: "old",
      title: "Old Questions",
      desc: "Previous years' exam bank",
      icon: History,
      hexColor: "#ec4899", // Pink
      enabled: true,
      path: "/dashboard/exams/past-papers",
    },
  ];

  return (
    <div
      className={`pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700 ${language === "mm" ? "font-myanmar" : "font-sans"}`}
    >
      {/* Subheader */}
      <div className="mb-8 text-center sm:text-left">
        <p className="text-text/60 text-sm font-medium">
          Challenge your mastery and track progress
        </p>
      </div>

      {/* Categories List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {examCategories.map((item) => {
          // Capturing the icon component in a capitalized variable
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              disabled={!item.enabled}
              onClick={() => item.path && navigate(item.path)}
              className={`
                group flex items-center p-5 rounded-[28px] border transition-all duration-300
                ${
                  item.enabled
                    ? "bg-surface border-border/50 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]"
                    : "bg-surface/50 border-border/10 opacity-60 cursor-not-allowed"
                }
              `}
            >
              {/* Icon Box with Hex-based Background Opacity */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 mr-5 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${item.hexColor}15` }} // 15 is ~10% opacity in hex
              >
                <Icon size={24} color={item.hexColor} strokeWidth={2.5} />
              </div>

              {/* Content */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-text tracking-tight">
                    {item.title}
                  </h3>
                  {!item.enabled && <Lock size={14} className="text-text/30" />}
                </div>
                <p className="text-xs sm:text-sm font-medium text-text/50">
                  {item.desc}
                </p>
              </div>

              {/* Action Arrow */}
              {item.enabled && (
                <div className="ml-4 p-2 rounded-xl bg-background text-text/20 group-hover:text-primary transition-colors">
                  <ChevronRight size={20} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="mt-10 w-full p-5 rounded-[24px] bg-primary/5 border border-primary/20 border-dashed flex items-center gap-4">
        <div className="p-2 bg-primary/10 rounded-full text-primary">
          <Info size={18} />
        </div>
        <p className="text-xs sm:text-sm font-bold text-text/70 leading-relaxed">
          Final Exams and Level Tests are strictly regulated and require
          specific course progress to unlock.
        </p>
      </div>
    </div>
  );
};

export default Exams;
