const chai = require("chai");
const expect = chai.expect;
const CustomHeaderSender = require("../src/CustomHeaderSender");
const Request = require("../src/Request");
const Promise = require("promise");

describe("A custom header sender", function () {
	it ("adds custom headers to the request.", function () {
		function MockSender () {
			this.request;

			this.send = (request) => {
				this.request = request;
			}
		}

		let mockSender = new MockSender();
		let customHeaders = {
			a: "1",
			b: "2",
		};
		let customHeaderSender = new CustomHeaderSender(mockSender, customHeaders);
		let request = new Request();

		customHeaderSender.send(request);

		expect(mockSender.request.headers.hasOwnProperty("a")).to.equal(true);
		expect(mockSender.request.headers.a).to.equal("1");
		expect(mockSender.request.headers.hasOwnProperty("b")).to.equal(true);
		expect(mockSender.request.headers.b).to.equal("2");
	});
});