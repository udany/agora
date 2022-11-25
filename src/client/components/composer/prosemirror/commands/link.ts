import { Command, EditorState, TextSelection } from 'prosemirror-state';
import { schema } from '../schema';
import { Mark, Node, ResolvedPos } from 'prosemirror-model';

declare type LinkMark = Mark & {
	attrs: {
		href: string,
		title: string
	}
}

const { link } = schema.marks;

const getLinkFromMarks = (marks: readonly Mark[]):LinkMark => marks.find(m => m.type === link) as LinkMark;

const hasSameLink = (index: number, parent: Node, currentLink: Mark) => {
	const tempLink = getLinkFromMarks(parent.child(index).marks);

	return tempLink ? tempLink.attrs.href === currentLink.attrs.href : false;
}

declare type SimpleRange = {
	start: number,
	end: number
}

function getLinkRange(state: EditorState, currentLink: LinkMark, $cursor: ResolvedPos): SimpleRange {
	const { parent } = $cursor;

	// Start looking at the current fragment
	let startIndex = $cursor.index();
	let endIndex = $cursor.indexAfter();

	// Clicked outside edge of tag, go back one
	if (startIndex === parent.childCount) {
		startIndex--;
	}

	// Go towards the start of the parent looking for the boundary
	while (startIndex > 0 && hasSameLink(startIndex-1, parent, currentLink)) {
		startIndex--;
	}

	// Now to the end of the parent looking for the boundary
	while (endIndex < parent.childCount && hasSameLink(endIndex, parent, currentLink)) {
		endIndex++
	}

	let start = $cursor.start();
	let end = start;

	for (let i = 0; i < endIndex; i++) {
		let size = $cursor.parent.child(i).nodeSize;
		if (i < startIndex) start += size;
		end += size;
	}

	return { start, end };
}

export const triggerLink:Command = (state, dispatch) => {
	let {$cursor, ranges} = state.selection as TextSelection;

	if (ranges.length && !$cursor) {
		let {$from, $to} = ranges[0];

		if (link.isInSet($from.marks())) {
			$cursor = $from;
		} else if (link.isInSet($to.marks())) {
			$cursor = $to;
		} else if (state.doc.rangeHasMark($from.pos, $to.pos, link)) {
			let found: number = null;

			state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
				if (found !== null) return false;

				let tempLink = getLinkFromMarks(node.marks);
				if (tempLink) {
					found = pos + node.nodeSize;
				}
			});

			if (found !== null) {
				$cursor = state.doc.resolve(found);
			}
		}
	}

	if ($cursor) {
		// Cursor
		if (link.isInSet($cursor.marks())) {
			// There's already a link
			let currentLink = getLinkFromMarks($cursor.marks());

			const { start, end } = getLinkRange(state, currentLink, $cursor);

			const tr = state.tr;
			tr.setSelection(TextSelection.create(tr.doc, start, end));

			dispatch(tr);

			return true;
		}
	}
}
