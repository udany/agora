import 'udany-toolbox/extend/global';
import '@types/css-font-loading-module';

declare global {
	interface Crypto {
		randomUUID: () => string;
	}
}
