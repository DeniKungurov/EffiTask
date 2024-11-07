import { Module } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
@Module({
    providers: [AuthGuard, JwtService],
    exports: [AuthGuard]
})
export class ServiceModule { }
