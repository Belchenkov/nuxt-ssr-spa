const pkg = require('./package');
const bodyParser = require('body-parser');
const axios = require('axios');

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'NEWS BLOG',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Muli:400,700&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#fa923f',
    height: '4px',
    duration: 5000
  },
  loadingIndicator: {
    name: 'circle',
    color: 'fa923f'
  },
  /*
  ** Global CSS
  */
  css: [
    //'~assets/styles/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.BASE_URL || 'https://nuxt-ssr-spa.firebaseio.com'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  //dev: true,
  env: {
    baseUrl: process.env.BASE_URL || 'https://nuxt-ssr-spa.firebaseio.com',
    fbAPIKey: 'AIzaSyAga_lKAdBRCNRHi4OEWConkcBAdIv3Huo'
  },
  /*rooter: {
    base: '',
    extendRoutes(routes, resolve) {
      routes.push({
        path: '*',
        component: resolve(__dirname, 'pages/index.vue')
      });
    },
    linkActiveClass: 'active'
  }*/
  // srcDir: '/client/app',
  /*transition: {
    name: 'page',
    mode: 'out-in'
  }*/
  serverMiddleware: [
    bodyParser.json(),
    '~/api'
  ],
  generate: {
    routes: function () {
      return axios.get('https://nuxt-ssr-spa.firebaseio.com/posts.json')
        .then(res => {
          const routes = [];

          for (const key in res.data) {
            routes.push({
              route: `/posts/${key}`,
              payload: {postData: res.data[key]}
            });
          }

          return routes;
        });
    }
  }
}
