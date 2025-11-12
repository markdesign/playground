import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

const port = parseInt(process.env.VITE_PORT || '3100');

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: port,
    },
    resolve: {
        alias: {
            src: resolve(__dirname, 'src'),
        },
    },
});
