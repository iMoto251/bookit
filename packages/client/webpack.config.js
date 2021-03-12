const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const distPath = path.resolve("/dist");

module.exports = (env, argv) => {
  return {
    mode: "development",
    devServer: {
      contentBase: distPath,
      port: 8080,
      host: "0.0.0.0",
      disableHostCheck: true,
    },
    entry: [path.resolve("src/index.tsx"), path.resolve("src/scss/index.scss")],
    output: {
      path: distPath,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
  };
};
