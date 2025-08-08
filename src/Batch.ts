import { BatchFullError } from "./Errors";

export interface Lookup {
	inputId?: string;
	[key: string]: any;
}

/**
 * This class contains a collection of up to 100 lookups to be sent to one of the Smarty APIs<br>
 *     all at once. This is more efficient than sending them one at a time.
 */
export default class Batch {
	public lookups: Lookup[] = [];

	constructor() {
		this.lookups = [];
	}

	add(lookup: Lookup): void {
		if (this.lookupsHasRoomForLookup()) {
			this.lookups.push(lookup);
		} else {
			throw new BatchFullError();
		}
	}

	private lookupsHasRoomForLookup(): boolean {
		const maxNumberOfLookups = 100;
		return this.lookups.length < maxNumberOfLookups;
	}

	length(): number {
		return this.lookups.length;
	}

	getByIndex(index: number): Lookup | undefined {
		return this.lookups[index];
	}

	getByInputId(inputId: string): Lookup | undefined {
		return this.lookups.filter((lookup) => {
			return lookup.inputId === inputId;
		})[0];
	}

	/**
	 * Clears the lookups stored in the batch so it can be used again.<br>
	 *     This helps avoid the overhead of building a new Batch object for each group of lookups.
	 */
	clear(): void {
		this.lookups = [];
	}

	isEmpty(): boolean {
		return this.length() === 0;
	}
}
