import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class UserInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field(() => Int)
  wardNo: number;
  @Field()
  firstname: string;
  @Field()
  lastname: string;
  @Field()
  email: string;
  @Field(() => Int)
  phoneNumber: number;
  @Field(() => Int)
  verificationCode: number;
}
