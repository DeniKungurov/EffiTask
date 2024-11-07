import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignIn.dto';
import { SignUpDto } from './dto/SignUp.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  @ApiOperation({ summary: 'User sign in' })
  @ApiResponse({ status: 200, description: 'Successful sign in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async signIn(@Body() body: SignInDto, @Res() res: Response): Promise<Response<any, Record<string, any>>> {
    const token = await this.authService.signIn(body)
    return this.generateResCookie(res, token)
  }

  @Post('signUp')
  @ApiOperation({ summary: 'User sign up' })
  @ApiResponse({ status: 200, description: 'Successful sign up' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async signUp(@Body() body: SignUpDto, @Res() res: Response): Promise<Response<any, Record<string, any>>> {
    const token = await this.authService.signUp(body)
    return this.generateResCookie(res, token)
  }

  private async generateResCookie(res: Response, token: string): Promise<Response<any, Record<string, any>>> {
    res.cookie('Authentication', `Bearer ${token}`, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600000,
    });

    return res.send({ message: 'OK' });
  }
}
