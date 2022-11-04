import { RouteRecordRaw } from 'vue-router';

const baseRoute = '/home';

export const HomeRoutes: Record<string, RouteRecordRaw> = {
	home: {
		path: `${baseRoute}`,
		name: 'home',
		component: () => import('./Index.vue')
	},
}

export default Object.values(HomeRoutes);

