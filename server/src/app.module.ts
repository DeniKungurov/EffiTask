import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServiceModule } from './service/service.module';
import { JwtModule } from '@nestjs/jwt';
import { EntityModule } from './entity/entity.module';
@Module({
  imports: [AuthModule, EntityModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
