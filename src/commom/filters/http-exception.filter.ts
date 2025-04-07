import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

export interface ErrorResponse {
  code: number;
  message: string;
  timestamp: string;
  path: string;
  error?: any;
}
@Catch()
// 全局异常过滤器
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: ErrorResponse = {
      code: status,
      message: exception?.response?.message || exception.message || 'Internal server error',
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // 开发环境显示错误详情
    if (process.env.NODE_ENV === 'production') {
      errorResponse.error = exception.stack;
    }
    response.status(status).json(errorResponse);
    this.logger.error(`[${status}] ${request.method} ${request.url}`, exception.stack);
  }
}
