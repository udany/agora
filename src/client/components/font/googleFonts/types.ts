export declare type FontVariant = {
	weight: number;
	italic: boolean;
}

export declare type FontCategory = {
	name: string;
	code: string;
}

export declare type FontSubset = {
	name: string;
	code: string;
}

export declare type FontDescriptor = {
	family: string;
	variants: FontVariant[];
	subsets: FontSubset[],
	category: string,
	link: HTMLLinkElement,
	loaded: boolean
}
