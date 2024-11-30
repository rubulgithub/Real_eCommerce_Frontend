import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  proxy: {
    "/api": {
      target:
        process.env.VITE_API_URL ||
        `http://localhost:${process.env.VITE_BACKEND_PORT || 8080}`,
      changeOrigin: true,
      // rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
});
