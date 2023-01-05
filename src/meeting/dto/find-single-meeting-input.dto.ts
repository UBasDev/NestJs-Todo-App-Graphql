import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindSingleMeetingInputDto {
  @Field(() => Int)
  id: number;
}
