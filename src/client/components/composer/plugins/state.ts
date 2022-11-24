import { reactive } from 'vue';
import { EditorState, Plugin, TextSelection } from 'prosemirror-state';
import { MarkType, Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { useEventListener } from '@vueuse/core';
import { schema } from '../prosemirror';

declare type Position = { x: number, y: number};
declare type Rectangle = Position & { w: number, h: number };
export declare type ProseMirrorState = {
	content: Object,

	selected: boolean,
	selection: object,

	currentNode: Node,
	marksToggled: string[],



	area: Rectangle,
	start: number,
	end: number,

	plugin(): Plugin
}

export function useState():ProseMirrorState {
	let lastState: EditorState = null;

	function updateSelection(view: EditorView) {
		const { state } = view;

		editorState.selection = state.selection;

		// Hide the tooltip if the selection is empty
		if (state.selection.empty) {
			editorState.selected = false;
			return;
		}

		editorState.selected = true;

		let {from, to} = state.selection
		// These are in screen coordinates
		let start = view.coordsAtPos(from), end = view.coordsAtPos(to);

		editorState.start = from;
		editorState.end = to;

		editorState.area = {
			x: start.left,
			y: start.top,
			w: end.left - start.left,
			h: end.bottom - start.top,
		};
	}

	function hasMark(view: EditorView, mark: MarkType) {
		const { state } = view;

		let {$cursor, ranges} = state.selection as TextSelection;

		if ($cursor) {
			if (mark.isInSet(state.storedMarks || $cursor.marks()))
				return true;
		} else {
			let has = false, tr = state.tr;

			for (let i = 0; !has && i < ranges.length; i++) {
				let {$from, $to} = ranges[i]
				if (state.doc.rangeHasMark($from.pos, $to.pos, mark)) {
					return true;
				}
			}
		}

		return false;
	}

	function updateMarks(view: EditorView) {
		let marks = schema.marks;
		let marksToggled = [];

		for (let key of Object.keys(marks)) {
			let mark = marks[key];
			if (hasMark(view, mark)) {
				marksToggled.push(key);
			}
		}

		editorState.marksToggled = marksToggled;
	}

	function updateNode(view: EditorView) {
		const { state } = view;

		let { $anchor } = state.selection as TextSelection;

		editorState.currentNode = $anchor.node();
	}

	function update(view: EditorView) {
		const { state } = view;

		updateMarks(view);
		updateNode(view);

		// Don't do anything if the document/selection didn't change
		if (!lastState || !lastState.doc.eq(state.doc)) {
			if (!lastState?.selection.eq(state.selection)) {
				updateSelection(view);
			}

			// Update last processed state
			lastState = state;

			editorState.content = view.state.doc.toJSON();
		}
	}

	let editorState = reactive<ProseMirrorState>({
		content: {},
		selected: false,
		selection: null,

		marksToggled: [],
		currentNode: null,

		area: { x: 0, y: 0, w: 0, h: 0 },
		start: 0,
		end: 0,

		plugin(): Plugin {
			return new Plugin({
				view: (view) => ({
					update() {
						update(view);
					}
				})
			})
		}
	});

	if (!import.meta.env.SSR) {
		useEventListener(document, 'selectionchange', async () => {
			const docSelection = window.getSelection();

			if (docSelection.isCollapsed) {
				editorState.selected = false;
			}
		});
	}

	return editorState;
}
