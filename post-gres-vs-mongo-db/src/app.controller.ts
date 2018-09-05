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

  @Post('/big/deleteall')
  async deleteAllBig(): Promise<string>{
    await this.appService.deleteAllBig();
    return "Todos os registros da tabela Big foram deletados. =)";
  }

  @Get('/bigdocument/find')
  async findBigDocument(): Promise<Bigdocument[]>{
    return this.appService.findBigDocument();
  }

  @Post('/bigdocument/register')
  async registerBigDocument(@Body() body): Promise<Bigdocument>{
    return this.appService.registerBigDocument(body);
  }

  @Post('/bigdocument/deleteall')
  async deleteAllBigDocument(): Promise<string>{
    await this.appService.deleteAllBigDocument();
    return "Todos os documentos da coleção BigDocument foram deletados. =)";
  }

  @Post('/register/random')
  async registerRandomValues(@Body() body): Promise<string>{
    return this.appService.registerRandomValues(body);
  }
}
