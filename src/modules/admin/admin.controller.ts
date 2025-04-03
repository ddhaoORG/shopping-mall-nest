import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminSearch } from './admin.types';
import { Pagination } from 'src/commom/commom.types';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('update')
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
  findAll(@Body() params: AdminSearch & Pagination) {
    return this.adminService.findAll(params);
  }

  @Post('detail')
  findOne(@Body('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Post('delete')
  remove(@Body('id') id: string) {
    return this.adminService.remove(+id);
  }
}
