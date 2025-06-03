import { InputType, Field } from '@nestjs/graphql';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateEventInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsDateString()
  eventDate: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  location?: string;
}
