"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const yup_1 = require("yup");
exports.createUserSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        name: (0, yup_1.string)().required("Name is required"),
        password: (0, yup_1.string)().required("Password is required")
            .min(6, "Password is too short"),
        passwordConfirmation: (0, yup_1.string)().oneOf([(0, yup_1.ref)("password"), null], "Password must match"),
        email: (0, yup_1.string)().email("Must be a valid email").required("Email is required")
    })
});
