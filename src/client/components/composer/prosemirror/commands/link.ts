import { Command, TextSelection } from 'prosemirror-state';
import { schema } from '../schema';
import { Mark, Node } from 'prosemirror-model';

export const triggerLink:Command = (state, dispatch) => {
	let {$cursor, ranges} = state.selection as TextSelection;

	const { link } = schema.marks;

	const getLinkFromMarks = (marks: readonly Mark[]) => marks.find(m => m.type === link);

	const hasSameLink = (index: number, parent: Node, currentLink: Mark) => {
		const tempLink = getLinkFromMarks(parent.child(index).marks);

		return tempLink ? tempLink.attrs.href === currentLink.attrs.href : false;
	}

	if ($cursor) {
		// Cursor
		if (link.isInSet($cursor.marks())) {
			// There's already a link
			let currentLink = getLinkFromMarks($cursor.marks());

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

			let startPos = $cursor.start();
			let endPos = startPos;

			for (let i = 0; i < endIndex; i++) {
				let size = $cursor.parent.child(i).nodeSize;
				if (i < startIndex) startPos += size;
				endPos += size;
			}

			console.log({ startPos, endPos });

			const tr = state.tr;
			tr.setSelection(TextSelection.create(tr.doc, startPos, endPos));

			dispatch(tr);

			return true;
		}
	} else if (ranges.length) {
		let {$from, $to} = ranges[0];

		if (state.doc.rangeHasMark($from.pos, $to.pos, link)) {
			return true;
		}
	}

	console.log(state.selection);
}
