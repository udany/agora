const plugins = {
	install(app) {
		const contexts = import.meta.glob('./plugins/*.js', { eager: true })

		for (let path of Object.keys(contexts)) {
			let plugin = contexts[path].default;

			plugin(app);
		}
	}
};

export default plugins;
