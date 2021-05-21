import { UsersController } from './users.controller';
import { UserService } from './shared/user.service';
import { Module } from '@nestjs/common';


@Module({
    imports:[],
    controllers:[UsersController],
    providers:[UserService],
    
})
export class UsersModule {}
