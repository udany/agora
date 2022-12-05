import { TextStyle } from './TextStyle';
import { Entity } from 'udany-toolbox/modules/base/index';
import { EntityDictionary } from './DictionaryEntity';
import { watch, Ref, ComputedRef } from 'vue';

export enum Selector {
	any = '> *',
	paragraph = 'p',
	heading = 'h1, h2, h3, h4, h5, h6',
	blockquote = 'blockquote',
	code = 'code'
}

const styleDictionary = new EntityDictionary<ThemeStyle>((s) => s.id);

const kebabRegex = new RegExp(/[A-Z]/g);
const kebabCase = (str) => str.replace(kebabRegex, v => `-${v.toLowerCase()}`)

export class ThemeStyle extends TextStyle {
	dictionary = styleDictionary as EntityDictionary<this>;

	@Entity.Field.String()
	name: string;

	@Entity.Field.Json()
	selectors: Selector[] = [];

	@Entity.Field.Boolean()
	custom: boolean;

	theme: DocumentTheme;

	get cssClass() {
		return `style-${this.id}`;
	}

	get selector(): string {
		let selector: string;
		if (this.custom) {
			selector = `.${this.cssClass}`;
		} else {
			selector = this.selectors.join(', ');
		}

		let selectors = selector
			.split(',')
			.map(x => x.trim());

		if (this.theme) {
			selectors = selectors
				.map(x => this.theme.selector + ' ' + x);
		}

		return selectors.join(', ');
	}

	get cssRule(): string {
		let style = this.getStyle();

		let body = Object.keys(style).reduce((accumulator, key) => {
			const cssKey = kebabCase(key);
			const cssValue = style[key].replace("'", "");

			return `${accumulator}\t${cssKey}: ${cssValue};\n`
		}, '\n');

		return `${this.selector} {${body}}`
	}
}

export class DocumentTheme extends Entity {
	@Entity.Field.UUID()
	id: string;

	@Entity.Field.EntityList({ class: ThemeStyle } )
	styles: ThemeStyle[] = [];

	constructor() {
		super();
		this.styles.unique(true);
	}

	$fill(a: any): this {
		super.$fill(a);

		this.styles.forEach(s => s.theme = this);

		return this;
	}

	addStyle(style: ThemeStyle) {
		style.theme = this;
		this.styles.push(style);
	}

	get cssClass() {
		return `theme-${this.id}`;
	}

	get selector() {
		return `.${this.cssClass}`;
	}

	get css() {
		return this.styles.map(s => s.cssRule).join('\n\n');
	}
}

export function useDynamicStyle(content: Ref<string> | ComputedRef<string>) {
	let styleElement = document.createElement('style');

	let clearWatch;

	return {
		styleElement,
		mount() {
			if (clearWatch) clearWatch();

			clearWatch = watch(() => content.value, () => {
				styleElement.innerHTML = content.value;
			}, {
				immediate: true
			});

			document.head.appendChild(styleElement);
		},
		destroy() {
			clearWatch();
			document.head.removeChild(styleElement);
		}
	}
}
