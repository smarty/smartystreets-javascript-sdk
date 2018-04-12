const fs = require("fs");
const version = require("./package.json").version;
const distFolder = __dirname + "/dist";
const filePrefix = "smartystreets-sdk-";
const minifiedFile = distFolder + "/" + filePrefix + version + ".js";
const sdkEntryPoint = "./index.js";
const standaloneVariableName = "SmartyStreetsSDK";

const options = {
	plugin: [
		"tinyify",
	],
	standalone: standaloneVariableName,
};

fs.mkdir(distFolder, handleError);

let writeToDisk = fs.createWriteStream(minifiedFile);

let browserify = require("browserify")(sdkEntryPoint, options);

browserify.bundle()
	.pipe(writeToDisk);

function handleError(error) {
	if (error) throw error;
}
