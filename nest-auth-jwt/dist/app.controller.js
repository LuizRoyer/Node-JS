"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AppController = class AppController {
    constructor(appService, jwtService) {
        this.appService = appService;
        this.jwtService = jwtService;
    }
    async register(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        this.appService.create({
            name, email, password: hashedPassword
        });
    }
    async login(email, password) {
        const user = await this.appService.findOne({ email });
        if (!user) {
            throw new common_1.BadRequestException('invalid credentials');
        }
        if (!await bcrypt.compare(password, user.password)) {
            throw new common_1.BadRequestException('invalid credentials');
        }
        const jwt = this.jwtService.signAsync({ id: user.id });
        return jwt;
    }
    async getUser(req) {
        try {
            const auth = req.headers.authorization.replace('Bearer ', '');
            const data = await this.jwtService.verifyAsync(auth);
            if (!data) {
                console.log(data);
                throw new common_1.UnauthorizedException();
            }
            const user = await this.appService.findOne({ id: data['id'] });
            return user;
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body('name')),
    __param(1, common_1.Body('email')),
    __param(2, common_1.Body('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "register", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body('email')),
    __param(1, common_1.Body('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    common_1.Get('user'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getUser", null);
AppController = __decorate([
    common_1.Controller('api'),
    __metadata("design:paramtypes", [app_service_1.AppService,
        jwt_1.JwtService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map