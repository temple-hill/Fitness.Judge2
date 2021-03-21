const path = require("path");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === "production";

module.exports = {
  mode: isProd ? "production" : "development",
  devtool: "source-map",
  entry: {
    backend: path.resolve(__dirname, "app/frontend/js/packs/backend/application.tsx"),
    frontend: path.resolve(__dirname, "app/frontend/js/packs/frontend/application.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "public/packs"),
    publicPath: "/packs/",
    filename: isProd ? "[name]-[hash].js" : "[name].js"
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {loader: "babel-loader"},
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProd,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProd,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[name].[ext]",
              outputPath: './webfonts',
              publicPath: '../webfonts',
            }
          },
        ],
      },
    ]
  },
  plugins: [
    new WebpackAssetsManifest({ publicPath: true }),
    new MiniCssExtractPlugin({
      filename: isProd ? "[name]-[hash].css" : "[name].css"
    }),
    new Dotenv({
      systemvars: true,
    }),
  ]
};
