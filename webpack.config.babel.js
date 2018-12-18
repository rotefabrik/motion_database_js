import * as path from 'path'

import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ReactLoadablePlugin } from 'react-loadable/webpack';


module.exports = {

    mode: process.env.DEVELOPMENT ? 'development' : 'production',

    optimization: {
        minimize: false
    },

    entry: {
        'shared': './src/shared/index.js'
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].js',
        publicPath: '/static/'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: ['es2015', 'react'],
                    plugins: ['syntax-dynamic-import']
                }
            },
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: {
                                safe: true
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            autoprefixer: {
                                browsers: ['last 2 versions']
                            },
                            plugins: () => [
                                autoprefixer
                            ]
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin(),
        new ReactLoadablePlugin({
            filename: './dist/react-loadable.json',
        }),
    ],

    node: {
        fs: 'empty',
        console: false,
        net: 'empty',
        tls: 'empty'
    }

};