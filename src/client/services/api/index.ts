import axios from 'axios';

import { authApi } from './modules/auth';
import { postApi } from './modules/post';
import { userApi } from './modules/user';

export const api = axios.create({
	baseURL: '/api/'
});

export const apiService = {
	auth: authApi,
	post: postApi,
	user: userApi
};
