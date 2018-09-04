import { Get, Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Big } from 'entities/big.entity';
import { Bigdocument } from 'entities/bigdocument.entity';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('/big/find')
  async findBig(): Promise<Big[]>{
    return this.appService.findBig();
  } 

  @Post('/big/register')
  async registerBig(@Body() body): Promise<Big>{
    return this.appService.registerBig(body);
  }

  @Get('/bigdocument/find')
  async findBigDocument(): Promise<Bigdocument[]>{
    return this.appService.findBigDocument();
  }

  @Post('/bigdocument/register')
  async registerBigDocument(@Body() body): Promise<Bigdocument>{
    return this.appService.registerBigDocument(body);
  }
}
