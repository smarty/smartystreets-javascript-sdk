class FakeSleeper {
	constructor() {
		this.sleepDurations = [];
	}
	sleep(ms) {
		this.sleepDurations.push(ms);
		// return new Promise(resolve => setTimeout(resolve, ms));
	}
}

module.exports = FakeSleeper;