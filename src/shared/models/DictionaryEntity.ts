import { Entity } from 'udany-toolbox/modules/base/index';

export declare type Accessor<T, S> = (source:S) => T;
declare type ItemId = string | number;
declare type PendingItem<T> = { promise: Promise<T>, accept: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void };

export class EntityDictionary<E extends Entity> {
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

export class DictionaryEntity extends Entity {
	dictionary: EntityDictionary<this>;

	$fill(a: any): this {
		if (this.dictionary) {
			let current = this.dictionary.get(this.dictionary.getId(a));
			if (current && current !== this) {
				current.$fill(a);
				return current;
			}
		}

		super.$fill(a);
		this.dictionary.register(this);

		return this;
	}
}
