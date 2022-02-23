"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("config"));
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });
UserSchema.pre("save", async function (next) {
    let user = this;
    if (!user.isModified("password"))
        return next();
    const salt = await bcrypt_1.default.genSalt(config_1.default.get("saltWorkFactor"));
    const hash = await bcrypt_1.default.hashSync(user.password, salt);
    user.password = hash;
    return next();
});
UserSchema.methods.comparedPassword = async function (passwordParam) {
    const user = this;
    return bcrypt_1.default.compare(passwordParam, user.password).catch(() => false);
};
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
