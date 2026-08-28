import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sites } from '@openai/sites-vite-plugin';

export default defineConfig({
  plugins: [react(), sites()],
  base: './',
  server: {
    port: 3000,
    open: false
  }
});
