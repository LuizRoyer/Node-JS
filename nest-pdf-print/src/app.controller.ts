import { Controller, Get, Header, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';
import ptp from "pdf-to-printer";




@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('print/pdf')
  @Header('Content-type', 'application/pdf')
  async postPdf(@Res() res: Response, @Req() req: Request) {

    const path = require("path")
    const fs = require("fs")

    let options = {}
    if (req.query.printer) {
      options['printer'] = req.query.printer
    }
    const tmpFilePath = path.join(`./tmp/${Math.random().toString(36).substr(7)}.pdf`)

    fs.writeFileSync(tmpFilePath, req.body, 'binary')
    await ptp.print(tmpFilePath, options)
    fs.unlinkSync(tmpFilePath)

    res.status(204)
    res.send()
  }
}
