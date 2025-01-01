import { fileURLToPath, URL } from "url";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";
// import environment from "vite-plugin-environment";
// import dotenv from "dotenv";
import path from "path";

// dotenv.config({ path: "../../.env" });

// export default defineConfig({
//   build: {
//     emptyOutDir: true,
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       define: {
//         global: "globalThis",
//       },
//     },
//   },
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://127.0.0.1:4943",
//         changeOrigin: true,
//       },
//     },
//   },
//   plugins: [
//     react(),
//     environment("all", { prefix: "CANISTER_" }),
//     environment("all", { prefix: "DFX_" }),
//   ],
//   resolve: {
//     alias: {
//       find: "declarations",
//       replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });

import { defineConfig } from "vite";

export default defineConfig({
  root: "./", // Ensure the root is your frontend source directory
  server: {
    port: 3000, // You can set any port you like
    proxy: {
      "/api": "http://127.0.0.1:4943", // Proxy API requests to dfx backend
    },
  },
  build: {
    outDir: "dist", // Matches the output directory in your dfx.json
  },
  resolve: {
    alias: {
      find: "declarations",
      replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

//dfx.json configuration
// {
//   "canisters": {
//     "onchain_market_backend": {
//       "candid": "src/onchain_market_backend/onchain_market_backend.did",
//       "package": "onchain_market_backend",
//       "type": "rust"
//     },
//     "onchain_market_frontend": {
//       "dependencies": [
//         "onchain_market_backend"
//       ],
//       "source": [
//         "src/onchain_market_frontend/dist"
//       ],
//       "type": "assets",
//       "workspace": "onchain_market_frontend"
//     }
//   },
//   "defaults": {
//     "build": {
//       "args": "",
//       "packtool": ""
//     }
//   },
//   "output_env_file": ".env",
//   "version": 1
// }