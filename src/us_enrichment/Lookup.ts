export default class Lookup {
	smartyKey: string | undefined;
	include: string | undefined;
	exclude: string | undefined;
	dataset: string | undefined;
	dataSubset: string | undefined;
	features: string | undefined;
	response: Record<string, any>;
	customParameters: Record<string, any>;

	constructor(
		smartyKey?: string,
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
		this.features = undefined;

		this.response = {};
		this.customParameters = {};
	}

	addCustomParameter(key: string, value: any): void {
		this.customParameters[key] = value;
	}
}
