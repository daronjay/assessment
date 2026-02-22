import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import spaServer from "vite-spa-server";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    spaServer({
      entry: "./src/server/server.js",
      port: 3000,
      serverType: "express",
    }),
  ],
});
