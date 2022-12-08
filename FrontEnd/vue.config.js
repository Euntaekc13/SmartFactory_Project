// const { defineConfig } = require("@vue/cli-service");
// const { VUE_APP_API_DOMAIN } = process.env

// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     proxy: {
//       '/serverApi': {
//         target: VUE_APP_API_DOMAIN,
//         changeOrigin: true,
//         pathRewrite: {
//           '^/serverApi': ''
//         }
//       }
//     }
//   }
// });


// module.exports = {
//   devServer: {
//     proxy: {
//       '/serverApi': {
//         target: VUE_APP_API_DOMAIN,
//         changeOrigin: true,
//         pathRewrite: {
//           '^/serverApi': ''
//         }
//       }
//     }
//   }
// }



const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
});
