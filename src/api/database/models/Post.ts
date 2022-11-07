import db from '../index';

import { DatabaseModel } from 'udany-toolbox/modules/orm';
import { DatabaseRelationshipOneToMany } from 'udany-toolbox/modules/orm/DatabaseRelationship';
import { Post } from '../../../shared/models/Post';
import { UserModel } from './User';

/**
 * @type {DatabaseModel<User>}
 */
const PostModel = new DatabaseModel({
	db,

	table: 'Posts',
	entity: Post,

	fields: [
		new DatabaseModel.Field.Any({
			name: 'id',
			type: 'int',
			length: 11,
			autoIncrement: true,
			primaryKey: true
		}),

		new DatabaseModel.Field.Any({
			name: 'userId',
			type: 'int',
			length: 11,
		}),

		new DatabaseModel.Field.Json({
			name: 'title',
			type: 'text',
			defaultValue: 'null',
		}),

		new DatabaseModel.Field.Json({
			name: 'body',
			type: 'text',
			defaultValue: 'null',
		}),
	],

	relationships: [
		new DatabaseRelationshipOneToMany({
			externalModel: UserModel,
			property: 'user',
			localForeignKey: 'userId',
		})
	]
});

export {
	Post,
	PostModel
};
