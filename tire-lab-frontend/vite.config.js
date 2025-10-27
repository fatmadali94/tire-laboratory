// // vite.config.js
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   base: "/",
// });
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    host: '0.0.0.0', // Important for Docker!
    port: 5173,
    watch: {
      usePolling: true // Important for hot reload in Docker!
    }
  }
});