"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const session_service_1 = require("../service/session.service");
const jwt_1 = require("../utils/jwt");
const deserializeUser = async (req, res, next) => {
    const accessToken = (0, lodash_1.get)(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken = (0, lodash_1.get)(req, "headers.x-refresh");
    if (!accessToken)
        return next();
    const { decoded, expired } = (0, jwt_1.decode)(accessToken);
    if (decoded) {
        //@ts-ignore
        req.user = decoded;
        return next();
    }
    if (expired && refreshToken) {
        const newAccessToken = await (0, session_service_1.reIssueAccessToken)({ refreshToken });
        if (newAccessToken) {
            res.setHeader("accessToken", newAccessToken);
            const { decoded } = (0, jwt_1.decode)(newAccessToken);
            //@ts-ignore           
            req.user = decoded;
        }
        return next();
    }
    return next();
};
exports.default = deserializeUser;
