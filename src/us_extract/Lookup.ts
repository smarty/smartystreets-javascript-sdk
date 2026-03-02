export default class Lookup {
	result: Record<string, any>;
	text: string;
	html: boolean | undefined;
	aggressive: boolean | undefined;
	addressesHaveLineBreaks: boolean | undefined;
	addressesPerLine: number | undefined;
	customParameters: Record<string, any>;

	constructor(text: string) {
		this.result = {
			meta: {},
			addresses: [],
		};
		this.text = text;
		this.html = undefined;
		this.aggressive = undefined;
		this.addressesHaveLineBreaks = undefined;
		this.addressesPerLine = undefined;
		this.customParameters = {};
	}

	addCustomParameter(key: string, value: any): void {
		this.customParameters[key] = value;
	}
}
