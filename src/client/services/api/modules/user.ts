import { api } from '../index';
import { User } from '../../../../shared/models/User';

export const userApi = {
	async get(id: number): Promise<User> {
		let { data } = await api.get('/user/'+id);

		return new User().$fill(data);
	},
};
