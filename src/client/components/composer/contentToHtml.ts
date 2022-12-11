import { DOMSerializer, Node } from 'prosemirror-model';
import { schema } from './prosemirror';

export function contentToHtml(content, document: Document) {
	let serializer = DOMSerializer.fromSchema(schema);

	const html = serializer.serializeFragment(Node.fromJSON(schema, content).content, { document });

	let div = document.createElement('div');
	div.appendChild(html);

	return div.innerHTML;
}
