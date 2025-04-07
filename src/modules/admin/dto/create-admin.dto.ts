import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { Column } from 'typeorm';

export class CreateAdminDto {
  @Column()
  @IsNotEmpty()
  @Length(4, 20)
  @ApiProperty({
    example: 'admin',
    description: '用户名',
    required: true,
  })
  username: string;

  @Column()
  @ApiProperty({
    example: '123456',
    description: '密码',
    required: true,
    minLength: 6,
  })
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @Column()
  @ApiProperty({
    example: 'user@example.com',
    description: '用户邮箱',
    required: true,
  })
  email: string;

  @Column()
  @ApiProperty({
    example: '',
    description: '头像',
  })
  avatar: string;

  @Column()
  @Length(11, 11)
  @ApiProperty({
    example: '12345678901',
    description: '手机号',
  })
  mobile: string;

  @Column()
  @ApiProperty({
    example: 'admin',
    description: '角色',
  })
  role: string;

  @Column()
  @ApiProperty({
    example: true,
    description: '状态',
  })
  isActive: boolean;
}
