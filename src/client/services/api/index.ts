import { authApi } from './modules/auth';
import { postApi } from './modules/post';
import { userApi } from './modules/user';

export const apiService = {
	auth: authApi,
	post: postApi,
	user: userApi
};
