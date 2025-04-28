import { Module } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { RankingsResolver } from './rankings.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking } from './entities/ranking.entity';
import { Fighter } from 'src/fighters/entities/fighter.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Ranking, Fighter]), ],
  providers: [RankingsResolver, RankingsService],
})
export class RankingsModule {}
