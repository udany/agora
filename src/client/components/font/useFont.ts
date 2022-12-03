import { onBeforeUnmount, reactive, watch } from 'vue';
import { FontDescriptor, googleFontsService } from './googleFonts';

let idCounter = 0;

declare type UserId = number|string;

const fontUsers = {
	map: {},

	use(font: FontDescriptor, id: UserId) {
		this.map[font.family] = (this.map[font.family] || []).unique(true);

		this.map[font.family].push(id);
	},

	unuse(font: FontDescriptor, id: UserId) {
		if (!this.map[font.family]) return;

		this.map[font.family].remove(id);
	},

	inUse(font: FontDescriptor) {
		if (!this.map[font.family]) return false;

		return !!this.map[font.family].length;
	}
};

declare type UseFontOptions = {
	font?: FontDescriptor|string,
	id?: UserId
};

export function useFont({
	font = null,
	id = null
}: UseFontOptions = {}) {
	const load = async (font: FontDescriptor|string) => {
		if (!font) return;

		if (typeof font === 'string') {
			font = await googleFontsService.getFont(font);
		}

		state.font = font;
		fontUsers.use(font, state.id);

		if (state.font.loaded) {
			state.loaded = true;
		} else {
			state.loaded = false;

			await googleFontsService.load(state.font);
			state.loaded = true;
		}
	};

	const unload = (font) => {
		if (typeof font === 'string') return;

		fontUsers.unuse(font, state.id);
		state.loaded = false;

		if (!fontUsers.inUse(font)) {
			googleFontsService.unload(font);
		}
	};

	const state = reactive({
		id: id || idCounter++,
		font: null as FontDescriptor,
		loaded: false,
		load,
		unload: () => unload(state.font)
	});

	onBeforeUnmount(() => {
		unload(state.font);
	});

	if (font) load(font);

	return state;
}
