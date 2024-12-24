import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
      plugins: [react()],
      server: {
            host: '178.16.138.188'
      },
});
