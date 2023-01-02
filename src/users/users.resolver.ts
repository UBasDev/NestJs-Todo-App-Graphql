import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CustomAccessTokenGuard } from 'src/auth/guards/custom-access-token.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  @UseGuards(CustomAccessTokenGuard)
  findAll(@Context() context) {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(CustomAccessTokenGuard)
  findOne(@Args('username') username: string) {
    return this.usersService.findOne(username);
  }
}
