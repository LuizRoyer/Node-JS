"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserHandler = void 0;
const lodash_1 = require("lodash");
const logger_1 = require("../logger");
const user_service_1 = require("../service/user.service");
async function createUserHandler(req, res) {
    try {
        const user = await (0, user_service_1.createUser)(req.body);
        res.send((0, lodash_1.omit)(user.toJSON(), "password"));
    }
    catch (error) {
        logger_1.log.error(error);
        return res.status(400).send(error);
    }
}
exports.createUserHandler = createUserHandler;
