const { startBabelRegister } = require('udany-base-configs/modules/babel.js');

startBabelRegister({
	ignore: []
});

const { default: viteConfig } = require('./src/vite.config.js');

export default viteConfig;
