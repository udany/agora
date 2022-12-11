import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@fortawesome/vue-fontawesome';
import fontAwesomePlugin from 'udany-toolbox/vue/ui/FontAwesome/plugin.ts';

import {
    faTimes,
	faQuestion,
	faCheck,
	faExclamation,
	faAngleRight,
	faPencilAlt,
	faKey,

	faFont,
	faBold,
	faItalic,
	faUnderline,
	faStrikethrough,
	faHeading,
	faParagraph,
	faQuoteLeft,
	faLink,
	faTrash,

	faUser,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

export default function (app) {
	config.autoAddCss = false;
	fontAwesomePlugin(app, [
		faTimes,
		faQuestion,
		faCheck,
		faExclamation,
		faAngleRight,
		faPencilAlt,
		faKey,

		faFont,
		faBold,
		faItalic,
		faUnderline,
		faStrikethrough,
		faHeading,
		faParagraph,
		faQuoteLeft,
		faLink,
		faTrash,

		faUser,
		faSignOutAlt,
	])
}
