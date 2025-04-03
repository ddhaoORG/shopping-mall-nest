import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/commom/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('login')
  async login(@Body() loginData: { username: string; password: string }) {
    const { username, password } = loginData;
    console.log(process.env.JWT_SECRET);
    const admin = await this.authService.validateAdmin(username, password);
    if (admin) {
      return this.authService.login(admin);
    }
  }
}
