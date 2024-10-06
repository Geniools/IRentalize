import {join, resolve} from 'path'
import {defineConfig} from "vite"
import viteReact from "@vitejs/plugin-react"


export default defineConfig({
    plugins: [viteReact()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
    // root: resolve('./static'),
    base: '/static/',
    // server: {
    //     host: 'localhost',
    //     port: 5173,
    //     open: false,
    //     watch: {
    //         usePolling: true,
    //         disableGlobbing: false,
    //     },
    // },
    build: {
        outDir: resolve('./static/dist'),
        emptyOutDir: true,
        manifest: true,
        target: 'es2015',
        rollupOptions: {
            input: {
                main: join(__dirname, './src/main.tsx'),
            },
            // output: {
            //     chunkFileNames: undefined,
            // },
        },
    },
})