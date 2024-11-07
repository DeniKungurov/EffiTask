import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtTokenService {
    jwtConstants: string
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService

    ) {
        this.jwtConstants = this.configService.get<string>('JWT_SECRET')
    }

    generateToken(payload: object): string {
        return this.jwtService.sign(payload);
    }

    async verifyAsync(token: string, request: Request): Promise<void> {
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: this.jwtConstants
                }
            );
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
    }
}