module.exports = {
	plugins: [
        ["snowpack-plugin-string", {
			input: [".htm"]
		}],
	],
	alias: {
		'@':'./src/'
	}
}