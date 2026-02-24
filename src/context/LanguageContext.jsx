import React, { createContext, useState} from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(
    localStorage.getItem("lang") || "en"
  );

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
