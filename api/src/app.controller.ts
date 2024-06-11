import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('teste')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): void {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);


  }
}