const baseRoute = '/';

export const AuthRoutes = {
	login: {
		path: `/login`,
		name: 'login',
		component: () => import('./Login.vue')
	},
	register: {
		path: `/register`,
		name: 'register',
		component: () => import('./Register.vue')
	},
}

export default Object.values(AuthRoutes);
