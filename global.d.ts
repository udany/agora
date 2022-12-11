import 'udany-toolbox/extend/global';

declare global {
	interface Crypto {
		randomUUID: () => string;
	}
}
