import { Get, Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Big } from 'entities/big.entity';
import { Result } from 'range-parser';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Post('/big')
  async find(@Body() body): Promise<Big[]>{
    if (body.connection === 'postgres')
      return this.appService.findPostgres();
  } 

  @Post('/register')
  async register(@Body() body): Promise<Big>{
    if (body.connection === 'postgres')
      return this.appService.registerPostgres(body);
  }
}
