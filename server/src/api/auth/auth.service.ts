import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/SignIn.dto';
import { SignUpDto } from './dto/SignUp.dto';
import { UserEntity } from 'src/entity/User/user.entity';
import { JwtTokenService } from 'src/service/jwt/jwt.token.service';
@Injectable()
export class AuthService {
    constructor(
        private readonly userEntity: UserEntity,
        private readonly jwtTokenService: JwtTokenService
    ) { }


    async signIn(signInUser: SignInDto) {
        const user = await this.userEntity.signInUser(signInUser)
        return this.jwtTokenService.generateToken({ id: user.id })
    }


    async signUp(signUpUser: SignUpDto) {
        const user = await this.userEntity.createUser(signUpUser)
        return this.jwtTokenService.generateToken({ id: user.id })
    }
}
