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

  @Get('/big')
  async find(): Promise<Big[]>{
    return this.appService.find();
  } 

  @Post('/register')
  async register(@Body() big): Promise<Big>{
    return this.appService.register(big);
  }
}
