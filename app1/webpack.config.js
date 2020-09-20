const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3001,
  },
  output: {
    publicPath: 'http://localhost:3001/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      // - name，必须，唯一 ID，作为输出的模块名，使用的时通过 ${name}/${expose} 的方式使用；
      name: 'app1',
      // 暴露的仓库变量名称和类型
      library: { type: 'var', name: 'app1' },
      // 独立的文件名
      filename: 'remoteEntry.js',
      // exposes，可选，表示作为 Remote 时，export 哪些属性被消费；
      exposes: {
        // expose each component
        './Header': './src/components/Header',
      },
      // shared，可选，共享的库
      shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
