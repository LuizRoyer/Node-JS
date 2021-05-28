
import { User } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root123',
    database: 'sopretty',
    entities: [User],
    synchronize: true,
  }),
TypeOrmModule.forFeature([User]),
JwtModule.register({
  secret: 'secretKey',
  signOptions: { expiresIn: '60s' },
})
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
