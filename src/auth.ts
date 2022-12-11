import { Auth, strategies } from 'udany-toolbox/modules/auth';
import { User, UserModel } from './api/database/models/User';
import { PasswordService } from './api/services/PasswordService';
import { serverConfig } from './api/config';

const strats = [
	new strategies.LocalStrategy<User>({
		idField: 'id',
		verifyPassword: (user, password) => {
			return PasswordService.compare(password, user.password);
		}
	}),
]

const auth = new Auth({
	userModel: UserModel,
	strategies: strats,

	routing: {
		baseUrl: serverConfig.baseUrl,
		routerPrefix: '/api/auth/'
	},

	userFactory: profile => new User().$fill({
		name: profile.name,
		email: profile.email
	})
})

export default auth;
