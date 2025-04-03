import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//  返回格式
export interface Response<T> {
  code: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        code: context.switchToHttp().getResponse().statusCode || 200,
        message: data?.message || '操作成功',
        data: this.cleanupData(data),
      })),
    );
  }
  private cleanupData(data: any) {
    if (data?.message) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { message, ...rest } = data;
      return rest;
    }
    // 分页处理
    if (data?.meta) {
      return {
        list: data.items,
        pagination: {
          page: data.meta.currentPage,
          pageSize: data.meta.itemsPerPage,
          total: data.meta.totalItems,
          totalPages: data.meta.totalPages,
        },
      };
    }
    return data;
  }
}
