"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSessionSchema = void 0;
const yup_1 = require("yup");
exports.createUserSessionSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        password: (0, yup_1.string)().required("Password is required").min(6, "Password is too short"),
        email: (0, yup_1.string)().email("must be a valid email").required("Email is required")
    })
});
