import { RouteRecordRaw } from 'vue-router';
import { redirectHomeIfLoggedIn } from '../../services/session';

export const AuthRoutes: Record<string, RouteRecordRaw> = {
	login: {
		path: `/login`,
		name: 'login',
		component: () => import('./Login.vue'),
		meta: {
			public: true
		},
		beforeEnter: redirectHomeIfLoggedIn
	},
	register: {
		path: `/register`,
		name: 'register',
		component: () => import('./Register.vue'),
		meta: {
			public: true
		},
		beforeEnter: redirectHomeIfLoggedIn
	},
}

export default Object.values(AuthRoutes);
