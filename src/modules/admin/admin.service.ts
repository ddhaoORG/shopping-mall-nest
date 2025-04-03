import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Like, Repository } from 'typeorm';
import { AdminSearch } from './admin.types';
import { Pagination } from 'src/commom/commom.types';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  // 创建管理员
  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const { username, email, mobile } = createAdminDto;

    // 检查用户名是否已经存在
    const isExistUserName = await this.adminRepository.findOne({
      where: [{ username }],
    });
    if (isExistUserName) {
      throw new ConflictException('用户名已经被注册');
    }
    // 检查邮箱是否存在
    const isExistUserEmail = await this.adminRepository.findOne({
      where: [{ email }],
    });
    if (isExistUserEmail) {
      throw new ConflictException('邮箱已经被注册');
    }
    // 检查手机号是否存在
    const isExistMobile = await this.adminRepository.findOne({
      where: [{ mobile }],
    });
    if (isExistMobile) {
      throw new ConflictException('手机号已经被注册');
    }
    const admin = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(admin);
  }
  // 获取管理员列表（分页、按照用户名与手机号查询）
  findAll(adminSearch: AdminSearch & Pagination): Promise<Admin[]> {
    const { username, mobile, page = 1, limit = 20 } = adminSearch;
    return this.adminRepository.find({
      where: { username: Like(`%${username}%`), mobile: Like(`%${mobile}%`) },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
  // 获取单个管理员
  findOne(id: number): Promise<Admin> {
    return this.adminRepository.findOneBy({ id });
  }
  findOneByUsername(username: string): Promise<Admin> {
    return this.adminRepository.findOne({
      where: { username },
    });
  }
  // 更新管理员
  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.adminRepository.findOneBy({ id });

    if (!admin) throw new ConflictException('找不到该管理员');

    // 修改属性
    Object.assign(admin, updateAdminDto);

    await this.adminRepository.save(admin);
    return this.adminRepository.findOneBy({ id });
  }
  // 删除管理员
  remove(id: number) {
    return this.adminRepository.delete(id);
  }
}
