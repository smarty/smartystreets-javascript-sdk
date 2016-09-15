var chai = require("chai"),
	chaiAsPromised = require("chai-as-promised"),
	expect = chai.expect,
	Sender = require("../internal/https_sender.js"),
	sender = new Sender;

chai.use(chaiAsPromised);

describe ("Test connections to the API server", function () {
	it ("expects a POST to the API with an endpoint of / to return a HTTP 405", function () {
		return expect(sender.send({
			hostname: "us-street.api.smartystreets.com",
			path: "/"
		}).catch(function (err) {
			return err;
		})).to.eventually.equal(405);
	});

	it ("expects a POST to the API with a valid endpoint to return a HTTP 400 without valid credentials", function () {
		return expect(sender.send({
			hostname: "us-street.api.smartystreets.com",
			path: "/street-address"
		}).catch(function (err) {
			return err;
		})).to.eventually.equal(401);
	});

	// it ("expects a connection to the API")
});
