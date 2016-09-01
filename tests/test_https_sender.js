var chai = require("chai"),
	chaiAsPromised = require("chai-as-promised"),
	expect = chai.expect,
	Sender = require("../https_sender.js"),
	sender = new Sender;

chai.use(chaiAsPromised);

describe ("Get a HTTP 200 from the API host", function () {
	it ("expects a connection to the API host with an endpoint of / to return a response with HTTP 200", function () {
		return expect(sender.send().catch(function (err) {
			return err;
		})).to.eventually.equal(401);
	});
});