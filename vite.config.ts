import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // Example: enable JavaScript in Less
      },
    },
  },

  esbuild: {
    supported: {
      "top-level-await": true,
    },
  },
});
