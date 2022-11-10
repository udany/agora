import axios from 'axios';

import { authApi } from './modules/auth';
import { postApi } from './modules/post';
import { userApi } from './modules/user';

export const api = axios.create({
	// TODO: Configs, for yesterday!
	baseURL: 'http://localhost:8420/api/'
});

export const apiService = {
	auth: authApi,
	post: postApi,
	user: userApi
};
