import { api } from '../index';
import { User } from '../../../../shared/models/User';

export const authApi = {
	async register(user: User) {
		let { data } = await api.post('/auth/register', {
			user
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

	async logout() {
		try {
			await api.get('/auth/logout');
		} catch (e) {
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
};
