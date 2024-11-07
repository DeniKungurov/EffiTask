import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignIn.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  async signIn(@Body() body: SignInDto) {

  }
}
