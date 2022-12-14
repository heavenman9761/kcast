
const path = require('path')

module.exports = {
  /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
     */
  // 输出文件目录
  assetsDir: '../static', // 输出静态文件位置
  // publicPath: '/',
  outputDir: path.resolve(__dirname, '../backend/templates'), // 输出index入口文件位置

  // eslint-loader 是否在保存的时候检查
  // lintOnSave: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // compiler: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},
  configureWebpack: () => {},
  // 如果想要引入babel-polyfill可以这样写
  // configureWebpack: (config) => {
  //   config.entry = ["babel-polyfill", "./src/main.js"]
  // },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  // productionSourceMap: true,
  // css相关配置
  // css: {
  // 是否使用css分离插件 ExtractTextPlugin
  //   extract: true,
  // 开启 CSS source maps?
  //   sourceMap: false,
  // css预设器配置项
  //   loaderOptions: {},
  // 启用 CSS modules for all css / pre-processor files.
  // modules: false
  // },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  // parallel: require('os').cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  //   pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: 'localhost',
    port: 9099,
    https: false,
    hotOnly: false,
    proxy: { // 配置跨域
      '/api': {
        target: 'http://localhost:5000', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true // 允许跨域
      }
    }, // 设置代理
    before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
