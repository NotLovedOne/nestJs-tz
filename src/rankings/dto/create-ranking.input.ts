import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRankingInput {
  @Field() weightClass: string;

  @Field(() => Int) fighterId: number;

  @Field(() => Int) position: number;
}