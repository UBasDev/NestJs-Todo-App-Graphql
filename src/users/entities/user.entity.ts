import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Todo } from 'src/todo/entities/todo.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field(() => [Todo])
  todos: [Todo];
}
