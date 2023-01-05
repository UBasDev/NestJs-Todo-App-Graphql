import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Meeting } from '../../meeting/entities/meeting.entity';

@ObjectType()
export class Todo {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  userId: number;

  @Field(() => [Meeting], { nullable: true })
  meetings?: [Meeting];
}
