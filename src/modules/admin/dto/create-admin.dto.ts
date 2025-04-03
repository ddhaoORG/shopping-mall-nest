import { IsNotEmpty, Length } from 'class-validator';
import { Column } from 'typeorm';

export class CreateAdminDto {
  @Column()
  @IsNotEmpty()
  @Length(4, 20)
  username: string;

  @Column()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  @Length(11, 11)
  mobile: string;

  @Column()
  role: string;

  @Column()
  isActive: boolean;
}
