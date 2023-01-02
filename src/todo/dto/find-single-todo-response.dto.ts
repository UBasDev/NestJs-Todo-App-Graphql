import { User } from 'src/users/entities/user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FindSingleTodoResponseDto {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  userId: number;

  @Field()
  User: User;
}
