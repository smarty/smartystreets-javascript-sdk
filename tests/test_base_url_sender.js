const chai = require("chai");
const expect = chai.expect;
const BaseUrlSender = require("../source/base_url_sender");
const Request = require("../source/request");
const Promise = require("promise");

describe("A Base Url Sender", function () {
	it("replaces the request's base url with a new value.", function () {
		let innerSender = {
			send: function () {
				return true;
			}
		};
		let request = new Request();
		let urlOverride = "I'm in your base, killing your mans.";
		let baseUrlSender = new BaseUrlSender(urlOverride, innerSender);

		request.baseUrl = "All your baseUrl are belong to us.";
		baseUrlSender.send(request);

		expect(request.baseUrl).to.equal(urlOverride);
	});

	it("returns a promise.", function () {
		let mockInnerSender = {
			send: (request) => {
				return new Promise((resolve, reject) => {
					resolve(true);
				});
			}
		};
		let request = new Request();
		let urlOverride = "Extra crispy.";
		let baseUrlSender = new BaseUrlSender(urlOverride, mockInnerSender);

		expect(baseUrlSender.send(request) instanceof Promise).to.equal(true);
	});
});