const path = require('path')
const scssDir = path.join(__dirname, "src/scss")
const webpack = require("webpack")
const contentBase = path.join(__dirname, "src", "assets", "scss")
const envName = process.env.VUE_APP_NAME
module.exports = {
  devServer: {contentBase},
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/scss/_vars.scss";
          @import "@/scss/_mixins.scss";
        `
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        _: "lodash",
      }),
      // new webpack.ProvidePlugin({
      //   $: "jquery",
      //   jquery: "jquery",
      //   "window.jQuery": "jquery",
      //   jQuery: "jquery"
      // })
    ],
    resolve: {
      extensions: ['.js', '.json', '.vue', '.css', '.scss'],
      // extensions: ['.js', '.json', '.vue'],
      alias: {
        // '@': path.resolve(path.join(__dirname, 'src/'))
        "~": path.resolve(__dirname, "src/"),
        "@": path.resolve(__dirname, "src/")
      }
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: envName
    }
  }
}
