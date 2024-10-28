import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/lib/PrismaService';
@Module({
    exports: [UserRepository],
    providers: [UserRepository, PrismaService],
})
export class RepositoryModule { }