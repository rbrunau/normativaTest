import i18nConfig from './configs/i18n.config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            link: [
                { rel: 'icon', href: 'favicon-light.svg', media: '(prefers-color-scheme: light)' },
                { rel: 'icon', href: 'favicon-dark.svg', media: '(prefers-color-scheme: dark)' },
            ],
            meta: [{ name: 'theme-color', content: '#3B82F6' }],
        },
    },

    css: [],

    devtools: {
      enabled: true,

      timeline: {
        enabled: true,
      },
    },

    modules: [
        '@nuxt/ui',
        '@nuxtjs/i18n',
        '@nuxtjs/seo',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@sidebase/nuxt-pdf',
        '@vite-pwa/nuxt',
        'nuxt-directus-next',
    ],

    site: {
        url: 'https://normativa.tfg.ovh',
        name: 'Proyecto Normativa',
        description: 'Proyecto de normativa',
    },

    srcDir: './src',

    // Módulos

    colorMode: {
        preference: 'dark',
    },

    directus: {
        url: process.env.DIRECTUS_URL,
        staticToken: process.env.DIRECTUS_STATIC_TOKEN,
        staticTokenServer: process.env.DIRECTUS_STATIC_TOKEN,
        authConfig: {
            refreshTokenCookieName: 'api_refresh_token',
        },
    },

    i18n: { ...i18nConfig, strategy: 'prefix_except_default' },
});