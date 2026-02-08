

class AppError extends Error {
  statusCode: number;
  explanation:string| string[];

  constructor(message:string|string[], statusCode = 500) {
    const messageStr = Array.isArray(message) ? message.join("; ") : message;
    super(messageStr);
    this.statusCode = statusCode;
    // Normalize explanation to an array for consistent handling
    this.explanation = Array.isArray(message) ? message : [messageStr];
    // Set the error name for easier detection
    this.name = 'AppError';

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export { AppError };