class Sleeper {
	constructor () {}
	sleep(seconds: number) {
		return new Promise(resolve => setTimeout(resolve, seconds*1000));
	}
}

module.exports = Sleeper;