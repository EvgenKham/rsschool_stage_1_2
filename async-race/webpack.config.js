import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: path.join(__dirname, "dist"), // Каталог для статики
    open: true, // Автоматически открывать браузер
    compress: true,
    port: 4000,
    historyApiFallback: true,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_module/,
        use: "ts-loader",
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/, //правило для обработки изображений
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         // name: "[path][name].[ext]", // сохраняет структуру папок и имена файлов
      //         // outputPath: "assets/", // папка для выходных файлов
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
      favicon: "src/assets/icons/flag-favicon.png",
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets" }],
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  mode: "production",
};
