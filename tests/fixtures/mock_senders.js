const Promise = require("promise");
const Response = require("../../src/Response");

module.exports = {
	MockSender: function () {
		let request = {
			payload: undefined,
			parameters: undefined,
		};
		this.request = request;

		this.send = function (clientRequest) {
			request.payload = clientRequest.payload;
			request.parameters = clientRequest.parameters;
		}
	},
	MockSenderWithResponse: function (expectedPayload, expectedError) {
		this.send = function () {
			return new Promise((resolve, reject) => {
				resolve(new Response("", expectedPayload, expectedError));
			});
		}
	},
};