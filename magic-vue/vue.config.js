/*
 * @Author: 汤波
 * @Date: 2020-06-04 13:50:42
 * @Description:
 * @LastEditors: Zhang Qiaodi
 * @LastEditTime: 2021-12-02 09:50:16
 * @FilePath: /xfwl-screen/vue.config.js
 */
module.exports = {
  // 基本路径
  publicPath: "/cloth/",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // chainWebpack: config => {
  //   config.module
  //     .rule("view-design")
  //     .test(/view-design.src.*?js$/)
  //     .use("babel")
  //     .loader("babel-loader")
  //     .end();
  // },
  // configureWebpack: () => {
  // },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: false,
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 10400,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    proxy: {
      "/": {
        target: "http://139.224.165.146:7082", // target表示代理的服务器url
        pathRewrite: {
          // pathRewrite表示路径重写，key表示一个正则，value表示别名
          "^/": "/", // 即用 '/api'表示'http://localhost:3000/api'
        },
      },
    },
  },
};
