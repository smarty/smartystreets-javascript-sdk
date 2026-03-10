import { BatchFullError } from "./Errors.js";
import { BaseLookup } from "./types.js";

export default class Batch {
	lookups: BaseLookup[];

	constructor() {
		this.lookups = [];
	}

	add(lookup: BaseLookup): void {
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

	getByIndex(index: number): BaseLookup {
		return this.lookups[index];
	}

	getByInputId(inputId: string | number): BaseLookup | undefined {
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
