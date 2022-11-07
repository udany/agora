import { Entity } from 'udany-toolbox/modules/base';

export class Post extends Entity {
	@Entity.Field.Integer()
	id: number;
	@Entity.Field.Integer()
	userId: number;

	@Entity.Field.Json()
	title: Object;
	@Entity.Field.Json({ })
	body: Object;
}
