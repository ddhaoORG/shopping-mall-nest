import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { AdminSearchDto } from './dto/list.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('update')
  @ApiBody({
    type: CreateAdminDto,
  })
  create(@Body() createAdminDto: CreateAdminDto & { id?: number }) {
    const { id } = createAdminDto;
    // 当有id传入时为更新管理员
    if (id) {
      const updateAdminDto = new UpdateAdminDto();
      updateAdminDto.avatar = createAdminDto.avatar;
      updateAdminDto.email = createAdminDto.email;
      updateAdminDto.isActive = createAdminDto.isActive;
      updateAdminDto.mobile = createAdminDto.mobile;
      updateAdminDto.password = createAdminDto.password;
      updateAdminDto.role = createAdminDto.role;
      updateAdminDto.username = createAdminDto.username;
      return this.adminService.update(+id, updateAdminDto);
    }
    return this.adminService.create(createAdminDto);
  }

  @Post('list')
  findAll(@Body() params: AdminSearchDto) {
    return this.adminService.findAll(params);
  }

  @Post('detail')
  @ApiQuery({
    name: 'id',
    type: Number,
    example: 1,
    description: '用户id',
  })
  findOne(@Body('id') id: number) {
    return this.adminService.findOne(+id);
  }

  @Post('delete')
  @ApiQuery({
    name: 'id',
    type: Number,
    example: 1,
    description: '用户id',
  })
  remove(@Body('id') id: number) {
    return this.adminService.remove(+id);
  }
}
