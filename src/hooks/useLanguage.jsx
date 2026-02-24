// hooks/useLanguage.js
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    console.error("useLanguage must be used within a LanguageProvider");
    return {}; 
  }

  return context;
};