"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const zod_1 = require("zod");
const ErrorHandler = (error, res) => {
    console.log("i m here");
    console.log("error are", error);
    if (error instanceof zod_1.z.ZodError) {
        const errors = error.errors;
        // const errorMessages = errors?.map((item) => ({ error: item.message }));
        res.status(400).json({ message: "Validation Error", success: false, error: errors });
        return;
    }
    console.error(error);
    res.status(400).json({ message: "Internal Server Error", success: false });
    return;
};
exports.ErrorHandler = ErrorHandler;
