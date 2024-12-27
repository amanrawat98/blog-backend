"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, "username must be at least 3 characters"),
    email: zod_1.z.string().trim().min(1, "Email cannot be empty").email("Invalid email"),
    password: zod_1.z.string({ required_error: "password is required" }).min(4, "password be at least 4 digits"),
    role: zod_1.z.enum(["reader", "author", "admin"]),
});
exports.logInSchema = zod_1.z.object({
    email: zod_1.z.string().trim().min(1, "Email cannot be empty").email("Invalid email"),
    password: zod_1.z.string({ required_error: "password is required" }).min(4, "password be at least 4 digits"),
    provider: zod_1.z.string().optional(),
    username: zod_1.z.string().min(3, "username must be at least 3 characters").optional(),
});
