const fs = require("fs");
const zlib = require("zlib");

let AWS = require("aws-sdk");
const credentials = {
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY,
};
AWS.config.update(credentials);

const s3Stream = require("s3-upload-stream")(new AWS.S3());
const filesToUpload = __dirname + "/dist/*.min.js";

let read = fs.createReadStream(filesToUpload);
let compress = zlib.createGzip();
let upload = s3Stream.upload({
	Bucket: "",
	Key: "",
	ACL: "",
	StorageClass: "",
	ContentType: "",
});

upload.on("error", e => {
	throw new e
});
upload.on("part", console.log);
upload.on("uploaded", console.log);

read
	.pipe(compress)
	.pipe(upload);