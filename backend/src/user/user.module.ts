import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PasswordService } from '../auth/password.service';

@Module({
    imports: [],
    providers: [UserResolver, UserService, PasswordService],
})
export class UserModule {
}
