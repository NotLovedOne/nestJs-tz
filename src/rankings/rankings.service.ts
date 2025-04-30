import { Injectable } from '@nestjs/common';
import { CreateRankingInput } from './dto/create-ranking.input';
import { UpdateRankingInput } from './dto/update-ranking.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Ranking } from './entities/ranking.entity';
import { Fighter } from 'src/fighters/entities/fighter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RankingsService {
  constructor(
    @InjectRepository(Ranking)
    private readonly rankingRepo: Repository<Ranking>,
    @InjectRepository(Fighter)
    private readonly fighterRepo: Repository<Fighter>,
  ) {}

  async create(input: CreateRankingInput): Promise<Ranking> {
    const fighter = await this.fighterRepo.findOneBy({ id: input.fighterId });
    if (!fighter) throw new Error('Fighter not found');

    const ranking = this.rankingRepo.create({
      weightClass: input.weightClass,
      position: input.position,
      fighter,
    });

    return this.rankingRepo.save(ranking);
  }

  async findAll(): Promise<Ranking[]> {
    return this.rankingRepo.find({ relations: ['fighter'] });
  }

  async findOne(id: number): Promise<Ranking | null> {
    return this.rankingRepo.findOne({ where: { id }, relations: ['fighter'] });
  }
  

  async recalc(weightClass: string) {
    const fighters = await this.fighterRepo.find({ where: { weightClass } });
    const rated = fighters
      .map(f => ({
        fighter: f,
        score: f.wins * 25 - f.losses * 15,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 15);

    await this.rankingRepo.delete({ weightClass });

    for (let i = 0; i < rated.length; i++) {
      await this.rankingRepo.save({
        fighter: rated[i].fighter,
        weightClass,
        position: i + 1,
      });
    }
  }
}