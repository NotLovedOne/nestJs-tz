import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Fight } from 'src/fights/entities/fight.entity';
import { Ranking } from 'src/rankings/entities/ranking.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'fighters' })
@ObjectType()
export class Fighter {
  @Field(() => Int)  @PrimaryGeneratedColumn()
  id: number;

  @Field()          
  @Column({name : 'full_name'})
  fullName: string;

  @Field()          
  @Column({name : 'weight_class'})
  weightClass: string;

  @Field(() => Int) 
  @Column({ default: 0 })
  wins: number;

  @Field(() => Int) 
  @Column({ default: 0 })
  losses: number;

  /* связи */
  @ManyToMany(() => Fight, fight => fight.participants)
  fights: Fight[];

  @OneToMany(() => Ranking, r => r.fighter)
  rankings: Ranking[];
}
