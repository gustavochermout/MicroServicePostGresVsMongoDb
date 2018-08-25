import { Injectable, Body } from '@nestjs/common';
import { Big } from 'entities/big.entity';
import { getConnection, getConnectionManager } from 'typeorm';

@Injectable()
export class AppService {
  
  root(): string {
    return 'Hello World!';
  } 

  async findPostgres(): Promise<Big[]>{
    let connection;
    connection = getConnection('postgres');

    return connection.getRepository(Big).createQueryBuilder('u').select().getMany(); 
  }

  async registerPostgres(@Body() body){
    let connection;
    connection = getConnection('postgres');

    const big = new Big();
    big.value = body.value;
    
    return connection.createQueryBuilder().insert().into(Big).values(big).execute();
  }
}
