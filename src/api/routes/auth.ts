import * as express from 'express'
import auth from '../../auth';
import { User } from '../../shared/models/User';
import { UserModel } from '../database/models/User';
import { PasswordService } from '../services/PasswordService';

let router = express.Router({});
auth.generateRoutes(router);

router.post('/register', async (req, res, next) => {
	let { user: userData } = req.body;

	console.log(userData);

	if (!userData.name || !userData.email || !userData.password) {
		throw 'Invalid payload';
	}

	const user = new User();
	user.name = userData.name;
	user.email = userData.email;
	user.password = await PasswordService.encrypt(userData.password);

	await UserModel.save(user);

	return user.$serialize(true);
})

export default {
	path: '/auth',
	router
}
