import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/', // ✅ this fixes the 404 and broken assets
  plugins: [react()],
})
