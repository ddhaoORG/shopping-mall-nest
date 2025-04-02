import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 引入winston日志
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

// 日志与异常处理
const logger = WinstonModule.createLogger({
  transports: [new winston.transports.Console()],
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
