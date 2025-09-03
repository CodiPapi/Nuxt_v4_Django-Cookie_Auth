// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-08-25',
  devtools: { enabled: true },

  runtimeConfig: {
    apiBase: '/api/v1',
    public: {
      apiBase: 'http://localhost:8000/api/v1',
    }
  },

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: true
  },
  
  imports: {
    autoImport: true
  },

  modules: ['@pinia/nuxt',
    '@nuxt/ui'
  ],
  css: ['~/assets/css/main.css']
})