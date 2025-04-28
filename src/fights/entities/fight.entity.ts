import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Event } from '../../events/entities/event.entity';
import { Fighter } from '../../fighters/entities/fighter.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GraphQLJSONObject } from 'graphql-type-json';

@Entity()
@ObjectType()
export class Fight {
  @Field(() => Int)  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Event)
  @ManyToOne(() => Event, e => e.fights, { onDelete: 'CASCADE' })
  event: Event;

  @Field({ nullable: true }) @Column({ nullable: true })
  weightClass?: string;

  @Field(() => GraphQLJSONObject, { nullable: true }) 
  @Column({ type: 'jsonb', nullable: true })
  resultJson?: Record<string, unknown>;

  @Field(() => [Fighter])
  @ManyToMany(() => Fighter, f => f.fights)
  @JoinTable({
    name: 'fight_participants',
    joinColumn: { name: 'fight_id' },
    inverseJoinColumn: { name: 'fighter_id' },
  })
  participants: Fighter[];
}