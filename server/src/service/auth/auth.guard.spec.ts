import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
    let authGuard: AuthGuard;
    let jwtService: JwtService;
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthGuard,
                {
                    provide: JwtService,
                    useValue: {
                        verifyAsync: jest.fn(),
                    },
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('test-secret'),
                    },
                },
            ],
        }).compile();

        authGuard = module.get<AuthGuard>(AuthGuard);
        jwtService = module.get<JwtService>(JwtService);
        configService = module.get<ConfigService>(ConfigService);
    });

    it('should return true if token is valid', async () => {
        const mockRequest = {
            headers: {
                authorization: 'Bearer valid.token',
            },
        };

        const mockExecutionContext = {
            switchToHttp: () => ({
                getRequest: () => mockRequest,
            }),
        } as unknown as ExecutionContext;

        jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue({ userId: 1 });

        const result = await authGuard.canActivate(mockExecutionContext);
        expect(result).toBe(true);
        expect(mockRequest['user']).toEqual({ userId: 1 });
    });

    it('should throw UnauthorizedException if token is missing', async () => {
        const mockRequest = {
            headers: {},
        };

        const mockExecutionContext = {
            switchToHttp: () => ({
                getRequest: () => mockRequest,
            }),
        } as unknown as ExecutionContext;

        await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(
            UnauthorizedException,
        );
    });

    it('should throw UnauthorizedException if token verification fails', async () => {
        const mockRequest = {
            headers: {
                authorization: 'Bearer invalid.token',
            },
        };

        const mockExecutionContext = {
            switchToHttp: () => ({
                getRequest: () => mockRequest,
            }),
        } as unknown as ExecutionContext;

        jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error('Invalid token'));

        await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(
            UnauthorizedException,
        );
    });
});
