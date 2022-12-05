import { Entity, HslColor } from 'udany-toolbox/modules/base';
import type { CSSProperties } from 'vue';
import { ParentedEntity } from './ParentedEntity';

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

export class TextStyle extends ParentedEntity {
	@Entity.Field.UUID()
	id: string;

	@Entity.Field.String()
	parentId: string;

	async loadParent() {
		if (this.parentId) {
			this.parent = await this.dictionary.load(this.parentId);
		}
	}

	@Entity.Field.Entity({ class: HslColor, inherited: true, nullable: true } )
	color: HslColor;

	@Entity.Field.String({ inherited: true, nullable: true })
	font: string;

	@Entity.Field.Float({ inherited: true, nullable: true })
	size: number;

	@Entity.Field.Float({ inherited: true, nullable: true })
	lineHeight: number;

	@Entity.Field.String({ inherited: true, nullable: true })
	alignment: Alignment;

	@Entity.Field.Integer({ inherited: true, nullable: true })
	weight: number;

	@Entity.Field.Boolean({ inherited: true, nullable: true })
	italic: number;

	@Entity.Field.Boolean({ inherited: true, nullable: true })
	underline: number;

	@Entity.Field.Boolean({ inherited: true, nullable: true })
	strikethrough: number;

	@Entity.Field.Integer({ inherited: true, nullable: true })
	case: TextCase;

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
