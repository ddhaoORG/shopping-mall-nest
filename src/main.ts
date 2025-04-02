import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 引入winston日志
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

// 引入swagger api文档
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// 日志与异常处理
const logger = WinstonModule.createLogger({
  transports: [new winston.transports.Console()],
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
  // 配置api文档
  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('Project API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
