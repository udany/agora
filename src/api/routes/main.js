import express from 'express'
import { UserModel } from '../database/models/User';

let router = express.Router({});

router.get('/', async function (req, res, next) {
	res.send("Hello world");
});

router.get('/test', async function (req, res, next) {
	let users = await UserModel.select();

	res.send(users);
});

export default {
	path: '/',
	router
}
