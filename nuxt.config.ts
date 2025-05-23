// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},

    modules: [
        '@nuxt/ui',
        '@nuxt/eslint',
        "nuxt-charts",
        'nuxt-svgo',
        '@vueuse/nuxt',
        'nuxt-echarts'
    ],

    echarts: {
        charts: ['HeatmapChart'],
        components: ['DatasetComponent', 'GridComponent', 'TooltipComponent', 'VisualMapComponent', 'VisualMapPiecewiseComponent', 'VisualMapContinuousComponent'],
    },

    css: ['~/assets/css/main.css'],

    svgo: {
        defaultImport: 'component',
    },

    future: {
        compatibilityVersion: 4
    },

    compatibilityDate: '2024-11-27'
})
