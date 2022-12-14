import db from '../index';

import { DatabaseModel } from 'udany-toolbox/modules/orm';
import {
	DatabaseRelationshipManyToOne
} from 'udany-toolbox/modules/orm/DatabaseRelationship';
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

		new DatabaseModel.Field.Any({
			name: 'created',
			type: 'int',
			unsigned: true,
			length: 11,
			serializeBefore: true,
		}),

		new DatabaseModel.Field.Any({
			name: 'edited',
			type: 'int',
			unsigned: true,
			length: 11,
			serializeBefore: true,
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
		new DatabaseRelationshipManyToOne({
			externalModel: UserModel,
			property: 'user',
			localForeignKey: 'userId',
			autoload: true
		})
	]
});

export {
	Post,
	PostModel
};
