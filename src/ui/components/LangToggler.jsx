import React, { useState, useRef, useEffect } from "react";
import { Languages, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../constants/translations";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸", font: "font-sans" },
  { code: "mm", label: "မြန်မာ", flag: "🇲🇲", font: "font-myanmar" },
  { code: "jp", label: "日本語", flag: "🇯🇵", font: "font-jp" },
];

const LanguageToggler = ({ isInDrawer = false }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (!isInDrawer) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isInDrawer]);

  const currentLang =
    LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  // --- MOBILE DRAWER VERSION ---
  if (isInDrawer) {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full h-14 px-5 bg-surface border border-border rounded-2xl active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-background rounded-lg text-primary">
              <Languages size={20} />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] font-black tracking-widest uppercase text-text/40 leading-none mb-1">
                {translations[language].language || "Language"}
              </span>
              <span
                className={`text-sm font-bold text-text ${currentLang.font}`}
              >
                {currentLang.label}
              </span>
            </div>
          </div>
          <ChevronDown
            size={18}
            className={`text-text/30 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-64 mt-2 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="bg-surface/50 border border-border/50 rounded-2xl divide-y divide-border/10">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-6 py-4 text-sm font-bold ${language === lang.code ? "text-primary bg-primary/5" : "text-text/70"} ${lang.font}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lang.flag}</span>
                  <span>{lang.label}</span>
                </div>
                {language === lang.code && <Check size={16} />}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- DESKTOP VERSION (Left Unchanged) ---
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20 group"
      >
        <Languages
          size={18}
          className="text-primary group-hover:rotate-12 transition-transform"
        />
        <span className="text-xs font-black tracking-widest text-text hidden lg:inline">
          {currentLang.code}
        </span>
        <ChevronDown
          size={14}
          className={`text-text/30 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-surface border border-border rounded-2xl shadow-2xl py-2 z-[2000] animate-in fade-in zoom-in-95">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-bold ${language === lang.code ? "bg-primary/10 text-primary" : "text-text hover:bg-primary/5"} ${lang.font}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.label}</span>
              </div>
              {language === lang.code && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggler;
