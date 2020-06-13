import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookie from 'cookie-parser';
import * as parser from 'body-parser';
import { AppModule } from './app.module';
import { TOKEN_PREFIX } from './auth/consts';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const loggerInterceptor = app.get<LoggerInterceptor>(LoggerInterceptor);

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

  app.useGlobalInterceptors(loggerInterceptor);

  const options = new DocumentBuilder()
    .setTitle('VK Sender')
    .setDescription('Рассылка сообщений для НШ')
    .setVersion('1.0')
    .addCookieAuth(TOKEN_PREFIX)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
