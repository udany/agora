import { Schema, MarkSpec, DOMOutputSpec } from "prosemirror-model";
import { marks, nodes } from "prosemirror-schema-basic";

const schema = new Schema({
	marks: {
		...marks,
		underline: {
			parseDOM: [{tag: "u"}, {style: "text-decoration=underline"}],
			toDOM() { return ["u", 0] as DOMOutputSpec }
		} as MarkSpec,
		strikethrough: {
			parseDOM: [{tag: "s"}, {style: "text-decoration=line-through"}],
			toDOM() { return ["s", 0] as DOMOutputSpec }
		} as MarkSpec,
	},
	nodes: nodes
})

export {
	schema
}
