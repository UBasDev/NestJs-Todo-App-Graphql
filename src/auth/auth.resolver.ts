import { CustomRefreshTokenGuard } from './guards/custom-refresh-token.guard';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginUserInputDto } from './dto/login-user-input.dto';
import { UseGuards } from '@nestjs/common';
import { CustomGqlAuthGuard } from './guards/custom-gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { SignupUserInputDto } from './dto/signup-user-input.dto';
import { RefreshTokenResponseDto } from './dto/refresh-token-response.dto';
import { GetUserDecorator } from './decorators/get-user.decorator';
import { GetHeaderRefreshTokenDecorator } from './decorators/get-header-refresh-token.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponseDto) //Mutationın döndüreceği valuenin türünü belirttik
  @UseGuards(CustomGqlAuthGuard)
  login(
    @Args('loginUserInputDto') loginUserInputDto: LoginUserInputDto,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  signup(@Args('signupUserInputDto') signupUserInputDto: SignupUserInputDto) {
    return this.authService.signup(signupUserInputDto);
  }

  @UseGuards(CustomRefreshTokenGuard)
  @Query(() => RefreshTokenResponseDto, { name: 'refresh' })
  async refresh(
    @GetUserDecorator() user: User,
    @GetHeaderRefreshTokenDecorator() refreshToken: string,
  ) {
    return this.authService.refresh(refreshToken, user);
  }
}
