const webpack = require('webpack')
const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = options => ({
  entry: options.entry,
  output: options.output,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            query: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-preset-env')(),
                require('postcss-import')({ addDependencyTo: webpack }),
                require('postcss-url')(),
                // require('postcss-reporter')(),
                // require('postcss-browser-reporter')()
              ]
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'public/fonts/[name].[ext]' }
          }
        ]
      },
      {
        test: /\.(gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 20000,
          fallback: 'file-loader'
        }
      },
      {
        test: /\.(jpe?g|png)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    modules: [__dirname + '/src', 'node_modules'],
    descriptionFiles: ['component.json', 'package.json', 'bower.json'],
    /* 테스트 시에는 mainFields가 있으면 오류가 남 */
    mainFields: options.resolve.mainFields,
    mainFiles: ['index'],
    aliasFields: ['browser'],
    extensions: ['.js', '.jsx']
  },
  plugins: options.plugins.concat([
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : 'style.[hash].css'
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      $: 'jquery'
    }),
    new HtmlWebpackPlugin({
      title: 'react app',
      template: options.templateFilePath, // Load a custom template
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
      __LOCAL__: JSON.stringify(options.defines.LOCAL),
      __DEV__: JSON.stringify(options.defines.DEV),
      __SANDBOX__: JSON.stringify(options.defines.SANDBOX),
      __STAGE__: JSON.stringify(options.defines.STAGE),
      __PRODUCTION__: JSON.stringify(options.defines.PRODUCTION),
      __NOT_PRODUCTION__: JSON.stringify(options.defines.NOT_PRODUCTION),
      __VERSION__: JSON.stringify(require('../../package.json').version)
    })
  ]),
  devServer: {
    host: '0.0.0.0',
    port: 4000,
    disableHostCheck: true,
    inline: true,
    hot: true,
    historyApiFallback: true
  },
  devtool: options.devtool,
  mode: options.mode
})
