"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reIssueAccessToken = exports.createAccessToken = exports.createSession = void 0;
const config_1 = __importDefault(require("config"));
const lodash_1 = require("lodash");
const session_1 = __importDefault(require("../model/session"));
const jwt_1 = require("../utils/jwt");
const user_service_1 = require("./user.service");
async function createSession(userId, userAgent) {
    const session = await session_1.default.create({ user: userId, userAgent });
    return session.toJSON();
}
exports.createSession = createSession;
function createAccessToken({ user, session }) {
    const accessToken = (0, jwt_1.sign)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config_1.default.get("accessToken") });
    return accessToken;
}
exports.createAccessToken = createAccessToken;
async function reIssueAccessToken({ refreshToken }) {
    const { decoded } = (0, jwt_1.decode)(refreshToken);
    if (!decoded || !(0, lodash_1.get)(decoded, "_id"))
        return false;
    const session = await session_1.default.findById((0, lodash_1.get)(decoded, "_id"));
    if (!session || !session.valid)
        return false;
    const user = await (0, user_service_1.findUser)({ id: session.user });
    if (!user)
        return false;
    const accessToken = createAccessToken({ user, session });
    return accessToken;
}
exports.reIssueAccessToken = reIssueAccessToken;
