/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly CLIENT_BASE_URL: string
	readonly GOOGLE_FONT_KEY: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
