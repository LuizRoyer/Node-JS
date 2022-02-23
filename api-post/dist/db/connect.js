"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../logger");
function connection() {
    const dbUrl = config_1.default.get('dbUrl');
    return mongoose_1.default.connect(dbUrl)
        .then(() => {
        logger_1.log.info("Database connected");
    })
        .catch((err) => {
        logger_1.log.error("db error" + err);
        process.exit(1);
    });
}
exports.default = connection;
