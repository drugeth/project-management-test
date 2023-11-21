import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { config } from "dotenv";
import eslint from "vite-plugin-eslint";
import path from "path";

config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    host: "0.0.0.0",
    port: Number(process.env.VITE_APP_PORT),
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: [
      { find: "@/atoms", replacement: path.resolve(__dirname, "src/atoms") },
      { find: "@/constants", replacement: path.resolve(__dirname, "src/constants") },
      { find: "@/hooks", replacement: path.resolve(__dirname, "src/hooks") },
      { find: "@/components", replacement: path.resolve(__dirname, "src/components") },
      { find: "@/pages", replacement: path.resolve(__dirname, "src/Pages") },
      { find: "@/services", replacement: path.resolve(__dirname, "src/services") },
      { find: "@/interfaces", replacement: path.resolve(__dirname, "src/interfaces") },
      { find: "@/selectors", replacement: path.resolve(__dirname, "src/selectors") },
    ],
  },
});
