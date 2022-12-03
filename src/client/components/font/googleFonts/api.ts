import axios from 'axios';
import { config } from '../../../config';
import { FontDescriptor, FontVariant } from './types';

const options = {
	baseURL: `https://www.googleapis.com/webfonts/v1`
};

const client = axios.create(options);

const regex = /^(\d{1,4})(\w*)$/;

function parseVariant(variantName: string): FontVariant|null {
	let match: string[];

	match = regex.exec(variantName);

	if (variantName === 'regular') {
		match = [variantName, '400', ''];
	}

	if (variantName === 'italic') {
		match = [variantName, '400', 'italic'];
	}

	if (!match) return null;

	return {
		weight: parseInt(match[1]),
		italic: match[2] === 'italic',
	}

}

export enum SortOptions {
	Alphanumeric = 'alpha',
	Date = 'date',
	Popularity = 'popularity',
	Styles = 'style',
	Trending = 'trending',
}

const api = {
	async list({
		sort = SortOptions.Alphanumeric
	} = {}): Promise<FontDescriptor[]> {
		let { data: { items } } = await client.get('/webfonts', {
			params: {
				key: config.keys.googleFonts,
				sort
			}
		});

		return items.map(f => {
			f.variants = f.variants.map(parseVariant).filter(v => v);
			f.link = null;
			f.loaded = false;

			return f;
		});
	}
};

export default api;
