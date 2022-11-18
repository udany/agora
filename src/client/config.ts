import { Environment } from '../shared/environment';

export const config = {
	environment: Environment[import.meta.env.MODE],
	baseUrl: import.meta.env.CLIENT_BASE_URL
}
