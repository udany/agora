import path from 'path';
import db from './database';
let glob = require('fast-glob');

const routesDir = (__dirname + '\\routes').replace(/\\/g, `/`);

db.on('connected', function () {
	console.log(
		'Database connected to',
		db.options.host,
		'\n'
	);
});

function registerApi({
	api
}) {
	db.connect();
	let routeFiles = glob.sync(`${routesDir}/*.(js|ts)`);

	console.log(
		'Registering api routes:',
		routeFiles.map(x => x.replace(routesDir, '')),
		'\n'
	);

	for (let file of routeFiles) {
		let route = require(path.resolve(file)).default;

		api.use(route.path, route.router);
	}
}

export default registerApi;
