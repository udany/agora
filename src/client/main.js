import 'udany-toolbox/extend';

import { createSSRApp } from 'vue';
import App from './App.vue';
import createRouter from './router';
import plugins from './plugins';
import { sessionService, protectNonPublicRoutes } from './services/session';

async function createApp() {
	await sessionService.load();

	const app = createSSRApp(App);
	app.use(plugins);

	const router = createRouter();
	app.use(router);

	if (!import.meta.env.SSR) {
		app.provide('document', window.document);
	} else {
		const jsdom = await import("jsdom");
		const { JSDOM } = jsdom;
		const { window } = new JSDOM(`<!DOCTYPE html><p>Hey</p>`);

		app.provide('document', window.document);
	}

	router.beforeEach(protectNonPublicRoutes);

	return { app, router }
}

export default createApp;
