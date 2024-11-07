import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { JwtTokenService } from '../jwt/jwt.token.service';

describe('AuthGuard', () => {
    let authGuard: AuthGuard;
    let jwtTokenService: JwtTokenService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthGuard,
                {
                    provide: JwtTokenService,
                    useValue: {
                        verifyAsync: jest.fn(),
                    },
                },
            ],
        }).compile();

        authGuard = module.get<AuthGuard>(AuthGuard);
        jwtTokenService = module.get<JwtTokenService>(JwtTokenService);
    });

    it('should be defined', () => {
        expect(authGuard).toBeDefined();
    });

    describe('canActivate', () => {
        it('should return true if token is valid', async () => {
            const mockRequest = {
                headers: {
                    authorization: 'Bearer valid.token.here',
                },
            };
            const mockContext = {
                switchToHttp: () => ({
                    getRequest: () => mockRequest,
                }),
            } as ExecutionContext;

            jest.spyOn(jwtTokenService, 'verifyAsync')

            const result = await authGuard.canActivate(mockContext);
            expect(result).toBe(true);
            expect(jwtTokenService.verifyAsync).toHaveBeenCalledWith('valid.token.here', mockRequest);
        });

        it('should throw UnauthorizedException if no token is present', async () => {
            const mockRequest = {
                headers: {},
            };
            const mockContext = {
                switchToHttp: () => ({
                    getRequest: () => mockRequest,
                }),
            } as ExecutionContext;

            await expect(authGuard.canActivate(mockContext)).rejects.toThrow('Unauthorized');
        });

        it('should throw UnauthorizedException if token verification fails', async () => {
            const mockRequest = {
                headers: {
                    authorization: 'Bearer invalid.token.here',
                },
            };
            const mockContext = {
                switchToHttp: () => ({
                    getRequest: () => mockRequest,
                }),
            } as ExecutionContext;

            jest.spyOn(jwtTokenService, 'verifyAsync').mockRejectedValueOnce(new Error('Unauthorized'));

            await expect(authGuard.canActivate(mockContext)).rejects.toThrow('Unauthorized');
        });
    });
});
