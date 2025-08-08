export default class Lookup {
	public country?: string;
	public freeform?: string;
	public address1?: string;
	public address2?: string;
	public address3?: string;
	public address4?: string;
	public organization?: string;
	public locality?: string;
	public administrativeArea?: string;
	public postalCode?: string;
	public geocode?: string;
	public language?: string;
	public result: any[] = [];
	public customParameters: Record<string, any> = {};

	constructor(country?: string, freeform?: string) {
		this.country = country;
		this.freeform = freeform;
	}

	addCustomParameter(key: string, value: any): void {
		this.customParameters[key] = value;
	}

	ensureEnoughInfo = (): boolean => {
		if (!this || !this.country)
			throw new (require("../Errors").UnprocessableEntityError)("Country field is required.");
		if (!this.freeform && !this.address1) {
			throw new (require("../Errors").UnprocessableEntityError)(
				"Either freeform or address1 is required.",
			);
		}

		if (
			!this.freeform &&
			!(this.address1 && (this.postalCode || (this.locality && this.administrativeArea)))
		) {
			throw new (require("../Errors").UnprocessableEntityError)(
				"Insufficient information: One or more required fields were not set on the lookup.",
			);
		}
		return true;
	};

	ensureValidData = (): boolean => {
		if (this.geocode && this.geocode !== "true") {
			throw new (require("../Errors").UnprocessableEntityError)(
				"Invalid input: geocode can only be set to 'true' (default is 'false'.",
			);
		}
		if (this.language && this.language !== "latin" && this.language !== "native") {
			throw new (require("../Errors").UnprocessableEntityError)(
				"Invalid input: language can only be set to 'latin' or 'native'. When not set, the the output language will match the language of the input values.",
			);
		}
		return true;
	};
}
