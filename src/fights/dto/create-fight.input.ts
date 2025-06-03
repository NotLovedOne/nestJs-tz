import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import {
  IsArray,
  ArrayNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

@InputType()
export class CreateFightInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  eventId: number;

  @Field()
  @IsString()
  weightClass: string;

  @Field(() => [Int])
  @IsArray()
  @ArrayNotEmpty()
  participantsIds: number[];

  @Field(() => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  resultJson?: Record<string, unknown>;
}
