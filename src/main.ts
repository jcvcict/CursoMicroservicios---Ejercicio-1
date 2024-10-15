import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { envs } from './config/env';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CreateProductDto } from './products/dto/create-product.dto';


async function bootstrap() {
  const logger = new Logger('ProductsMS-main');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,
                                        {transport: Transport.TCP,
                                         options:{port: envs.port}});
  
  

  /*Para manejar las rutas: */

  //app.setGlobalPrefix('api');


  /*Para activar los pipes de class-validator */

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, // Remueve todo lo que no está incluido en los DTOS
    forbidNonWhitelisted:true, // Devuelve error si hay propiedades que no están incluidas
    transform:true, // Permite que se realicen las transformaciones
  }))

  //await app.listen(envs.port);

  logger.log(`Product MicroServer running on port ${envs.port}`);

}





bootstrap();
