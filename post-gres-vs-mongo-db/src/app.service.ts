import { Injectable, Body } from '@nestjs/common';
import { Big } from 'entities/big.entity';
import { getConnection, getConnectionManager, getMongoManager } from 'typeorm';
import { Bigdocument } from 'entities/bigdocument.entity';

@Injectable()
export class AppService {
  
  root(): string {
    return 'Hello World!';
  } 

  async findBig(): Promise<Big[]>{
    let connection;
    connection = getConnection('postgres');

    return connection.getRepository(Big).createQueryBuilder().select().getMany(); 
  }

  async registerBig(@Body() body){
    let connection;
    connection = getConnection('postgres');

    const big = new Big();
    big.value = body.value;
    
    return connection.createQueryBuilder().insert().into(Big).values(big).execute();
  }

  async findBigDocument(): Promise<Bigdocument[]>{
    const manager = getMongoManager('mongodb');
    return await manager.find(Bigdocument);
  }

  async registerBigDocument(@Body() body){
    const manager = getMongoManager('mongodb');

    const bigdocument = new Bigdocument;
    bigdocument.value = body.value;

    return manager.save(bigdocument);
  }
}
