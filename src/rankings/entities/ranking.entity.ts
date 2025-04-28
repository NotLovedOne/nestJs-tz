import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Fighter } from 'src/fighters/entities/fighter.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Ranking {
  @Field(() => Int)  @PrimaryGeneratedColumn()
  id: number;

  @Field()          @Column()
  weightClass: string;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter, f => f.rankings, { onDelete: 'CASCADE' })
  fighter: Fighter;

  @Field(() => Int) @Column()
  position: number;
}