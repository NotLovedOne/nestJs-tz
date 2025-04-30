import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Fight } from 'src/fights/entities/fight.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'events' })
@ObjectType()
export class Event {
  @Field(() => Int)  
  @PrimaryGeneratedColumn()
  id: number;

  @Field()          
  @Column()
  title: string;

  @Field(() => GraphQLISODateTime)        
  @Column({ type: 'date', name : 'event_date' })
  eventDate: Date;

  @Field({ nullable: true }) 
  @Column({ nullable: true })
  location?: string;

  @OneToMany(() => Fight, f => f.event)
  fights: Fight[];
}
