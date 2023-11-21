import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // Add TypeScript support by specifying the appropriate loader
    build: {
        outDir: './dist',
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
        // Specify TypeScript here
        loader: 'tsx',

    },
    // esbuild: {
    //     outDir: './dist',
    // },
});
