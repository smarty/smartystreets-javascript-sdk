export default class Lookup {
	public text: string;
	public html?: boolean | number;
	public aggressive?: boolean | number;
	public addressesHaveLineBreaks?: boolean | number;
	public addressesPerLine?: number;
	public result: any = [];
	public customParameters: Record<string, any> = {};

	constructor(text: string) {
		this.text = text;
	}

	addCustomParameter(key: string, value: any): void {
		this.customParameters[key] = value;
	}
}
