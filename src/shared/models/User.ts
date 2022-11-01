import { Entity } from 'udany-toolbox/modules/base';

export class User extends Entity {
	@Entity.Field.Integer()
	id: number;

	@Entity.Field.String()
	name: string;
	@Entity.Field.String()
	email: string;

	@Entity.Field.String({ safe: false })
	password: string;
	@Entity.Field.String({ safe: false })
	googleId?: string;
	@Entity.Field.String({ safe: false })
	twitterId?: string;
}
