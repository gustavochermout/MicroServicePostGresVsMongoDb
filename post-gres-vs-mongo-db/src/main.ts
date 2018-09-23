import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createConnections } from "typeorm";
import { Big } from 'entities/big.entity';
import { Bigdocument } from 'entities/bigdocument.entity';
const cors = require('cors');

createConnections([{
  name: "postgres",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "173426",
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
  entities: [
    Bigdocument,
  ],
}]).then(connection => {}).catch(error => console.log(error));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(3001);
}
bootstrap();
