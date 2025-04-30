import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Fighter } from 'src/fighters/entities/fighter.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'rankings'})
@ObjectType()
export class Ranking {
  @Field(() => Int)  @PrimaryGeneratedColumn()
  id: number;

  @Field()          @Column({name: 'weight_class'})
  weightClass: string;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter, f => f.rankings, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'fighter_id'})
  fighter: Fighter;

  @Field(() => Int) @Column()
  position: number;
}