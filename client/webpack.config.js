const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebPwaManifest = require("webpack-pwa-manifest");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
      editor: "./src/js/editor.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Jate Text Editor",
      }),
      new InjectManifest({
        swSrc: "/src-sw.js",
        swDest: "src-sw.js",
      }),

      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "J.A.T.E",
        description: "Takes notes with JavaScript syntax highlighting!",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        publicPath: "",
        start_url: "/",
        orientation: "portrait",
        display: "standalone",
        crossorigin: null,

        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("src", "icons"),
          },
          {
            src: path.resolve("src/images/logo.png"),
            size: "96x96",
            purpose: "maskable",
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
