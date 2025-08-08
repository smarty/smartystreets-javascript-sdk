export default class MockSleeper {
	sleepDurations: number[];
	constructor() {
		this.sleepDurations = [];
	}
	sleep(ms: number) {
		this.sleepDurations.push(ms);
	}
}
