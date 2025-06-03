import { CreateFightInput } from './create-fight.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class UpdateFightInput extends PartialType(CreateFightInput) {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLJSONObject, { nullable: true })
  resultJson?: Record<string, unknown>;
}
