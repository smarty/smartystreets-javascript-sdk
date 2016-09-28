var chai = require("chai"),
	chaiAsPromised = require("chai-as-promised"),
	expect = chai.expect,
	send = require("../internal/https_sender"),
	credentials = {
		authId: process.env.SMARTYSTREETS_AUTH_ID,
		authToken: process.env.SMARTYSTREETS_AUTH_TOKEN
	};

chai.use(chaiAsPromised);

describe ("Test connections to the API server", function () {
	it ("expects a POST to the API with an endpoint of / to return a HTTP 405", function () {
		return expect(send({}, [], {
			hostname: "api.smartystreets.com",
			path: "/"
		}).catch(function (err) {
			return err;
		})).to.eventually.equal(405);
	});

	it ("expects a POST to the API with a valid endpoint to return a HTTP 401 without valid credentials", function () {
		return expect(send({}, [], {
			hostname: "api.smartystreets.com",
			path: "/street-address"
		}).catch(function (err) {
			return err;
		})).to.eventually.equal(401);
	});

	it ("expects a POST to the api with a valid endpoint, valid credentials, and an empty payload to return an empty array", () => {
		var options = {
			hostname: "api.smartystreets.com",
			path: "/street-address"
		};

		return expect(send(credentials, [{}], options).catch((err) => {
			return err;
		})).to.eventually.equal("[]\n");
	});

	it ("expects a POST to the api with a valid enpoint, valid credentials, and a valid payload to return a HTTP 200", () => {
		var options = {
			hostname: "api.smartystreets.com",
			path: "/street-address"
		},
		lookup = {
			street: "110 Pasito Terrace",
			secondary: "Apt 217",
			city: "Sunnyvale",
			state: "California",
			zipcode: "94086"
		};

		var lookupGroup = [];

		for (var i = 0; i < 10; i++) {
			lookupGroup.push(lookup);
		}

		return expect(send(credentials, lookupGroup, options).catch((err) => {
			return err;
		})).to.eventually.have.lengthOf(8842);
	});
});