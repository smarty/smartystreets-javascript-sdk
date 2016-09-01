var https = require("https");

var sender = function () {};

sender.prototype.send = function () {
	var options = {
		hostname: "api.smartystreets.com",
		path: "/street-address?",
		method: "POST"
	};

	return new Promise((resolve, reject) => {
		var body = [];
		var request = https.request(options, (response) => {
			if (response.statusCode != 200) {
				reject(response.statusCode);
			}

			response.on("data", (data) => resolve(data.toString()));
		});
		// request.on("end", () => resolve(body.join('')));
		request.end()
		request.on("error", (err) => reject(err));
	});
};

var apiRequest = function () {};

module.exports = sender;