import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/graphql": {
        target: "http://localhost:3001",
        secure: false,
        changeOrigin: true,
      },
      "/api": {
        target: "http://localhost:3001", // Change this to the API endpoint you want to proxy to
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
