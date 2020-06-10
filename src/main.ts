import { NestFactory } from '@nestjs/core';
import * as cookie from 'cookie-parser';
import * as parser from 'body-parser';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('port');
  const origin = config.get<string>('origin');

  app.enableCors({
    origin,
    credentials: true,
  });

  app.use(cookie());
  app.use(
    parser.json({
      limit: 524288000,
    }),
  );

  await app.listen(port);
}
bootstrap();
