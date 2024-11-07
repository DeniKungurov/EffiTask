import { CreateUser } from "./user.entity.d"
import { CreateUserParams } from "src/repository/user/user.repository.d"
export class UseradapterEntity {

    static createUserAdapter(user: CreateUser): CreateUserParams {
        const { email, password, login } = user
        return {
            email,
            password,
            businessEntityName: login,
            relationTypeCode: 'user',
            businessEntityTypeCode: 'user'
        }
    }

}
