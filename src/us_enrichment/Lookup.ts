export default class Lookup {
	public smartyKey: string;
	public include?: string;
	public exclude?: string;
	public dataset?: string;
	public dataSubset?: string;
	public response: any = {};
	public customParameters: Record<string, any> = {};

	constructor(
		smartyKey: string,
		include?: string,
		exclude?: string,
		dataset?: string,
		dataSubset?: string,
	) {
		this.smartyKey = smartyKey;
		this.include = include;
		this.exclude = exclude;
		this.dataset = dataset;
		this.dataSubset = dataSubset;
	}

	addCustomParameter(key: string, value: any): void {
		this.customParameters[key] = value;
	}
}
