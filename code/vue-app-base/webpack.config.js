const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (env, argv) => {
    const config = {
        mode: 'none',
        entry: './src/main.js',
        output: {
            filename: 'bunder.js',
            path: path.join(__dirname, 'dist'),
            // publicPath: './'
        },
        devServer: {
            // contentBase: ['./public', './assets']
            contentBase: './',
            hot: true
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(less|css)$/,
                    loader: ['style-loader', 'css-loader', 'less-loader']
                },
                { 
                    test:/\.vue$/, 
                    loader: 'vue-loader' 
                },
                {
                    test: /\.(png|jpeg|bmp|webp|gif)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024,
                        esModule: false
                    }
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'eslint-loader' ,
                    enforce: 'pre'
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                url: './public/favicon.ico',
                title: 'webpack in Vue',
                content: 'Webpack in Vue',
                template: './public/index.html'
            }),
            new VueLoaderPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ]
    }

    if(env === 'production'){
        config.mode = 'production',
        config.devtool = false,
        config.plugins = [
            ...config.plugins,
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    'public', 'src/assets'
                    ]
                }
             ),
        ]
    }

    return config
}