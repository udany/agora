import { Entity } from 'udany-toolbox/modules/base';
import { User } from './User';

export class Post extends Entity {
	@Entity.Field.Integer()
	id: number;
	@Entity.Field.Integer()
	userId: number;

	@Entity.Field.Date()
	created: Date;

	@Entity.Field.Date()
	edited: Date;

	@Entity.Field.Json()
	title: Object;
	@Entity.Field.Json()
	body: Object;

	@Entity.Field.Entity({ class: User } )
	user: User;
}
