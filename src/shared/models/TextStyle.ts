import { Entity, HslColor } from 'udany-toolbox/modules/base';

export enum TextCase {
	Lower = -1,
	None = 0,
	Upper = 1,
}

export enum Alignment {
	start = "start",
	center = "center",
	right = "right",
}

declare type Accessor<T, S> = (source:S) => T;
declare type ItemId = string | number;
declare type PendingItem<T> = { promise: Promise<T>, accept: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void };

class EntityDictionary<E extends Entity> {
	#dictionary = new Map<ItemId, E>();
	readonly getId: Accessor<ItemId, E>;

	constructor(getId: Accessor<ItemId, E>) {
		this.getId = getId;
	}

	register(item: E) {
		let id = this.getId(item);
		this.#dictionary.set(id, item);

		let pending = this.#pendingItems.get(id);
		if (pending) pending.accept(item);
	}

	get(id: ItemId): E {
		return this.#dictionary.get(id);
	}

	#pendingItems = new Map<ItemId, PendingItem<E>>();

	async load(id: ItemId):Promise<E> {
		let pending = this.#pendingItems.get(id);
		if (pending) return pending.promise;

		let accept, reject;
		let promise = new Promise<E>((a, r) => {
			accept = a;
			reject = r;
		});

		this.#pendingItems.set(id, { accept, reject, promise });

		return promise;
	};
}

class DictionaryEntity extends Entity {
	dictionary: EntityDictionary<this>;

	$fill(a: any): this {
		if (this.dictionary) {
			let current = this.dictionary.get(this.dictionary.getId(a));
			if (current) {
				current.$fill(a);
				return current;
			}
		}

		super.$fill(a);
		this.dictionary.register(this);

		return this;
	}
}

abstract class ParentedEntity extends DictionaryEntity {
	parent?: this = null;
	get $parent(): this {
		return this.parent;
	}

	abstract loadParent();

	$fill(a: any): this {
		super.$fill(a);

		this.loadParent();

		return this;
	}
}

const styleDictionary = new EntityDictionary<TextStyle>((s) => s.id);

export class TextStyle extends ParentedEntity {
	dictionary = styleDictionary as EntityDictionary<this>;

	@Entity.Field.String()
	id: string;

	@Entity.Field.String()
	name: string;

	@Entity.Field.String()
	parentId: string;

	async loadParent() {
		if (this.parentId) {
			this.parent = await this.dictionary.load(this.parentId);
		}
	}

	@Entity.Field.Entity({ class: HslColor } )
	color: HslColor;

	@Entity.Field.String()
	font: string;

	@Entity.Field.Float()
	size: number;

	@Entity.Field.Float()
	lineHeight: number;

	@Entity.Field.String()
	alignment: Alignment;

	@Entity.Field.Integer()
	weight: number;

	@Entity.Field.Boolean()
	italic: number;

	@Entity.Field.Boolean()
	underline: number;

	@Entity.Field.Boolean()
	strikethrough: number;

	@Entity.Field.Integer()
	case: TextCase;

	constructor() {
		super();
		this.id = crypto.randomUUID();
	}

	getStyle() {
		return {
			color: this.color.toString(),
			fontFamily: this.font,
			fontSize: this.size + 'px',
			lineHeight: this.lineHeight + 'em',
			fontWeight: this.weight,
			fontStyle: this.italic ? 'italic' : '',

			textDecoration: [
				this.underline ? 'underline' : '',
				this.strikethrough ? 'line-through' : '',
			].filter(x => x).join(' '),

			textTransform: this.case === 0 ? '' : (this.case > 0 ? 'uppercase' : 'lowercase'),

			textAlign: this.alignment,
		}
	}
}
