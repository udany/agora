import { RouteRecordRaw } from 'vue-router';

const baseRoute = '/user';

export const ProfileRoutes: Record<string, RouteRecordRaw> = {
	profile: {
		path: `${baseRoute}/:id`,
		name: 'profile',
		component: () => import('./Profile.vue'),
		meta: {
			public: true
		}
	},
}

export default Object.values(ProfileRoutes);

