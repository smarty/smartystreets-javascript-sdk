class FakeSleeper {
	constructor() {
		this.sleepDurations = [];
	}
	sleep(ms) {
		const seconds = ms/1000;
		this.sleepDurations.push(seconds);
		// return new Promise(resolve => setTimeout(resolve, ms));
	}
}

module.exports = FakeSleeper;