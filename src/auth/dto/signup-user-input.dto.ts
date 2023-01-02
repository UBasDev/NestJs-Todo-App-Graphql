import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignupUserInputDto {
  @Field()
  username: string;
  @Field()
  password: string;
}
