"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_controller_1 = require("./controller/session.controller");
const user_controller_1 = require("./controller/user.controller");
const requires_user_1 = __importDefault(require("./middleware/requires.user"));
const validate_request_1 = __importDefault(require("./middleware/validate.request"));
const create_session_1 = require("./schema/create.session");
const create_user_1 = require("./schema/create.user");
exports.default = (app) => {
    app.get('/healthcheck', (req, res) => res.sendStatus(200));
    // Router User
    app.post('/api/users', (0, validate_request_1.default)(create_user_1.createUserSchema), user_controller_1.createUserHandler);
    //Login
    app.post("/api/sessions", (0, validate_request_1.default)(create_session_1.createUserSessionSchema), session_controller_1.createUserSessionHandler);
    //Logout
    app.delete("/api/sessions", requires_user_1.default, session_controller_1.invalidateUserSessionHandler);
};
