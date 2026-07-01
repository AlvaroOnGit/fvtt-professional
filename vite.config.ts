import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
    resolve: {
        alias: {
            'src': resolve(__dirname, './src'),
        }
    },
    publicDir: 'public',
    build: {
        outDir: 'dist',
        minify: false,
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            fileName: 'main',
            formats: ['es'],
        },
        rollupOptions: {
            output: {
                entryFileNames: 'main.js',
            }
        }
    }
});