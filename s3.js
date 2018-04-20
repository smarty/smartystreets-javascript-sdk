const fs = require("fs");
const zlib = require("zlib");
const version = require("./package").version;
const credentials = {
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY,
};

let AWS = require("aws-sdk");
AWS.config.update(credentials);

const S3Stream = require("s3-upload-stream");
const fileName = "smartystreets-sdk-" + version;
const basePath = __dirname + "/dist/";

[".js", ".min.js"].map(fileExtension => uploadFileToS3(basePath, fileName + fileExtension));

function uploadFileToS3(filePath, fileName) {
	let s3Stream = S3Stream(new AWS.S3());
	let read = fs.createReadStream(filePath + fileName);
	let compress = zlib.createGzip();
	let upload = s3Stream.upload({
		Bucket: "static.smartystreets.com",
		Key: "sdk/" + version + "/" + fileName,
		StorageClass: "STANDARD",
		ContentType: "application/javascript",
		ContentEncoding: "gzip",
	});

	upload.on("error", e => {
		throw new e
	});
	upload.on("part", console.log);
	upload.on("uploaded", console.log);

	read
		.pipe(compress)
		.pipe(upload);
}