import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './models/user.model';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserService } from './user.service';
import { UserEntity } from '../common/decorators/user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { FilterUserInput } from './dto/filter-user.input';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
    constructor(
        private usersService: UserService,
    ) {
    }

    @Query(() => User)
    async me(@UserEntity() user: User): Promise<User> {
        return user;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => User)
    async updateUser(
        @UserEntity() user: User,
        @Args('data') newUserData: UpdateUserInput,
    ) {
        return this.usersService.updateUser(user.id, newUserData);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => User)
    async changePassword(
        @UserEntity() user: User,
        @Args('data') changePassword: ChangePasswordInput,
    ) {
        return this.usersService.changePassword(
            user.id,
            user.password,
            changePassword,
        );
    }

    @Query(() => [User])
    async getUsers(@Args('filter') filter: FilterUserInput): Promise<User[]> {
        return this.usersService.getUsers(filter);
    }
}
