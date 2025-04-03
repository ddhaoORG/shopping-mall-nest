import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminService } from '@app/modules/admin/admin.service';
import { Admin } from '@app/modules/admin/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}
  // 验证用户名是否存在
  async validateAdmin(username: string, password: string): Promise<any> {
    const admin = await this.adminService.findOneByUsername(username);

    // 存在且密码正确 返回用户信息
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return admin;
    }
    // 否则抛出错误
    throw new UnauthorizedException('用户名或密码错误');
  }

  async login(admin: Admin) {
    const payload = {
      usename: admin.username,
      sub: admin.id,
      role: admin.role,
    };
    // 生成token
    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET }),
    };
  }
}
