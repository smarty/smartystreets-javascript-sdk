import { BatchFullError } from "./Errors.js";

export default class Batch {
	lookups: any[];

	constructor() {
		this.lookups = [];
	}

	add(lookup: any): void {
		if (this.lookupsHasRoomForLookup()) this.lookups.push(lookup);
		else throw new BatchFullError();
	}

	lookupsHasRoomForLookup(): boolean {
		const maxNumberOfLookups = 100;
		return this.lookups.length < maxNumberOfLookups;
	}

	length(): number {
		return this.lookups.length;
	}

	getByIndex(index: number): any {
		return this.lookups[index];
	}

	getByInputId(inputId: any): any {
		return this.lookups.filter((lookup) => {
			return lookup.inputId === inputId;
		})[0];
	}

	clear(): void {
		this.lookups = [];
	}

	isEmpty(): boolean {
		return this.length() === 0;
	}
}
