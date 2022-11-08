import { reactive } from 'vue';
import { User } from '../../shared/models/User';
import { apiService } from './api';
import { NavigationGuardWithThis } from 'vue-router';

interface SessionData {
	user: User
}

class SessionService {
	loaded: Promise<boolean>|boolean = false;

	session: SessionData = reactive({
		user: null
	});

	async load() {
		let ack;

		this.loaded = new Promise((accept) => {
			ack = accept;
		});

		let user = await apiService.auth.session();
		if (user) {
			this.session.user = user;
		}

		ack(true);
	}

	async logout() {
		await apiService.auth.logout();
		this.session.user = null;
	}
}

export const sessionService = new SessionService();

export const redirectHomeIfLoggedIn: NavigationGuardWithThis<undefined> = async function (to, from) {
	await sessionService.loaded;
	if (sessionService.session.user) {
		return { name: 'home' };
	}
}

export const protectNonPublicRoutes: NavigationGuardWithThis<undefined> = async function (to, from) {
	await sessionService.loaded;

	if (!sessionService.session.user && !to.meta.public) {
		return { name: 'index' };
	}
}
