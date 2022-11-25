import { baseKeymap } from 'prosemirror-commands';
import { commands } from './index';
import { triggerLink } from './link';

export const customKeymap = {
	...baseKeymap,
	"Mod-b": commands.bold,
	"Mod-i": commands.italic,
	"Mod-u": commands.underline,
	"Mod-/": commands.strikethrough,
	"Mod-k": triggerLink,
	"Mod-h": commands.heading,
	"Mod-Shift-z": commands.redo,
	"Mod-z": commands.undo,
	"Mod-y": commands.redo,
}
