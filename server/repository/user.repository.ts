import { Injectable } from '@nestjs/common';
import { PrismaService } from 'lib/PrismaService';
@Injectable()
export class UserRepository {
    constructor(
        private prisma: PrismaService
    ) { }

    createUser() {
        this.prisma.user.create({
        })
    }
}
