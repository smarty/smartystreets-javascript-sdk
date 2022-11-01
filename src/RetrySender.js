class RetrySender {
	constructor(maxRetires = 5, inner, sleeper) {
		this.maxRetries = maxRetires;
		this.statusToRetry = [408, 429, 500, 502, 503, 504];
		this.statusTooManyRequests = 429;
		this.maxBackoffDuration = 10;
		this.inner = inner;
		this.sleeper = sleeper;
	}

	async send(request) {
		let response = this.inner.send(request);

		for (let i = 0; i < this.maxRetries; i++) {

			if (!this.statusToRetry.includes(parseInt(response.statusCode))) {
				break;
			}

			if (parseInt(response.statusCode) === this.statusTooManyRequests) {
				let secondsToBackoff = 10;
				if(response.headers) {
					if (parseInt(response.headers["Retry-After"])) {
						secondsToBackoff = parseInt(response.headers["Retry-After"]);
					}
				}
				await this.rateLimitBackOff(secondsToBackoff)
			} else {
				await this.backoff(i)
			}
			response = this.inner.send(request);
		}

		return response;
	};

	async backoff(attempt) {
		const backoffDuration = Math.min(attempt, this.maxBackoffDuration);
		console.log(`There was an error processing the request. Retrying in ${backoffDuration} seconds...`);
		await this.sleeper.sleep(backoffDuration);
	};

	async rateLimitBackOff(backoffDuration) {
		console.log(`Rate limit reached. Retrying in ${backoffDuration} seconds...`);
		await this.sleeper.sleep(backoffDuration);
	};
}

module.exports = RetrySender;