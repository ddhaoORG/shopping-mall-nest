import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '@app/commom/decorators/public.decorator';

// 自定义JWT守卫
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), // 方法级别的元数据
      context.getClass(), // 控制器级别的元数据
    ]);
    if (isPublic) {
      return true; // 公共路由放行
    }
    // 执行鉴权逻辑
    // 1.获取token
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request['admin'] = payload;
    } catch (err) {
      throw new UnauthorizedException('token无效或者已经过期' + err);
    }
    return true;
  }
}
// 从请求头中获取token
function extractTokenFromHeader(request) {
  const [type, token] = request.headers.authorization?.split(' ');
  return type === 'Bearer' ? token : '';
}
