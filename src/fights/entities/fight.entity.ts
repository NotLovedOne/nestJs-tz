import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Fighter } from '../../fighters/entities/fighter.entity';
import { Event } from '../../events/entities/event.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GraphQLJSONObject } from 'graphql-type-json';

@Entity({name : 'fights'})
@ObjectType()
export class Fight {
  @Field(() => Int)  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Event)
  @ManyToOne(() => Event, e => e.fights, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' }) 
  event: Event;

  @Field({ nullable: true }) @Column({ nullable: true ,name: 'weight_class'})
  weightClass?: string;

  @Field(() => GraphQLJSONObject, { nullable: true }) 
  @Column({ type: 'jsonb', nullable: true,name: 'result_json' })
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