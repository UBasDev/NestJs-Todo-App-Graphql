import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RemoveMeetingInputDto {
  @Field(() => Int)
  id: number;
}
