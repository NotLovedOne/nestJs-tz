import { CreateRankingInput } from './create-ranking.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRankingInput extends PartialType(CreateRankingInput) {
  @Field(() => Int)
  id: number;
}
