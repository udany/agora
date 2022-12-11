import { api } from '../api';
import { Post } from '../../../../shared/models/Post';

export const postApi = {
	async save(post: Post) {
		let { data } = await api.post('/post/save', {
			post
		});

		return data;
	},

	async get(id: number): Promise<Post> {
		let { data } = await api.get('/post/'+id);

		return new Post().$fill(data);
	},

	async getByUser(userId: number): Promise<Post[]> {
		let { data } = await api.get('/post/user/'+userId);

		return data.map(p => new Post().$fill(p));
	}
};
