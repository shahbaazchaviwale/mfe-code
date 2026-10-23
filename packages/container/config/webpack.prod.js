const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')
const domain = process.env.PRODUCTION_DOMAIN
const prodConfig = {
    mode: 'production',
    output :{
       filename: '[name].[contenthash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'container',
            remotes: { //this will imprt project
                marketing: `marketing@${domain}/marketing/remoteEntry.js`

            },
            shared: packageJson.dependencies,

        })
    ]
    

}

module.exports = merge(commonConfig, prodConfig)