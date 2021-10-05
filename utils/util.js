module.exports = class Util {
  constructor() {
    this.statusCode = null;
    this.status = null;
    this.error = null;
    this.message = null;
    this.stack = null;
  }

  setError(err, message, statusCode) {
    this.statusCode = statusCode ? statusCode : 400;
    this.status = `${statusCode}`.startsWith("4") ? "failed" : "error";
    if (err !== null) {
      if (process.env.NODE_ENV === "development") {
        this.error = err;
        this.stack = err.stack;
      }
      if (err.code === 11000) {
        const value = err.errmsg.match(/{([^}]*)}/)[0];
        this.message = `Duplicate field value: ${value}. Please use another value!`;
        return;
      }
      if (err.name === "CastError") {
        this.message = `Invalid ${err.path}: ${err.value}.`;
        return;
      }
    }
    this.message = message || "Something went wrong ...";
  }

  setSuccess(message, statusCode, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.status = "success";
  }

  send(res) {
    const result = {
      status: this.status,
      message: this.message,
      data: this.data,
    };
    if (this.status === "success") {
      return res.status(this.statusCode).json(result);
    } else if (
      this.status !== "success" &&
      process.env.NODE_ENV === "development"
    ) {
      return res.status(this.statusCode).json({
        status: this.status,
        error: this.error,
        message: this.message,
        stack: this.stack,
      });
    } else {
      return res.status(this.statusCode).json({
        status: this.status,
        message: this.message,
      });
    }
  }
};
