import { Module } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenService } from './jwt/jwt.token.service';
@Module({
    providers: [AuthGuard, JwtService, JwtTokenService],
    exports: [AuthGuard, JwtTokenService]
})
export class ServiceModule { }
