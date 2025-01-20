import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    host: "10.0.80.75",
    // host: "178.16.138.188",
    port: 3003,
  },
});
