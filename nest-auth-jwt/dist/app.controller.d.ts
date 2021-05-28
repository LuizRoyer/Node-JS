import { Request } from 'express';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
export declare class AppController {
    private readonly appService;
    private readonly jwtService;
    constructor(appService: AppService, jwtService: JwtService);
    register(name: string, email: string, password: string): Promise<void>;
    login(email: string, password: string): Promise<string>;
    getUser(req: Request): Promise<import("./entities/user.entity").User>;
}
