import { PaginationDto } from '@app/commom/dto/base.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class AdminSearchDto extends PaginationDto {
  @ApiPropertyOptional({ description: '用户名' })
  @IsOptional()
  username: string;

  @ApiPropertyOptional({ description: '手机号' })
  @IsOptional()
  mobile: string;
}
