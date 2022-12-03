import { Entity, HslColor } from 'udany-toolbox/modules/base';
import type { CSSProperties } from 'vue';

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
		if (this.#dictionary.has(id)) return this.#dictionary.get(id);

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
	protected parent?: this = null;
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

	@Entity.Field.Entity({ class: HslColor, inherited: true } )
	color: HslColor;

	@Entity.Field.String({ inherited: true })
	font: string;

	@Entity.Field.Float({ inherited: true })
	size: number;

	@Entity.Field.Float({ inherited: true })
	lineHeight: number;

	@Entity.Field.String({ inherited: true })
	alignment: Alignment;

	@Entity.Field.Integer({ inherited: true })
	weight: number;

	@Entity.Field.Boolean({ inherited: true })
	italic: number;

	@Entity.Field.Boolean({ inherited: true })
	underline: number;

	@Entity.Field.Boolean({ inherited: true })
	strikethrough: number;

	@Entity.Field.Integer({ inherited: true })
	case: TextCase;

	constructor() {
		super();
		this.id = crypto.randomUUID();
	}

	getStyle(): CSSProperties {
		let style = {} as CSSProperties;

		if (this.color) style.color = this.color.toString();
		if (this.font) style.fontFamily = this.font;
		if (this.size) style.fontSize = this.size + 'px';
		if (this.lineHeight) style.lineHeight = this.lineHeight + 'em';
		if (this.weight) style.fontWeight = this.weight;
		if (this.italic) style.fontStyle = this.italic ? 'italic' : '';
		if (this.underline || this.strikethrough) {
			style.textDecoration = [
				this.underline ? 'underline' : '',
				this.strikethrough ? 'line-through' : '',
			].filter(x => x).join(' ');
		}
		if (this.case) style.textTransform = (this.case > 0 ? 'uppercase' : 'lowercase');
		if (this.alignment) style.textAlign = this.alignment;

		return style;
	}
}