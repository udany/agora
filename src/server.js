import createServer from 'udany-base-configs/modules/server.js';
import registerApi from './api';
import express from 'express';
import auth from './auth';
import viteConfig from './vite.config.js';

async function startServer() {
	const { server, app, api } = await createServer({
		basePath: __dirname,

		https: {
			enabled: false
		},
		ssr: {
			enabled: false
		},
		isProd: true,

		port: 8420,

		viteConfig: viteConfig,

		onServerInitialized(app) {
			app.use('/resources', express.static(__dirname + '/resources'));
			auth.use(app);
		}
	});

	registerApi({
		server,
		app,
		api
	});
}

startServer();
