import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        admin: 'admin.html'
      },
    },
    outDir: 'dist',
  },
  test: {
    // add jsdom to vite
    environment: 'jsdom',
    globals: true,
    setupFiles: "./src/admin/testSetup.js"
  },
  // server: {
  //   fs: {
  //     // Ensure admin.html is accessible in dev mode
  //     allow: ['.'],
  //   },
  //   middlewareMode: false, // Ensure Vite handles requests directly
  // }
})
