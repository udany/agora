import { User } from '../../shared/models/User';
import { apiService } from './api';

interface SessionData {
	user: User
}


class SessionService {
	loaded: Promise<boolean>|boolean = false;

	session: SessionData = {
		user: null
	};

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
}

export const sessionService = new SessionService();
