"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSession = exports.validatePassword = exports.findUser = exports.createUser = void 0;
const lodash_1 = require("lodash");
const session_1 = __importDefault(require("../model/session"));
const user_1 = __importDefault(require("../model/user"));
async function createUser(user) {
    return await user_1.default.create(user);
}
exports.createUser = createUser;
async function findUser(query) {
    return user_1.default.findOne(query).lean();
}
exports.findUser = findUser;
async function validatePassword({ email, password }) {
    const user = await user_1.default.findOne({ email });
    if (!user)
        return false;
    const isValid = await user.comparedPassword(password);
    if (!isValid)
        return false;
    return (0, lodash_1.omit)(user.toJSON(), "password");
}
exports.validatePassword = validatePassword;
async function updateSession(query, update) {
    return session_1.default.updateOne(query, update);
}
exports.updateSession = updateSession;
