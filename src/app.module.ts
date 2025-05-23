import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/auth.guard';

@Module({
  imports: [
    // 环境变量配置
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    // 数据库连接
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      username: process.env.DATABASE_USERNAME, // 账号
      password: process.env.DATABASE_PASSWORD, // 密码
      host: process.env.DATABASE_HOST, // host
      port: Number(process.env.DATABASE_PORT), // 端口
      database: process.env.DATABASE_NAME, // 库名
      synchronize: true, // 是否自动将实体类同步到数据库
      retryDelay: 500, // 重连数据库间隔
      retryAttempts: 10, // 重连次数
      autoLoadEntities: true, // 自动加载实体
    }),
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard } /* 注册全局守卫 */],
})
export class AppModule {}
