import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFighterInput {
  @Field() fullName: string;
  @Field() weightClass: string;
}
