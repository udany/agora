import { Plugin } from 'prosemirror-state';

export function TabIndexPlugin(index) {
	return new Plugin({
		view(view) {
			view.dom.setAttribute('tabindex', index);

			return {};
		}
	});
}
