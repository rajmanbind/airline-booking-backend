

class AppError extends Error {
  statusCode: number;
  explanation: string[];

  constructor(message:string[], statusCode = 500) {
    const messageStr = Array.isArray(message) ? message.join("; ") : message;
    super(messageStr);
    this.statusCode = statusCode;
    this.explanation = message;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export { AppError };