import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

@InputType()
export class CreateRankingInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  weightClass: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  fighterId: number;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  position: number;
}
