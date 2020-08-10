const webpack = require("webpack");
const pkg = require("./package.json");
const path = require("path");

const { preprocess } = require("./svelte.config");
const mode = process.env.NODE_ENV || "development";
const dev = mode === "development";
const prod = !dev;

const resolve = {
	alias: { svelte: path.resolve("node_modules", "svelte") },
	extensions: [".mjs", ".ts", ".js", ".svelte"],
	mainFields: ["svelte", "browser", "module", "main"],
};

module.exports = {
	entry: { bundle: "./src/index" },
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "build/[name].js",
		chunkFilename: "build/[name].[id].js",
	},
	resolve,
	module: {
		rules: [
			{ test: /\.(m?js|[js]sx?)$/, use: { loader: "babel-loader" } },
			{
				test: /\.(svelte|html)$/,
				use: [
					// { loader: "babel-loader" },
					{
						loader: "svelte-loader",
						options: {
							dev,
							hydratable: true,
							hotReload: false, // pending https://github.com/sveltejs/svelte/issues/2377
							preprocess,
						},
					},
				],
			},
			{
				// test: /\.(sa|s?c)ss$/i,
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.browser": true,
			"process.env.NODE_ENV": JSON.stringify(mode),
		}),
	].filter(Boolean),
	mode,
	devtool: dev && "inline-source-map",
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: process.env.PORT || 9000,
	},
};