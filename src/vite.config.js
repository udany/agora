import createViteConfig from 'udany-base-configs/modules/vite.config.js';

const viteConfig = createViteConfig({
	root: './src/client',
	sassAutoImport: 'src/client/css/global.scss'
});

export default viteConfig;
