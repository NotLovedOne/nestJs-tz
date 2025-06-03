import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FighterStats {
  @Field(() => Int)
  wins: number;

  @Field(() => Int)
  losses: number;

  @Field(() => Int)
  knockouts: number;

  @Field(() => Int)
  submissions: number;
}
