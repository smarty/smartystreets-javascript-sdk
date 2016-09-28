var sign = function (options, credentials) {
	var authId = credentials.authId,
		authToken = credentials.authToken;

	options.path = options.path + "?auth-id=" + authId + "&auth-token=" + authToken;

	return options;
};

module.exports = sign;