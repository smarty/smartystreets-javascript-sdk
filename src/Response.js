export class Response {
  constructor(statusCode, payload, error, headers) {
    this.statusCode = statusCode;
    this.payload = payload;
    this.error = error;
    this.headers = headers;
  }
}
