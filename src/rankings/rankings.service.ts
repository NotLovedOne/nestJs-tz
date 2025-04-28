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
    @InjectRepository(Ranking) private rankingRepo: Repository<Ranking>,
    @InjectRepository(Fighter) private fighterRepo: Repository<Fighter>,
  ) {}

  /** ТОЛЬКО ЧТЕНИЕ ---------------------------------------------------- */
  findAll() {
    return this.rankingRepo.find({
      relations: { fighter: true },
      order: { weightClass: 'ASC', position: 'ASC' },
    });
  }

  findOne(id: number) {
    return this.rankingRepo.findOne({
      where: { id },
      relations: { fighter: true },
    });
  }

  /** ПЕРЕСЧЁТ --------------------------------------------------------- */
  async recalc(weightClass: string) {
    const fighters = await this.fighterRepo.find({ where: { weightClass } });

    // высчитываем очки во временном массиве, не трогаем entity
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