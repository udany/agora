import { DOMSerializer, Node } from 'prosemirror-model';
import { schema } from './prosemirror';
import { getDocument } from './getDocument';

export function contentToHtml(content) {
	let document = getDocument();
	let serializer = DOMSerializer.fromSchema(schema);

	const html = serializer.serializeFragment(Node.fromJSON(schema, content).content, { document });

	let div = document.createElement('div');
	div.appendChild(html);

	return div.innerHTML;
}
