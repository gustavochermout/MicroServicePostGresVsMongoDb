import { Injectable } from '@nestjs/common';
import { Big } from 'entities/big.entity';

@Injectable()
export class AppService {
  
  root(): string {
    return 'Hello World!';
  } 

  async register(big){
    const b = new Big();
    b.value = big.value;
    
    return b.save();
  }
}
