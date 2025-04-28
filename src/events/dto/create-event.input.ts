import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field() title: string;
  @Field() eventDate: string;       
  @Field({ nullable: true }) location?: string;
}
