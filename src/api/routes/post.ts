import * as express from 'express'
import { UserModel, User } from '../database/models/User';
import { PostModel, Post } from '../database/models/Post';
import { DatabaseQueryCondition } from 'udany-toolbox/modules/orm/DatabaseQueryComponent';

let router = express.Router({});

router.get('/:id', async (req, res, next) => {
	let { id } = req.params;

	let post = await PostModel.getById(id);

	res.send(post.$serialize(true));
})
router.get('/user/:id', async (req, res, next) => {
	let { id } = req.params;

	let user = await UserModel.getById(id);

	let posts = await PostModel.select({
		filters: [
			new DatabaseQueryCondition({
				column: 'userId',
				values: [id]
			})
		]
	});

	for (let post of posts) {
		post.user = user;
	}

	res.send(posts.map(p => p.$serialize(true)));
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

	if (!post.created) {
		post.created = new Date();
	}
	if (post.id) {
		post.edited = new Date();
	}

	await PostModel.save(post);

	res.send(post.$serialize(true));
})

export default {
	path: '/post',
	router
}
