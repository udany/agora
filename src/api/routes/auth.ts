import * as express from 'express'
import auth from '../../auth';
import { User } from '../../shared/models/User';
import { UserModel } from '../database/models/User';
import { PasswordService } from '../services/PasswordService';

let router = express.Router({});
auth.generateRoutes(router);

router.post('/register', async (req, res, next) => {
	let { user: userData }: { user: User } = req.body;

	if (!userData.name || !userData.email || !userData.password) {
		res.status(400);
		res.send('Invalid payload');
		return;
	}

	if (!PasswordService.validate(userData.password)) {
		res.status(400);
		res.send('Insecure password');
		return;
	}

	let oldUser = await UserModel.selectFirst({
		filters: [
			{
				column: 'email',
				values: [userData.email]
			}
		]
	});

	if (oldUser && oldUser.id) {
		res.status(409);
		res.send('User already registered');
		return;
	}

	const user = new User();
	user.name = userData.name;
	user.email = userData.email;
	user.password = await PasswordService.encrypt(userData.password);

	await UserModel.save(user);

	res.send(user.$serialize(true));
})

export default {
	path: '/auth',
	router
}
