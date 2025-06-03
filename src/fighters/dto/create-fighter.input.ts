import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class CreateFighterInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  weightClass: string;

  @Field(() => Int, { defaultValue: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  knockouts?: number;

  @Field(() => Int, { defaultValue: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  submissions?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  nationality?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  team?: string;
}
