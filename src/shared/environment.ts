export enum Environment {
	development = 'development',
	production = 'production'
}

export type EnvironmentKey = keyof typeof Environment;
