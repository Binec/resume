import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  // IMPORTANTE: Cambia esto según tu repositorio
  // Si tu repositorio se llama "resumen1-copia", usa: base: "/resumen1-copia/"
  // Si es tu página principal (usuario.github.io), usa: base: "/"
  base: "/resume/", // <- CAMBIA ESTO según tu repositorio
  
  plugins: [react(), tailwindcss(), viteSingleFile()],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  
  // Optimización para build
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false, // Desactiva sourcemaps para producción
    rollupOptions: {
      output: {
        manualChunks: undefined, // Necesario para single-file
      },
    },
  },
  
  // Configuración del servidor para desarrollo
  server: {
    port: 3000,
    open: true,
  },
  
  // Configuración para preview (npm run preview)
  preview: {
    port: 4173,
    open: true,
  },
});