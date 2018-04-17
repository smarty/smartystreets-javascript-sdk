const fs = require("fs");
const distFolder = __dirname + "/dist";

fs.mkdir(distFolder, distFolderExists);

function distFolderExists(error) {
	if (error) throw error;

	const filePrefix = "smartystreets-sdk-";
	const version = require("./package.json").version;
	const fileName = distFolder + "/" + filePrefix + version;
	const minifiedFile = fileName + ".min.js";
	const standardFile = fileName + ".js";
	const sdkEntryPoint = "./index.js";
	const standaloneVariableName = "SmartyStreetsSDK";
	const options = {
		standalone: standaloneVariableName,
	};

	let writeToDisk = (destination) => fs.createWriteStream(destination);
	let browserify = require("browserify");

	browserify(sdkEntryPoint, options)
		.transform("babelify", {presets: ["env"]})
		.bundle()
		.pipe(writeToDisk(standardFile));

	browserify(sdkEntryPoint, options)
		.transform("babelify", {presets: ["env"]})
		.plugin("tinyify")
		.bundle()
		.pipe(writeToDisk(minifiedFile));
}
