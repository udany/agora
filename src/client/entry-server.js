import createApp from './main.js';
import { api } from './services/api/api';

export async function render(url, {
	req
} = {}) {
	// Forwards cookies
	if (req.headers.cookie) api.defaults.headers.common.cookie = req.headers.cookie;

	const { app, router } = await createApp();

	// set the router to the desired URL before rendering
	router.push(url);
	await router.isReady();

	return { app, router };
}
