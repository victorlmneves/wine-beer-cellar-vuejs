module.exports = {
  // transpileDependencies: ["vuex-persist"],
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/_mixins.scss";
        `
      }
    }
  },
  // devServer: {
  //   proxy: {
  //     '/': {
  //       target: process.env.BASE_URL,
  //       pathRewrite: {
  //         '^/api': ''
  //       },
  //       changeOrigin: true,
  //       secure: false,
  //       logLevel: 'debug'
  //     }
  //   }
  // },
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/wine-beer-cellar-vuejs/'
    : '/'
}
