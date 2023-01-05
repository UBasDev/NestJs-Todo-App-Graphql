import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Meeting {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  todoId: number;
}
