import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../static/react-widget', // This is the path to the output directory in Django
        assetsDir: 'static/assets', // This is the path to the assets directory in Django
        emptyOutDir: true,      // Ensure the output directory is clean before each build
        // Compile everything to a single file to make it easier to include in Django
        rollupOptions: {
            input: 'src/main.tsx',
            output: {
                inlineDynamicImports: false,
                format: 'iife',
                entryFileNames: 'react-widget.js',
                manualChunks: () => {
                    return 'react-widget'
                },
            },
        },
    },
})
