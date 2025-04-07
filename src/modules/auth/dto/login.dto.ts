import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class AdminLoginDto {
  @ApiPropertyOptional({ description: '用户名', default: 'admin' })
  @IsOptional()
  username: string;

  @ApiPropertyOptional({ description: '密码', default: '123456' })
  @IsOptional()
  password: string;
}
