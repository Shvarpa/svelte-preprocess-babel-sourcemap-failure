module.exports = {
	presets: [
		[
			"@babel/preset-typescript",
			{
				useBuiltIns: "usage",
				corejs: 3,
				targets: "> 0.25%, not dead",
				loose: true,
				// No need for babel to resolve modules
				modules: false,
				targets: {
					// ! Very important. Target es6+
					esmodules: true
				}
			}
		]
	],
	plugins: [
		// "@babel/plugin-proposal-class-properties",
		// "@babel/plugin-proposal-nullish-coalescing-operator",
		// "@babel/plugin-proposal-object-rest-spread",
		// "@babel/plugin-proposal-optional-chaining",
		// "@babel/plugin-transform-named-capturing-groups-regex",
		// "@babel/plugin-syntax-dynamic-import",
	]
};
