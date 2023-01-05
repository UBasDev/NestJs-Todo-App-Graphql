import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMeetingInput {
  @Field()
  name: string;

  @Field()
  todoId: number;
}
