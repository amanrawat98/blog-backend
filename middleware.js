"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessages = "Internal serve Error";
    res.status(errorStatus).json({ message: errorMessages, success: false });
};
exports.errorHandler = errorHandler;
