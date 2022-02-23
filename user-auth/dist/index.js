"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/", (req, res, next) => {
    res.status(200).send("Welcome to MS User Auth");
    next();
});
app.listen(3000, () => console.log(`Running at ${'http://localhost'}:${3000}`));
