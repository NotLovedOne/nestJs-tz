import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFighterInput {
  @Field() fullName: string;
  @Field() weightClass: string;
  @Field(() => Int, { defaultValue: 0 }) knockouts?: number;
  @Field(() => Int, { defaultValue: 0 }) submissions?: number;
  @Field({ nullable: true }) nationality?: string;
  @Field({ nullable: true }) team?: string;
}
