"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const authSchema_1 = require("../schemas/authSchema"); // Assuming you have a schema for validation
const User_1 = require("../models/User"); // Assuming you have a User model
const asyncHandler_1 = require("../utility/asyncHandler");
exports.signUp = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield authSchema_1.signUpSchema.parseAsync(req.body);
    const { username, email, password, role } = result;
    const userdata = yield (0, User_1.getUser)(email);
    if (userdata) {
        res.status(400).json({ message: "User already exists", success: false });
        return;
    }
    const hashedPassword = yield (0, User_1.hashUserPassword)(password);
    const createdUser = yield (0, User_1.createUser)({
        username,
        email,
        password: hashedPassword,
        role,
    });
    if (!createdUser) {
        res.status(400).json({ message: "Error while creating user", success: false });
        return;
    }
    const user = yield (0, User_1.getUser)(email);
    res.status(201).json({ message: "User created successfully.", success: true, user: user });
    return;
}));
// Login route handler
exports.login = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, provider } = yield authSchema_1.logInSchema.parseAsync(req.body);
    console.log("sdnkffd  d fuff");
    const user = yield (0, User_1.getUser)(email); // user object without password field
    const UserWithPassword = yield (0, User_1.getUserWithPassword)(email); // user object with password field
    console.log("the password is ", password, UserWithPassword === null || UserWithPassword === void 0 ? void 0 : UserWithPassword.password, user);
    let isPasswordValid;
    if (UserWithPassword) {
        isPasswordValid = yield (0, User_1.comparePassword)(password, UserWithPassword === null || UserWithPassword === void 0 ? void 0 : UserWithPassword.password);
    }
    // if login with form
    if (!provider) {
        if (!user || !isPasswordValid) {
            res.status(400).json({ message: "Invalid Credentials", success: false });
            return;
        }
    }
    else {
        // Login with authO
        if (user && !isPasswordValid) {
            res.status(400).json({ message: "Password does not match", success: false });
            return;
        }
        if (!user) {
            const hashedPassword = yield (0, User_1.hashUserPassword)(password);
            if (!username) {
                res.status(400).json({ message: "Username not provided", success: false });
                return;
            }
            const createdUser = yield (0, User_1.createUser)({
                username,
                email,
                password: hashedPassword,
            });
            if (!createdUser) {
                res.status(400).json({ message: "Error creating user", success: false });
                return;
            }
            res.status(201).json({ message: "User created successfully", success: true });
            return;
        }
    }
    res.status(200).json({ message: "Login successfully", success: true, user });
    return;
}));
