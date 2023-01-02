import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class FindAllTodosResponseDto {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  userId: number;

  @Field()
  User: User;
}
