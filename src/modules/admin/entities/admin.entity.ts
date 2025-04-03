import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(4, 20, { message: '用户名长度需在4-20字符之间' })
  username: string;

  @Column()
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 20, { message: '用户名长度需在6-20字符之间' })
  password: string;

  @Column({ unique: true })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @Column()
  avatar: string;

  @Column({ unique: true })
  @Length(11, 11, { message: '手机号不能少于11位' })
  mobile: string;

  @Column()
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 自动加密密码
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  // 密码校验
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
