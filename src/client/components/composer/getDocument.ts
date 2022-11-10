export function getDocument() {
	// @ts-ignore
	if (import.meta.env.SSR) {
		const jsdom = require("jsdom");
		const { JSDOM } = jsdom;
		const { window } = new JSDOM(`<!DOCTYPE html><p>Hey</p>`);

		return window.document;
	}

	return window.document;
}
