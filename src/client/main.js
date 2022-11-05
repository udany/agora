import 'udany-toolbox/extend';

import { createSSRApp } from 'vue'
import App from './App.vue'
import createRouter from './router';
import plugins from './plugins';
import { sessionService, protectNonPublicRoutes } from './services/session';

function createApp() {
	sessionService.load();

	const app = createSSRApp(App);
	app.use(plugins);

	const router = createRouter();
	app.use(router);

	router.beforeEach(protectNonPublicRoutes);

	return { app, router }
}

export default createApp;
