import { Module, Global } from '@nestjs/common';
import { UserEntity } from './User/user.entity';
import { RepositoryModule } from 'src/repository/repository.module';

@Global()
@Module({
    imports: [RepositoryModule],
    exports: [UserEntity],
    providers: [UserEntity],
})
export class EntityModule { }
