import axios from 'axios';
import { User } from '../../../shared/models/User';
import { authApi } from './modules/auth';
import { postApi } from './modules/post';

export const api = axios.create({
	baseURL: '/api/'
});

export const apiService = {
	auth: authApi,
	post: postApi
};
