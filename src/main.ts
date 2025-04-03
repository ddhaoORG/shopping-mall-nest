import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// 引入winston日志
/* import { WinstonModule } from 'nest-winston';
import * as winston from 'winston'; */

// 引入swagger api文档
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './commom/interceptor/response.interceptor';

// 日志与异常处理
/* const logger = WinstonModule.createLogger({
  transports: [new winston.transports.Console()],
}); */

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  // 配置api文档
  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('Project API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // 全局验证配置
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动过滤未定义的属性
      forbidNonWhitelisted: true, // 拒绝包含未定义属性的请求
      transform: true, // 自动类型转换（如将字符串数字转为Number）
      disableErrorMessages: false, // 生产环境可设为 true 隐藏错误详情
    }),
  );
  // 注册全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
