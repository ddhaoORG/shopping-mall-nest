import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@app/commom/decorators/public.decorator';
import { ApiBody } from '@nestjs/swagger';
import { AdminLoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('login')
  @ApiBody({
    type: AdminLoginDto,
  })
  async login(@Body() loginData: AdminLoginDto) {
    const { username, password } = loginData;
    const admin = await this.authService.validateAdmin(username, password);
    if (admin) {
      return this.authService.login(admin);
    }
  }
}
