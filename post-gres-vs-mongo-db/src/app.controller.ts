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
    return 'Todos os registros da tabela Big foram deletados. =)';
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
    return 'Todos os documentos da coleção BigDocument foram deletados. =)';
  }

  @Post('/register/random')
  async registerRandomValues(@Body() body){
    let sucess = 0;
    let error = 0;
    let timeMedia = 0;
    let i = 0;

    for (; i < body.quantity; i++){
      console.log(i);
      const inicio = new Date().getTime();
      const result = await this.appService.registerRandomValues(body, inicio);
      const fim = new Date().getTime();
      if (result.status === 200) {
        sucess += 1;
        timeMedia += fim - result.inicio;
      } else {
        error += 1;
        timeMedia += fim - result.inicio;
      }
    }
    console.log(`Você tentou inserir ${body.quantity} registros dos quais ${sucess} teve sucesso e tiveram ${error} erros de inserção`)
    console.log(`Tempo medio de inserção: ${timeMedia / (sucess + error)} ms`);
    console.log(`Tempo total da operação: ${timeMedia} ms`);
  }
}
