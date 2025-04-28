import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Fight } from 'src/fights/entities/fight.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Event {
  @Field(() => Int)  @PrimaryGeneratedColumn()
  id: number;

  @Field()          @Column()
  title: string;

  @Field()          @Column({ type: 'date' })
  eventDate: Date;

  @Field({ nullable: true }) @Column({ nullable: true })
  location?: string;

  @OneToMany(() => Fight, f => f.event)
  fights: Fight[];
}
