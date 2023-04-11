const { defineConfig } = require('@vue/cli-service')
const Unplugin = require('../dist/webpack.cjs')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      Unplugin.default({
        port: 9004,
      })
    ]
  },
})
