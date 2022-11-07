import * as express from 'express'
import { UserModel, User } from '../database/models/User';
import { PostModel, Post } from '../database/models/Post';

let router = express.Router({});

router.get('/:id', async (req, res, next) => {
	let { id } = req.params;

	let post = await PostModel.getById(id);

	res.send(post.$serialize());
})

router.post('/save', async (req, res, next) => {
	let user = req.user as User;
	if (!user) {
		res.status(400);
		res.send('Nope');
	}

	let { post: postData } = req.body;
	let post = new Post().$fill(postData);
	post.userId = user.id;

	await PostModel.save(post);

	res.send(post.$serialize(true));
})

export default {
	path: '/post',
	router
}
