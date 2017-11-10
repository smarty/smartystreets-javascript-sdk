class SmartyError extends Error {
	constructor (message) {
		super(message);
	}
}

class BatchFullError extends SmartyError {
	constructor () {
		super("A batch can contain a max of 100 lookups.");
	}
}

module.exports = {
	BatchFullError: BatchFullError
};