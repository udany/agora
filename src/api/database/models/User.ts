import { DatabaseModel } from 'udany-toolbox/modules/orm';
import { User } from '../../../shared/models/User';
import db from '../index';

/**
 * @type {DatabaseModel<User>}
 */
const UserModel = new DatabaseModel({
	db,

	table: 'Users',
	entity: User,

	fields: [
		new DatabaseModel.Field.Any({
			name: 'id',
			type: 'int',
			length: 11,
			autoIncrement: true,
			primaryKey: true
		}),

		new DatabaseModel.Field.Any({
			name: 'name',
			type: 'varchar',
			length: 128,
			defaultValue: '',
		}),

		new DatabaseModel.Field.Any({
			name: 'email',
			type: 'varchar',
			length: 256,
			defaultValue: null,
			nullable: true
		}),

		new DatabaseModel.Field.Any({
			name: 'password',
			type: 'varchar',
			length: 60,
			defaultValue: null,
			nullable: true
		}),

		new DatabaseModel.Field.Any({
			name: 'googleId',
			type: 'varchar',
			length: 64,
			defaultValue: null,
			nullable: true
		}),

		new DatabaseModel.Field.Any({
			name: 'twitterId',
			type: 'varchar',
			length: 64,
			defaultValue: null,
			nullable: true
		}),
	]
});

export {
	User,
	UserModel
};
