var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            title: 'lzj~blog',
            filename: 'index.html',
            template: './src/templates/front.ejs',
            inject: true,
            chunks: ["manifest", 'vendor', 'front'],
        }),
        new HtmlWebpackPlugin({
            title: '登录后台管理系统',
            filename: 'login.html',
            template: './src/templates/login.ejs',
            inject: true,
            chunks: ["manifest", 'vendor', 'admin_login'],
        }),
        new HtmlWebpackPlugin({
            title: '后台管理系统',
            filename: 'admin.html',
            template: './src/templates/admin.ejs',
            inject: true,
            chunks: ["manifest", 'vendor', 'admin'],
        }),
        new FriendlyErrorsPlugin()
    ]
})
