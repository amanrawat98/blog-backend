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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashUserPassword = exports.getUserById = exports.createUser = exports.getAllUsers = exports.getUserWithPassword = exports.getUser = exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["reader", "author", "admin"],
        required: true,
        default: "reader",
    },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", UserSchema);
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified("password"))
            return next();
        try {
            user.password = yield bcryptjs_1.default.hash(user.password, 10);
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
// Query
const getUser = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield exports.User.findOne({ email }).select("-password").lean(); });
exports.getUser = getUser;
const getUserWithPassword = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield exports.User.findOne({ email }); });
exports.getUserWithPassword = getUserWithPassword;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield exports.User.find().select("-password"); });
exports.getAllUsers = getAllUsers;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new exports.User(data);
    return yield user.save();
});
exports.createUser = createUser;
const getUserById = (id) => exports.User.findById(id).select("-password");
exports.getUserById = getUserById;
const hashUserPassword = (password) => __awaiter(void 0, void 0, void 0, function* () { return yield bcryptjs_1.default.hash(password, 10); });
exports.hashUserPassword = hashUserPassword;
const comparePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, hashedPassword);
});
exports.comparePassword = comparePassword;
