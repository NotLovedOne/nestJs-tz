import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RankingsService } from './rankings.service';
import { Ranking } from './entities/ranking.entity';
import { CreateRankingInput } from './dto/create-ranking.input';
import { UpdateRankingInput } from './dto/update-ranking.input';

@Resolver(() => Ranking)
export class RankingsResolver {
  constructor(private readonly rankingsService: RankingsService) {}

  @Query(() => [Ranking], { name: 'rankings' })
  findAll() {
    return this.rankingsService.findAll();
  }

  @Query(() => Ranking, { name: 'ranking' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rankingsService.findOne(id);
  }
}
