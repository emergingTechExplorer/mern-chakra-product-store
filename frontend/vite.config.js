import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      // proxy all requests starting with /api to the server running on port 5000
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
});
