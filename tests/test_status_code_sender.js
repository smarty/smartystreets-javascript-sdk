const chai = require("chai");
const expect = chai.expect;
const StatusCodeSender = require("../source/status_code_sender");
const Response = require("../source/response");
const Request = require("../source/request");
const errors = require("../source/errors");

describe("A status code sender", function () {
	it("doesn't attach an error on a 200.", function () {
		let mockSender = {
			send: () => {
				return new Promise((resolve, reject) => {
					resolve(new Response(200));
				});
			}
		};

		let statusCodeSender = new StatusCodeSender(mockSender);
		let request = new Request();

		return statusCodeSender.send(request).then(response => {
			expect(response.error === undefined).to.equal(true);
		});
	});

	it("gives a Bad Credentials error on a 401.", function () {
		let mockSender = generateMockSender(401);
		let statusCodeSender = new StatusCodeSender(mockSender);
		let request = new Request();

		return statusCodeSender.send(request).then(response => {
		}, error => {
			expect(error.error).to.equal(errors.BadCredentialsError);
		})
	});

	it("gives a Payment Required error on a 402.", function () {
		let mockSender = generateMockSender(402);
		let statusCodeSender = new StatusCodeSender(mockSender);
		let request = new Request();

		return statusCodeSender.send(request).then(response => {
		}, error => {
			expect(error.error).to.equal(errors.PaymentRequiredError);
		})
	});
});

function generateMockSender(httpError) {
	return {
		send: () => {
			return new Promise((resolve, reject) => {
				reject(new Response(httpError))
			});
		}
	};
}
