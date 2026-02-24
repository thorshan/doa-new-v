import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    // This forces Vite to pre-bundle the font packages
    include: ['@fontsource/noto-sans', '@fontsource/noto-sans-jp', '@fontsource/noto-sans-myanmar'],
  },
  server: {
    fs: {
      // Allow serving files from one level up (the project root)
      allow: ['..']
    }
  }
});
