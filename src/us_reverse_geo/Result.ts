import type { CoordinateLicense } from "../us_street/Candidate.js";

export interface ReverseGeoAddress {
	street: string | undefined;
	city: string | undefined;
	stateAbbreviation: string | undefined;
	zipcode: string | undefined;
	source: string | undefined;
	smartyKey: string | undefined;
}

export interface ReverseGeoCoordinate {
	latitude: number | undefined;
	longitude: number | undefined;
	accuracy: string | undefined;
	license: CoordinateLicense | undefined;
}

interface RawReverseGeoAddress {
	street?: string;
	city?: string;
	state_abbreviation?: string;
	zipcode?: string;
	source?: string;
	smarty_key?: string;
}

interface RawReverseGeoCoordinate {
	latitude?: number;
	longitude?: number;
	accuracy?: string;
	license?: number;
}

export interface RawReverseGeoResult {
	distance?: number;
	address?: RawReverseGeoAddress;
	coordinate?: RawReverseGeoCoordinate;
}

export default class Result {
	distance: number;
	address: ReverseGeoAddress;
	coordinate: ReverseGeoCoordinate;

	constructor(responseData: RawReverseGeoResult) {
		this.distance = responseData.distance ?? 0;

		this.address = {} as ReverseGeoAddress;
		if (responseData.address) {
			this.address.street = responseData.address.street;
			this.address.city = responseData.address.city;
			this.address.stateAbbreviation = responseData.address.state_abbreviation;
			this.address.zipcode = responseData.address.zipcode;
			this.address.source = responseData.address.source;
			this.address.smartyKey = responseData.address.smarty_key;
		}

		this.coordinate = {} as ReverseGeoCoordinate;
		if (responseData.coordinate) {
			this.coordinate.latitude = responseData.coordinate.latitude;
			this.coordinate.longitude = responseData.coordinate.longitude;
			this.coordinate.accuracy = responseData.coordinate.accuracy;
			switch (responseData.coordinate.license) {
				case 1:
					this.coordinate.license = "SmartyStreets Proprietary";
					break;
				default:
					this.coordinate.license = "SmartyStreets";
			}
		}
	}
}
