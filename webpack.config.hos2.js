var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var LiveReloadPlugin = require('webpack-livereload-plugin');
var path = require('path');
var glob_entries = require('webpack-glob-entries');
var webpack = require('webpack');
var globby = require('globby');


var srcPath = path.resolve(__dirname, './src'),
    outputPath = path.resolve(__dirname, './lib');

var entry = {};
entry = glob_entries('./demo/*.jsx');

console.log('entry: ', entry);

var config = {

    //context: srcPath,

    //webpack 编译的入口文件
    entry,


    //输出的文件配置
    output: {
        path: outputPath,
        filename: '[name].js',
        publicPath: '/lib/'
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    externals : {
        'react': "React",
        'react-dom': "ReactDOM"
    },

    module: {
        loaders: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react', 'stage-0']
            }
        },{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    },

    plugins: [

        new webpack.DefinePlugin({
            "process.env": { NODE_ENV: JSON.stringify('development') },
            "__DEV__": JSON.stringify(JSON.parse('true'))
        }),

        //代码热替换
        // new LiveReloadPlugin(),

        //new ExtractTextPlugin('[name].css', { allChunks: true }),

        //进度插件
        new webpack.ProgressPlugin((percentage, msg) => {
            const stream = process.stderr;
            if (stream.isTTY && percentage < 0.71) {
                stream.cursorTo(0);
                stream.write(`📦   ${msg}`);
                stream.clearLine(1);
            }
        })
    ],

    devtool : 'source-map'
};

module.exports = config;
