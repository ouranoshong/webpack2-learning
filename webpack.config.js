const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');

const glob = require('glob');

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    nodeModules: path.join(__dirname, 'node_modules')
};

const commonConfig = merge([
    {
        entry: {
            app: PATHS.app,
        },
        node: {
            fs: 'empty'
        },
        output: {
            path: PATHS.build,
            filename: '[name].[chunkhash].js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack demo',
            }),
            new webpack.LoaderOptionsPlugin(merge([
                parts.eslintOptions(),
            ])),
            new webpack.HashedModuleIdsPlugin(),
        ],
    },

    parts.lintJavaScript({ include: PATHS.app, exclude: PATHS.nodeModules, emitWarning: true, }),
    parts.lintCSS({ include: PATHS.app }),
    parts.loadFonts({
        options: {
            name: '[name].[hash:8].[ext]',
        },
    }),
    parts.loadJavaScript({ include: PATHS.app }),
]);


const productionConfig = merge([

    {
        performance: {
            hints: 'warning', // 'error' or false are valid too
            maxEntrypointSize: 100000, // in bytes
            maxAssetSize: 450000, // in bytes
        },

        output: {
            chunkFilename: '[name].[chunkhash:8].js',
            filename: '[name].[chunkhash:8].js',
        },

        recordsPath: path.join(__dirname, 'records.json'),
    },

    parts.generateSourceMaps({ type: 'source-map' }),

    parts.extractCSS({
        use: [
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[local]'
                }
            },
            parts.autoprefix()
        ]
    }),
    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
    }),
    parts.loadImages({
        options: {
            limit: 1500,
            name: '[name].[hash:8].[ext]',
        },
    }),

    parts.extractBundles([
        {
            name: 'vendor',
            minChunks: ({ resource }) => (
                resource &&
                resource.indexOf('node_modules') >= 0 &&
                resource.match(/\.js$/)
            ),
        },
        {
            name: 'manifest',
            minChunks: Infinity,
        },


    ]),

    parts.clean(PATHS.build),

    // parts.attachRevision(),


    parts.minifyJavaScript(),

    parts.minifyCSS({
        options: {
            discardComments: {
                removeAll: true,
            },
            // Run cssnano in safe mode to avoid
            // potentially unsafe transformations.
            safe: true,
        },
    }),

    parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
    ),

]);

const developmentConfig = merge([

    {
        output: {
            devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
        },
    },
    parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),

    parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.devServerPoll(),
    parts.loadCSS(),
    parts.loadImages(),
    parts.dontParse({
        name: 'react',
        path: path.resolve(
            __dirname, 'node_modules/react/dist/react.min.js'
        ),
    }),
]);


module.exports = (env) => {
    if (env === 'production') {
        return merge(commonConfig, productionConfig);
    }

    return merge(commonConfig, developmentConfig);
};