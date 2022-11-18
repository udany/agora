/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly CLIENT_BASE_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
