import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository/user/user.repository';
import { CreateUser } from './user.entity.d'
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UseradapterEntity } from './user.adapter.entity';
import { SignInDto } from 'src/api/auth/dto/SignIn.dto';

@Injectable()
export class UserEntity {
    saltRounds: number
    constructor(private readonly userRepository: UserRepository) {
        this.saltRounds = 10
    }

    async signInUser(userSignIn: SignInDto) {
        const user = await this.userRepository.findByEmail(userSignIn.email)
        if (!user) throw new BadRequestException('NOT_FOUND')
        const isCheckPassword = await this.comparePasswords(userSignIn.password, user.password)
        if (!isCheckPassword) throw new BadRequestException('PASSWORD_NOT_VALID')
        return user
    }

    async createUser(user: CreateUser): Promise<User> {
        user.password = await this.hashPassword(user.password)
        const createUser = UseradapterEntity.createUserAdapter(user)
        return this.userRepository.createUser(createUser)
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async comparePasswords(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

}
