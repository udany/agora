import { EditorState, Plugin, Transaction } from 'prosemirror-state';
import { Node } from 'prosemirror-model';

const attrName = "id";
const nodeNeedsId = (node: Node) => {
	return node.type.spec?.attrs?.id && !node.attrs[attrName]
};

export function IdPlugin() {
	return new Plugin({
		appendTransaction(transactions: readonly Transaction[], oldState: EditorState, newState: EditorState) {
			const tr = newState.tr;
			let modified = false;

			if (transactions.some((transaction) => transaction.docChanged)) {
				// Adds a unique id to a node
				newState.doc.descendants((node, pos) => {
					if (nodeNeedsId(node)) {
						const attrs = node.attrs;

						tr.setNodeMarkup(pos, undefined, {...attrs, [attrName]: crypto.randomUUID()});
						modified = true;
					}
				});
			}

			return modified ? tr : null;
		}
	});
}
