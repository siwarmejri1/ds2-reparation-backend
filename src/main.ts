import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, 
      whitelist: true, //nfaskhou les données jeyin fel requete selon DTO
      forbidNonWhitelisted: true, //ken fama champs zeydin fel requete yeb3ath erreur
    }),
  );
  await app.listen(3000);
}
bootstrap();