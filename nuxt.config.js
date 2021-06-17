require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  telemetry: false,
  dev: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Ukulima Africa',
    titleTemplate: '%s - Empowering African Farmers through Blockchain Technology',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Ukulima empowers African farmers by utilising Blockchain Technology to manage, finance and insure smallhold farmers throughout Africa',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'defi, nft, crypto',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS: https://go.nuxtjs.dev/config-css
   */
  css: ['~/assets/sass/main.sass'],
  /*
   ** Load SASS variables/lib for all components
   */
  styleResources: {
    sass: ['~/assets/sass/theme-variables.sass'],
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/quasar', ssr: false },
    { src: '@/plugins/web3', ssr: false },
    {
      src: '@/plugins/log.js',
      ssr: false
    },
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/dotenv',
      {
        filename: `.env.${process.env.NODE_ENV || 'development'}`,
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DATABASEURL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID,
        },
        onFirebaseHosting: true,
        services: {
          auth: {
            persistence: 'local',
            initialize: {
              onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
              onAuthStateChangedAction: 'onAuthStateChangedAction',
              subscribeManually: false,
            },
            ssr: false,
            // emulatorPort: 9099,
            // emulatorHost: 'http://localhost',
          },
          firestore: true,
          storage: true,
          performance: true,
          analytics: false
        },
      },
    ],
  ],
  router: {
    middleware: ['auth']
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
      extend(config, {
        isDev,
        isClient
      }) {
        // Web Worker support
        if (isClient) {
          console.log('isClient', isClient)
        }
        if (isDev) {
          console.log('isDev', isDev)
        }
      },
    },
    generate: {
      fallback: '404.html',
    },
    vue: {
      config: {
        productionTip: process.env.NODE_ENV === 'development' ? false : true,
        devtools: process.env.NODE_ENV === 'development' ? true : false,
      },
    },
}
