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
		},
		async login(user: User): Promise<boolean> {
			try {
				let { data } = await api.post('/auth/local', {
					username: user.email,
					password: user.password
				});

				return true;
			} catch (e) {
				console.log(e);
				return false;
			}
		},

		async session(): Promise<User> {
			try {
				let { data } = await api.get('/auth/session');

				return data ? new User().$fill(data) : null;
			} catch (e) {
				return null;
			}
		},
	},
	test: {
		async test():Promise<User[]> {
			let { data } = await api.get('/test');

			return data ? data.map(x => new User().$fill(x)) : null;
		}
	}
};
