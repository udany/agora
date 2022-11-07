import { api } from '../index';
import { User } from '../../../../shared/models/User';
import { Post } from '../../../../shared/models/Post';

export const postApi = {
	async save(post: Post) {
		let { data } = await api.post('/post/save', {
			post
		});

		return data;
	},
};
