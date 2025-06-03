import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Fight } from './entities/fight.entity';
import { Event } from 'src/events/entities/event.entity';
import { Fighter } from 'src/fighters/entities/fighter.entity';
import { In, Repository } from 'typeorm';
import { RankingsService } from 'src/rankings/rankings.service';

@Injectable()
export class FightsService {
  constructor(
    @InjectRepository(Fight) private fightRepo: Repository<Fight>,
    @InjectRepository(Event) private eventRepo: Repository<Event>,
    @InjectRepository(Fighter) private fighterRepo: Repository<Fighter>,
    private readonly rankingsService: RankingsService,
  ) {}

  async create(dto: CreateFightInput) {
    const event = await this.eventRepo.findOne({ where: { id: dto.eventId } });
    if (!event) throw new NotFoundException('Event not found');

    const participants = await this.fighterRepo.find({
      where: { id: In(dto.participantsIds) },
    });

    const fight = this.fightRepo.create({
      weightClass: dto.weightClass,
      event,
      participants,
      resultJson: dto.resultJson,
    });

    const saved = await this.fightRepo.save(fight);

    if (saved.weightClass) {
      await this.rankingsService.recalc(saved.weightClass);
    }

    return saved;
  }

  async findAll() {
    return this.fightRepo.find({ relations: ['event', 'participants'] });
  }

  async findOne(id: number) {
    return this.fightRepo.findOne({
      where: { id },
      relations: ['event', 'participants'],
    });
  }

  async update(id: number, updateFightInput: UpdateFightInput) {
    const fight = await this.findOne(id);
    if (!fight) throw new NotFoundException('Fight not found');

    if (updateFightInput.eventId) {
      const event = await this.eventRepo.findOne({
        where: { id: updateFightInput.eventId },
      });
      if (!event) throw new NotFoundException('Event not found');
      fight.event = event;
    }
    if (updateFightInput.participantsIds) {
      fight.participants = await this.fighterRepo.find({
        where: { id: In(updateFightInput.participantsIds) },
      });
    }
    if (updateFightInput.weightClass !== undefined) {
      fight.weightClass = updateFightInput.weightClass;
    }
    if (updateFightInput.resultJson !== undefined) {
      fight.resultJson = updateFightInput.resultJson;
    }

    const saved = await this.fightRepo.save(fight);

    if (saved.weightClass) {
      await this.rankingsService.recalc(saved.weightClass);
    }

    return saved;
  }

  async remove(id: number) {
    const fight = await this.findOne(id);
    await this.fightRepo.delete(id);
    return fight;
  }
}
