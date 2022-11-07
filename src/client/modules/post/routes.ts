import { RouteRecordRaw } from 'vue-router';

const baseRoute = '/post';

export const ComposerRoutes: Record<string, RouteRecordRaw> = {
	postView: {
		path: `${baseRoute}/:id(\\d+)`,
		name: 'post-view',
		component: () => import('./Viewer.vue')
	},
	postEdit: {
		path: `${baseRoute}/edit/:id(\\d+)?`,
		name: 'post-edit',
		component: () => import('./Editor.vue')
	}
}

export default Object.values(ComposerRoutes);

