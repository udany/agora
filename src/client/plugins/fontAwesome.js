import '@fortawesome/fontawesome-svg-core'
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
} from '@fortawesome/free-solid-svg-icons'

export default function (app) {
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
	])
}
