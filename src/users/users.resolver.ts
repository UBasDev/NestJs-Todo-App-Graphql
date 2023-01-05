import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CustomAccessTokenGuard } from 'src/auth/guards/custom-access-token.guard';
import { GetRolesDecorator } from 'src/auth/decorators/get-roles.decorator';
import { CustomRolesGuard } from 'src/auth/guards/custom-roles.guard';

@UseGuards(CustomAccessTokenGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  @UseGuards(CustomRolesGuard)
  @GetRolesDecorator('Admin')
  findAll(@Context() context) {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('username') username: string) {
    return this.usersService.findOne(username);
  }
}
