import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServiceModule } from './service/service.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
    ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
