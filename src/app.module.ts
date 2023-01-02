import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //Bunları Code-First için yazıyoruz, otomatik generate edecektir
      sortSchema: true,
      debug: true,
      playground: true,
    }),
    UsersModule,
    AuthModule,
    TodoModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
