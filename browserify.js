const fs = require("fs");
const distFolder = __dirname + "/dist";

fs.mkdir(distFolder, distFolderExists);

function distFolderExists(error) {
	if (error) throw error;

	const filePrefix = "smartystreets-sdk-";
	const version = require("./package.json").version;
	const minifiedFile = distFolder + "/" + filePrefix + version + ".min.js";
	const sdkEntryPoint = "./index.js";
	const standaloneVariableName = "SmartyStreetsSDK";
	const options = {
		plugin: [
			"tinyify",
		],
		standalone: standaloneVariableName,
	};

	let writeToDisk = fs.createWriteStream(minifiedFile);
	let browserify = require("browserify");

	browserify(sdkEntryPoint, options)
		.transform("babelify", {presets: ["env"]})
		.bundle()
		.pipe(writeToDisk);
}
