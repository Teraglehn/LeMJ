module.exports = {
  css: [
    '@assets/css/bulma.css',
    '@assets/css/font-awesome.min.css',
    '@assets/css/common.css'
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'lemj',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'LeMJ, votre application de jeux de rôle !' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
    vendor: [
      'axios'
    ]
  },
  plugins: [
    '~/plugins/vuelidate'
  ],
  env: {
    BASE_URL: 'http://192.168.0.10:3000',
    MONGODB_URL: 'mongodb://localhost:27017/lemj'
  },
  axios: {
    credentials: true,
    init (axios, context) {
      axios.defaults.baseURL = context.env.BASE_URL
    }
  }
}
