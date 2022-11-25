import { setBlockType, toggleMark } from 'prosemirror-commands';
import { schema } from '../schema';
import { redo, undo } from 'prosemirror-history';
import { triggerLink } from './link';

export const commands = {
	bold: toggleMark(schema.marks.strong),
	italic: toggleMark(schema.marks.em),
	underline: toggleMark(schema.marks.underline),
	strikethrough: toggleMark(schema.marks.strikethrough),

	paragraph: setBlockType(schema.nodes.paragraph),
	heading: setBlockType(schema.nodes.heading, { level: 2 }),

	link: triggerLink,

	undo: undo,
	redo: redo,
};
