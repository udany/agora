import createApp from './main.js';

(async function() {
	const { app, router } = await createApp();

	router.isReady().then(() => {
		app.mount('#app');
	})
})();
