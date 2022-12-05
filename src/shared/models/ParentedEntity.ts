import { DictionaryEntity } from './DictionaryEntity';

export abstract class ParentedEntity extends DictionaryEntity {
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

	$serialize(safeOnly: boolean = false, include: any[] = []): {} {
		let oldParent = this.parent;
		this.parent = null;

		let data = super.$serialize(safeOnly, include);

		this.parent = oldParent;

		return data;
	}
}
