import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports:[
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
   CategoriesModule,
   PrismaModule,
   ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService] 
})
export class AppModule {}
