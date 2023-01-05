import { InputType, Int, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field()
  title: string;

  @Field(() => [String], { nullable: true })
  meetingNames?: [string];
}
