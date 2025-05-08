export default class Sleeper {
	constructor () {}
	sleep(seconds: number) {
		return new Promise<void>((resolve: () => void)  => setTimeout(resolve, seconds*1000));
	}
}