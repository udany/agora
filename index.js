const path = require('path');

const { startBabelRegister } = require('udany-base-configs/modules/babel.js');

require('dotenv').config({
	path: path.resolve(process.cwd(), 'env', '.env')
});

startBabelRegister({
	ignore: [
		function (package) {
			package = package.replace(__dirname, '');

			if (package.indexOf('node_modules') >= 0) {
				if (package.indexOf('udany-') >= 0) {
					return false;
				} else {
					return true;
				}
			}

			return false;
		}
	]
});

require('./src/server.js');
