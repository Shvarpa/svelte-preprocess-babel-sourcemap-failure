const preprocess = require("svelte-preprocess");
const babel = require("./babel.config");
module.exports = {
	preprocess: preprocess({
		babel,
		typescript: {
			transpileOnly: true
		}
	})
};
