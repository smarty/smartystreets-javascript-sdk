const Request = require("../Request");
const Promise = require("promise");
const Errors = require("../Errors");
const buildInputData = require("../util/buildInputData");

module.exports = (batch, sender, Result, keyTranslationFormat) => {
	if (batch.isEmpty()) throw new Errors.BatchEmptyError;

	let request = new Request();

	if (batch.length() === 1) request.parameters = generateRequestPayload(batch)[0];
	else request.payload = generateRequestPayload(batch);

	return new Promise((resolve, reject) => {
		sender.send(request)
			.then(response => {
				if (response.error) reject(response.error);

				resolve(assignResultsToLookups(batch, response));
			})
			.catch(reject);
	});

	function generateRequestPayload(batch) {
		return batch.lookups.map((lookup) => {
			return buildInputData(lookup, keyTranslationFormat);
		});
	}

	function assignResultsToLookups(batch, response) {
		response.payload.map(rawResult => {
			let result = new Result(rawResult);
			let lookup = batch.getByIndex(result.inputIndex);

			lookup.result.push(result);
		});

		return batch;
	}
};
