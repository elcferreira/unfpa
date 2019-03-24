const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Muli' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles/fonts.sass'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~/plugins/pixi',
      ssr: false
    },
    {
      src: '~/plugins/observe',
      ssr: false
    }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: [
      '@/assets/styles/variable.sass'
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    // analyze: true,
    extend(config, ctx) {
      // svg
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));
      svgRule.test = /\.(png|jpe?g|gif|webp)$/;
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [
              { removeViewBox: false },
            ],
          },
        }
      });

    //   // Run ESLint on save
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    }
  }
}
