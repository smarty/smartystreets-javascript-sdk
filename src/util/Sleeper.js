class Sleeper {
	constructor () {}
	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

module.exports = Sleeper;