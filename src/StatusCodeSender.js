import {
  DefaultError,
  GatewayTimeoutError,
  InternalServerError,
  ServiceUnavailableError,
} from "./Errors.js";

export class StatusCodeSender {
  constructor(innerSender) {
    this.sender = innerSender;
  }

  send(request) {
    return new Promise((resolve, reject) => {
      this.sender
        .send(request)
        .then(resolve)
        .catch((error) => {
          switch (error.statusCode) {
            case 500:
              error.error = new InternalServerError();
              break;

            case 503:
              error.error = new ServiceUnavailableError();
              break;

            case 504:
              error.error = new GatewayTimeoutError();
              break;

            default:
              error.error = new DefaultError(
                error &&
                  error.payload &&
                  error.payload.errors[0] &&
                  error.payload.errors[0].message,
              );
          }
          reject(error);
        });
    });
  }
}
