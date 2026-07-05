import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// served from https://<owner>.github.io/app-branching-visuals/ on GitHub Pages
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/app-branching-visuals/' : '/',
  plugins: [react(), tailwindcss()],
})
