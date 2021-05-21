import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
   imports:[
       TypeOrmModule.forRoot({
           type:'mysql',
           host:process.env.HOST,
           port:Number.parseInt(process.env.PORT),
           username:process.env.USER,
           password:process.env.PASSWORD,
           database:process.env.DATABASE,
           entities:[],
           synchronize:true
       })
   ]
})

export class DatabaseModule {}
