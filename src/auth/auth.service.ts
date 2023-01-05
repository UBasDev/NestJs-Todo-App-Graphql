import { LoginUserInputDto } from './dto/login-user-input.dto';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { SignupUserInputDto } from './dto/signup-user-input.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isPasswordMatch = await argon2.verify(user.password, password);
    if (user && isPasswordMatch) {
      const { password, ...restOfUser } = user;
      return restOfUser;
    }
    return null;
  }
  async login(user: User) {
    const isUserExists = await this.prismaService.user.findFirst({
      where: {
        id: user.id,
        username: user.username,
      },
      include: {
        Role: true,
      },
    });
    if (!isUserExists) throw new UnauthorizedException();
    const access_token = await this.getAccessToken(
      user.id,
      user.username,
      isUserExists.Role.name,
    );
    const refresh_token = await this.getRefreshToken(user.id, user.username);
    await this.usersService.updateWhenLogin(user.id, refresh_token);
    return {
      access_token,
      refresh_token,
      user,
    };
  }

  async signup(signupUserInputDto: SignupUserInputDto) {
    const user = await this.usersService.findOne(signupUserInputDto.username);
    if (user) throw new BadRequestException('User already exists!');
    return await this.usersService.create({
      username: signupUserInputDto.username,
      password: signupUserInputDto.password,
    });
  }

  async refresh(refreshToken: string, user: any) {
    const currentUser = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        Role: true,
      },
    });
    if (!currentUser) throw new UnauthorizedException();
    const isRefreshTokenMatch = await argon2.verify(
      currentUser.hashedRefreshToken,
      refreshToken,
    );
    if (!isRefreshTokenMatch) throw new UnauthorizedException();
    const newAccessToken = await this.getAccessToken(
      user.id,
      user.username,
      currentUser.Role.name,
    );
    const newRefreshToken = await this.getRefreshToken(user.id, user.username);
    const newHashedRefreshToken = await argon2.hash(newRefreshToken);
    const updatedUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        hashedRefreshToken: newHashedRefreshToken,
      },
    });
    if (!updatedUser) throw new BadRequestException();
    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      user,
    };
  }

  getAccessToken = async (sub: number, username: string, roleName: string) => {
    const access_token = await this.jwtService.signAsync(
      {
        sub,
        username,
        role: roleName,
      },
      {
        algorithm: 'HS512',
        expiresIn: '15m',
        secret: 'access_token_secret_key',
      },
    );
    return access_token;
  };

  getRefreshToken = async (sub: number, username: string) => {
    const refresh_token = await this.jwtService.signAsync(
      {
        sub,
        username,
      },
      {
        algorithm: 'HS512',
        expiresIn: '30m',
        secret: 'refresh_token_secret_key',
      },
    );
    return refresh_token;
  };
}
