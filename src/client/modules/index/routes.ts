import { RouteRecordRaw } from 'vue-router';

import { redirectHomeIfLoggedIn } from '../../services/session';

const baseRoute = '/';

export const IndexRoutes: Record<string, RouteRecordRaw> = {
	index: {
		path: `${baseRoute}`,
		name: 'index',
		component: () => import('./Index.vue'),
		meta: {
			public: true
		},
		beforeEnter: redirectHomeIfLoggedIn
	},
}

export default Object.values(IndexRoutes);

