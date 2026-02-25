import React, { useState, useRef, useEffect } from "react";
import { Languages, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../constants/translations";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸", font: "font-sans" },
  { code: "mm", label: "မြန်မာ", flag: "🇲🇲", font: "font-myanmar" },
  { code: "jp", label: "日本語", flag: "🇯🇵", font: "font-jp" },
];

const LanguageToggler = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang =
    LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
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
          className={`text-text/30 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-surface border border-border rounded-2xl shadow-2xl py-2 z-[2000] animate-in fade-in zoom-in-95 duration-200">
          <div className="px-4 py-2 mb-1">
            <p className="text-[14px] font-black text-text/30">
              {translations[language].select_translation || "Select Language"}
            </p>
          </div>

          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-bold transition-colors ${
                language === lang.code
                  ? "bg-primary/10 text-primary"
                  : "text-text hover:bg-primary/5"
              } ${lang.font}`} // Apply regional font classes
            >
              <div className="flex items-center gap-3">
                <span className="text-lg leading-none">{lang.flag}</span>
                <span className={lang.code === "mm" ? "leading-relaxed" : ""}>
                  {lang.label}
                </span>
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
