import { PrismaService } from 'nestjs-prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PasswordService } from '../auth/password.service';
import { FilterUserInput } from './dto/filter-user.input';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private passwordService: PasswordService,
    ) {
    }

    updateUser(userId: string, newUserData: UpdateUserInput) {
        return this.prisma.user.update({
            data: newUserData,
            where: {
                id: userId,
            },
        });
    }

    async changePassword(
        userId: string,
        userPassword: string,
        changePassword: ChangePasswordInput,
    ) {
        const passwordValid = await this.passwordService.validatePassword(
            changePassword.oldPassword,
            userPassword,
        );

        if (!passwordValid) {
            throw new BadRequestException('Invalid password');
        }

        const hashedPassword = await this.passwordService.hashPassword(
            changePassword.newPassword,
        );

        return this.prisma.user.update({
            data: {
                password: hashedPassword,
            },
            where: { id: userId },
        });
    }

    async getUsers(filter: FilterUserInput) {
        return this.prisma.user.findMany({ where: { ...filter } });
    }
}
