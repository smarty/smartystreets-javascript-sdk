class MockSleeper {
	constructor() {
		this.sleepDurations = [];
	}
	sleep(ms) {
		this.sleepDurations.push(ms);
	}
}

module.exports = MockSleeper;