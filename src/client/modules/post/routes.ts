import { RouteRecordRaw } from 'vue-router';

const baseRoute = '/post';

export const ComposerRoutes: Record<string, RouteRecordRaw> = {
	postEdit: {
		path: `${baseRoute}/:id(\\d+)?-:title?`,
		name: 'post-edit',
		component: () => import('./Editor.vue')
	}
}

export default Object.values(ComposerRoutes);

