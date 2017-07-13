var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var glob = require('glob');
var glob_entries = require("webpack-glob-entries");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var getFiles = function(filepath) {
		var files = glob.sync(filepath);
		var entries = {};
		files.forEach(function(item) {
			var pathname = path.basename(path.dirname(item));
			//inline 模式
			entries[pathname] = item;
			//iframe 模式
			// entries[pathname] = [];
			// entries[pathname].push(item);
			// entries[pathname].push('webpack-dev-server/client?http://localhost:8080');
			// entries[pathname].push('webpack/hot/dev-server');
		});
		return entries
	}
	// var entryJs = getFiles('./src/pages/*/index.jsx');
var entryJs = getFiles('./components/*/index.jsx');

// Plugins
var plugins = [
	new ExtractTextPlugin('[name]/[name].css'),
	// new webpack.optimize.CommonsChunkPlugin('react.js')
];
var pages = getFiles('./src/js/*.jsx');
Object.keys(pages).forEach(function(pathName) {
	plugins.push(
		new HtmlWebpackPlugin({
			// template: './src/pages/' + pathName + '/index.html',
			filename: pathName + '.html',
			chunks: ['common', pathName],
		})
	);
})

// var entry = glob_entries('./src/js/*.jsx');
var entry = glob_entries('./components/*/index.jsx');

console.log("entry:", entry, entryJs);

module.exports = {
	entry: entryJs, //入口文件
	output: {
		path: path.resolve(ROOT_PATH, './lib'),
		filename: '[name].js',
		publicPath: '/lib/'
	}, // 出口文件 path输出目录， filename输出文件名， publicPath输入目录所对应的外部目录
	resolve: {
		extensions: [".js", ".jsx"]
	},
	externals: {
		"react": "React",
		"react-dom": "ReactDom"
	},
	module: { //module.loader 是对模块中的loader使用的配置
		// preLoaders:[{
		// 	test:/\.jsx?$/,
		// 	loaders:['eslint'],
		// 	include: APP_PATH,
		// 	exclude: /node_modules/
		// }],
		loaders: [{
			test: /\.css$/,
			loader: ['style-loader', 'css-loader']
		}, {
			test: /\.jsx?$/,
			loaders: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ["es2015", "react"]
			}
		}]
	},
	plugins: [ //使用插件机制
			new HtmlWebpackPlugin({
				title: 'Index',
				path: path.join(__dirname, 'build'),
				filename: 'index.html',
			})
		]
		// plugins: plugins,
}

//webpack -w 可实时构建，监听文件改动，手动刷新浏览器可查看改动结果