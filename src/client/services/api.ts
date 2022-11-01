import axios from 'axios';
import { User } from '../../shared/models/User';

const api = axios.create({
	baseURL: '/api/'
});

export const apiService = {
	auth: {
		async register(user: User) {
			let { data } = await api.post('/auth/register', {
				user: user
			})
		}
	},
	session: {
		async getUser() {
			let { data } = await api.get('/session/user');

			return data ? new User().$fill(data) : null;
		}
	},
	test: {
		async test():Promise<User[]> {
			let { data } = await api.get('/test');

			return data ? data.map(x => new User().$fill(x)) : null;
		}
	}
};
