// https://nuxt.com/docs/api/configuration/nuxt-config
import { loadEnv } from "vite";

const EnvConfigs = loadEnv(process.env.MODE, "./env");

export default defineNuxtConfig({
  ssr: false,
  routeRules: {
    // Admin dashboard renders only on client-side,
    // "/work": { ssr: false },
    // "/ai_chat": { ssr: false },
    // "/ai_draw": { ssr: false },
    //   "/editor/**": { ssr: false },
    //   "/mark_me": { ssr: false },
  },
  devtools: { enabled: false },
  vite: {},
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-icons",
  ],
  css: [
    "@arco-design/web-vue/dist/arco.css",
    "~/assets/css/style.min.css",
    "~/assets/css/main.css",
    "~/assets/css/dark.css",
  ],
  runtimeConfig: {
    // 运行时常量
    public: {
      // 客户端-服务的都能访问
      baseUrl: EnvConfigs.VITE_SERVER_NAME,
      prefixUrl: EnvConfigs.VITE_REQUEST_BASE_URL,
      mode: EnvConfigs.VITE_MODE,
    },
  },
});
