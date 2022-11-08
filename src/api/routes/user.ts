import * as express from 'express'
import { UserModel } from '../database/models/User';

let router = express.Router({});

router.get('/:id', async (req, res, next) => {
	let { id } = req.params;

	let user = await UserModel.getById(id);

	res.send(user.$serialize(true));
})

export default {
	path: '/user',
	router
}
