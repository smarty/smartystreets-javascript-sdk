export default abstract class EnrichmentLookupBase {
	include: string | undefined;
	exclude: string | undefined;
	requestEtag: string | undefined;
	responseEtag: string | undefined;
	customParameters: Record<string, string>;

	constructor() {
		this.customParameters = {};
	}

	addCustomParameter(key: string, value: string): void {
		this.customParameters[key] = value;
	}
}
