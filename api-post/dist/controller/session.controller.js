"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateUserSessionHandler = exports.createUserSessionHandler = void 0;
const config_1 = __importDefault(require("config"));
const lodash_1 = require("lodash");
const session_service_1 = require("../service/session.service");
const user_service_1 = require("../service/user.service");
const jwt_1 = require("../utils/jwt");
async function createUserSessionHandler(req, res) {
    const user = await (0, user_service_1.validatePassword)(req.body);
    if (!user)
        return res.status(401).send("Invalid User");
    const session = await (0, session_service_1.createSession)(user._id, req.get("user-agent") || "");
    const accessToken = (0, session_service_1.createAccessToken)({ user, session });
    const refreshToken = (0, jwt_1.sign)(session, { expiresIn: config_1.default.get("refreshToken") });
    return res.send({ accessToken, refresh: refreshToken });
}
exports.createUserSessionHandler = createUserSessionHandler;
async function invalidateUserSessionHandler(req, res) {
    const sessionId = (0, lodash_1.get)(req, "user.session");
    await (0, user_service_1.updateSession)({ _id: sessionId }, { valid: false });
    return res.status(200);
}
exports.invalidateUserSessionHandler = invalidateUserSessionHandler;
