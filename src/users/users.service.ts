import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserInput: CreateUserInput) {
    const hashedPassword = await argon2.hash(createUserInput.password);
    const user = {
      ...createUserInput,
      password: hashedPassword,
    };
    await this.prismaService.user.create({
      data: {
        username: user.username,
        password: user.password,
      },
    });
    return user;
  }
  async findAll() {
    const users = await this.prismaService.user.findMany();
    if (!users || users.length == 0) throw new BadRequestException();
    return users;
  }

  async findOne(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) throw new BadRequestException();
    return user;
  }

  async updateWhenLogin(userId: number, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken,
      },
    });
  }
}
