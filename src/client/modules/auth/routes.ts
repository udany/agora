import { RouteRecordRaw } from 'vue-router';
import { sessionService } from '../../services/session';

export const AuthRoutes: Record<string, RouteRecordRaw> = {
	login: {
		path: `/login`,
		name: 'login',
		component: () => import('./Login.vue'),
		meta: {
			public: true
		},
		async beforeEnter() {
			await sessionService.loaded;
			if (sessionService.session.user) {
				return { path: '/' }
			}
		}
	},
	register: {
		path: `/register`,
		name: 'register',
		component: () => import('./Register.vue'),
		meta: {
			public: true
		},
		async beforeEnter() {
			await sessionService.loaded;
			if (sessionService.session.user) {
				return { path: '/' }
			}
		}
	},
}

export default Object.values(AuthRoutes);
