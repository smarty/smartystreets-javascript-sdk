export default class Sleeper {
	constructor () {}
	sleep(seconds: number) {
		return new Promise<void>((resolve)  => setTimeout(resolve, seconds*1000));
	}
}