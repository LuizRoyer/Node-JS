"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const requireUser = async (req, res, next) => {
    const user = (0, lodash_1.get)(req, "user");
    if (!user)
        return res.status(403);
    return next();
};
exports.default = requireUser;
