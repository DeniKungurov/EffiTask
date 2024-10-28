import { Injectable } from '@nestjs/common';
import { connect } from 'http2';
import { PrismaService } from 'src/lib/PrismaService';
import { CreateUserParams } from './user.repository.d'
import { User } from '@prisma/client';
@Injectable()
export class UserRepository {
    constructor(
        private prisma: PrismaService
    ) { }

    async createUser({ email, password, businessEntityName, relationTypeCode, businessEntityTypeCode }: CreateUserParams): Promise<User> {
        return this.prisma.user.create({
            data: {
                email,
                password,
                relation: {
                    create: {
                        businessEntity: {
                            create: {
                                name: businessEntityName,
                                businessEntityType: {
                                    connect: { code: businessEntityTypeCode },
                                },
                            },
                        },
                        relationType: {
                            connect: { code: relationTypeCode },
                        },
                    },
                },
            },
        });
    }

    async findById(userId: number): Promise<User> {
        return this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    }

    async findByEmail(email: string): Promise<User> {
        return this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }
}
