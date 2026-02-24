import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import "@fontsource/noto-sans";
import "@fontsource/noto-sans-jp/400.css";
import "@fontsource/noto-sans-jp/700.css";
import "@fontsource/noto-sans-jp/900.css";
import "@fontsource/noto-sans-myanmar/400.css";
import "@fontsource/noto-sans-myanmar/700.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
