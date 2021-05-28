import { Request } from 'express';
import { BadRequestException, Body, Controller, Get, Post, Req, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Controller('api')
export class AppController {

  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService
  ) { }

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string
  ) {

    const hashedPassword = await bcrypt.hash(password, 12)

    this.appService.create({
      name, email, password: hashedPassword
    })
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    const user = await this.appService.findOne({ email })

    if (!user) {
      throw new BadRequestException('invalid credentials')
    }

    if (! await bcrypt.compare(password, user.password)) {
      throw new BadRequestException('invalid credentials')
    }

    const jwt = this.jwtService.signAsync({ id: user.id })
    return jwt
  }

  @Get('user')
  async getUser(
    @Req() req: Request
  ) {

    try {
      const auth = req.headers.authorization.replace('Bearer ','')

      const data =await this.jwtService.verifyAsync(auth)
    
      if (!data) {
        console.log(data)
        throw new UnauthorizedException()
      }

      const user = await this.appService.findOne({ id: data['id'] })

      return user


    } catch (error) {
      throw new Error(error)
    }


  }

}
