import { Injectable, Body } from '@nestjs/common';
import { Big } from 'entities/big.entity';
import { getConnection, getConnectionManager, getMongoManager, getMongoRepository } from 'typeorm';
import { Bigdocument } from 'entities/bigdocument.entity';
import { empty } from 'rxjs';

@Injectable()
export class AppService {

  root(): string {
    return 'Hello World!';
  }

  async findBig(): Promise<Big[]>{
    let connection;
    connection = getConnection('postgres');

    return await connection.getRepository(Big).createQueryBuilder().select().getMany(); 
  }

  async registerBig(@Body() body){
    let connection;
    connection = getConnection('postgres');

    const big = new Big();
    big.value = body.value;
    
    return await connection.createQueryBuilder().insert().into(Big).values(big).execute();
  }

  async deleteAllBig(){
    let connection;
    connection = getConnection('postgres');

    return await connection.createQueryBuilder().delete().from(Big).where().execute();
  }

  async findBigDocument(): Promise<Bigdocument[]>{
    const manager = getMongoManager('mongodb');
    return await manager.find(Bigdocument);
  }

  async registerBigDocument(@Body() body){
    const manager = getMongoManager('mongodb');

    const bigdocument = new Bigdocument;
    bigdocument.value = body.value;

    return await manager.save(bigdocument);
  }

  async deleteAllBigDocument(){
    const postRepository = getMongoRepository(Bigdocument, 'mongodb');
    return await postRepository.deleteMany({});
  }

  async generateRandomString(@Body() body): Promise<string>{
    let crypto = require('crypto');
    return await crypto.randomBytes(body.size/2).toString('hex'); 
  }

  async registerRandomValues(@Body() body, inicio: number) {
    try {
      body.value = await this.generateRandomString(body);

      if (body.place === 'big')
          await this.registerBig(body);

      if (body.place === 'bigdocument')
          await this.registerBigDocument(body);

      return {
        status: 200,
        inicio,
      };
    } catch {
      return {
        status: 500,
        inicio,
      };
    }
  }
}
