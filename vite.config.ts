import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Learning Note: Vite is the "build tool" for this project.
// It takes all your React/TypeScript files and bundles them
// into optimized HTML/CSS/JS that browsers can understand.
// This config file tells Vite how to do that.
export default defineConfig({
  plugins: [react()],
})
