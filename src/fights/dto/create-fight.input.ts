import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFightInput {
  @Field(() => Int) eventId: number;
  @Field() weightClass: string;
  @Field(() => [Int]) participantsIds: number[];
}
