const {buildSmartyResponse} = require("../../src/util/buildSmartyResponse.js");
const Response = require("../../src/Response");

module.exports = {
	MockSender: function () {
		let request = {
			payload: undefined,
			parameters: undefined,
			baseUrlParam: undefined,
		};
		this.request = request;

		this.send = function (clientRequest) {
			request.payload = clientRequest.payload;
			request.parameters = clientRequest.parameters;
			request.baseUrlParam = clientRequest.baseUrlParam;
		}
	},
	MockSenderWithResponse: function (expectedPayload, expectedError) {
		this.send = function () {
			return new Promise((resolve, reject) => {
				resolve(new Response("", expectedPayload, expectedError));
			});
		}
	},
	MockSenderWithStatusCodesAndHeaders: function (statusCodes, headers = undefined, error = undefined) {
		this.statusCodes = statusCodes;
		this.headers = headers;
		this.error = error;
		this.currentStatusCodeIndex = 0;

		this.send = function (request) {
			let mockResponse = {
				status: this.statusCodes[this.currentStatusCodeIndex],
				headers: this.headers,
				error: this.error,
			};
			const response = buildSmartyResponse(mockResponse);
			this.currentStatusCodeIndex += 1;
			return response;
		}
	}
};
