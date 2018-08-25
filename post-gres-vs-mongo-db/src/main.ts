import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createConnections } from "typeorm";
import { Big } from 'entities/big.entity';
const cors = require('cors');

createConnections([{
  name: "postgres",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "postgresvsmongo",
  entities: [
    Big, 
  ],
  synchronize: true,
  logging: false
}, {
  name: "mongodb",
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "postgresvsmongo",
}]).then(connection => {}).catch(error => console.log(error));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(3000);
}
bootstrap();
