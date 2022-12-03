import { FontCategory, FontDescriptor, FontSubset } from './types';
import api from './api';

const categories: Record<string, FontCategory> = {
	display: {
		name: 'Display',
		code: 'display'
	},
	handwriting: {
		name: 'Handwriting',
		code: 'handwriting'
	},
	monospace: {
		name: 'Monospace',
		code: 'monospace'
	},
	sansSerif: {
		name: 'Sans Serif',
		code: 'sans-serif'
	},
	serif: {
		name: 'Serif',
		code: 'serif'
	},
};

export const googleFontsService = {
	_listPromise: null as Promise<FontDescriptor[]>,
	_list: null as FontDescriptor[],

	categories,
	subsets: [] as FontSubset[],

	list(options = {}): Promise<FontDescriptor[]> {
		if (!this._listPromise) {
			this._listPromise = (async () => {
				this._list = await api.list(options);
				return this._list;
			})();
		}

		return this._listPromise;
	},

	getCategories(): FontCategory[] {
		return Object.values(categories);
	},

	getCategory(code): FontCategory|null {
		return Object.values(categories).find(c => c.code === code);
	},

	async getSubsets(): Promise<FontSubset[]> {
		if (!this.subsets.length) {
			let list = await this.list();

			this.subsets = list.map(x => x.subsets).flat().dedupe().sort().map(s => ({
				code: s,
				name: s.split('-').map(x => x.capitalize()).join(' ')
			}));
		}

		return this.subsets;
	},

	getSubset(code): FontSubset|null {
		return this.subsets.find(c => c.code === code);
	},

	async getFont(fontFamilyName): Promise<FontDescriptor|null> {
		let list = await this.list();

		return list.find(f => f.family === fontFamilyName);
	},

	getStylesheetUrl(font: FontDescriptor): string {
		const u = (s) => encodeURIComponent(s);
		const variantMap = v => `${v.italic ? 1 : 0},${v.weight}`;

		let variants = [
			...font.variants.filter(v => !v.italic).map(variantMap),
			...font.variants.filter(v => v.italic).map(variantMap),
		].join(';')

		return `https://fonts.googleapis.com/css2?family=${u(font.family)}:ital,wght@${variants}&display=swap`;
	},

	async load(font: FontDescriptor): Promise<boolean> {
		let cssUrl = googleFontsService.getStylesheetUrl(font);

		if (!font.link) {
			let link = document.createElement('link');
			link.setAttribute('rel', 'stylesheet');
			link.setAttribute('href', cssUrl);
			document.head.appendChild(link);

			font.link = link;
		}

		if (!font.loaded) {
			return new Promise(async (accept) => {
				let [fontResult] = await document.fonts.load(`12px "${font.family}"`);

				setTimeout(() => accept(true), 200 + (20 * font.variants.length));
			}).then(() => {
				font.loaded = true

				return true;
			});
		} else {
			return true;
		}
	},

	/**
	 * @param {FontDescriptor} font
	 */
	unload(font) {
		if (font.link instanceof HTMLLinkElement) {
			document.head.removeChild(font.link);
			font.link = null;
			font.loaded = false;
		}
	}
};
