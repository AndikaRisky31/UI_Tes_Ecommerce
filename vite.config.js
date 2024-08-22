import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    // Contoh menggunakan variabel lingkungan di sini
    host: process.env.VITE_HOST || 'localhost',
    port: process.env.VITE_PORT || 3000,
  },
});
