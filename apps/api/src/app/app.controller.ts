import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { dir } from '@wow-spedoo/file-handler';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';
@Controller()
export class AppController {
  logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get('image/:name')
  test(@Param('name') name: string, @Res() res) {
    const file = createReadStream(join(dir, 'image', name.toString()));
    res.send(file);
  }
}
