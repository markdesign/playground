import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        mkcert(),
        VitePWA({
            registerType: "autoUpdate",
            devOptions: {
                enabled: true,
            },
            includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
            manifest: {
                name: "PWA POC App",
                short_name: "PWAPOC",
                description: "My PWA POC App description",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
});
