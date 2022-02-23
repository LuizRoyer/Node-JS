"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const logger_1 = require("./logger");
const connect_1 = __importDefault(require("./db/connect"));
const routes_1 = __importDefault(require("./routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const deserialize_user_1 = __importDefault(require("./middleware/deserialize.user"));
const port = config_1.default.get('port');
const host = config_1.default.get('host');
const app = (0, express_1.default)();
app.use(deserialize_user_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Docs API Post",
            version: "1.0.0",
            description: "DOCS API WITH USER ,SESSION AND POST",
            termsOfService: "http://example.com/terms/",
            contact: {
                name: "API Support",
                url: "http://www.support.com/support",
                email: "app@support.com",
            },
        },
        servers: [
            {
                url: `http://${host}:${port}`,
                description: "My API Documentation",
            },
        ],
    },
    apis: ["./Routes/*.js"],
};
const specs = (0, swagger_jsdoc_1.default)(options);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.listen(port, host, () => {
    logger_1.log.info(`Server listing at http://${host}:${port}`);
    (0, connect_1.default)(); // connection with mongoDb
    (0, routes_1.default)(app); // add routes at application
});
