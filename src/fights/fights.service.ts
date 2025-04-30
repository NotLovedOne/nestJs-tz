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
    @InjectRepository(Fight)   private fightRepo:   Repository<Fight>,
    @InjectRepository(Event)   private eventRepo:   Repository<Event>,
    @InjectRepository(Fighter) private fighterRepo: Repository<Fighter>,
    private readonly rankingsService: RankingsService
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
    });

    if (fight.weightClass) {
      await this.rankingsService.recalc(fight.weightClass);
    }
    
    return this.fightRepo.save(fight);   
  }

  async findAll() {
    return this.fightRepo.find({ relations: ['event', 'participants'] }); 
  }

  async findOne(id: number) {
    return this.fightRepo.findOne({ where: { id }, relations: ['event', 'participants'] });
  }

  async update(id: number, updateFightInput: UpdateFightInput) {
    await this.fightRepo.update(id, updateFightInput);
    return this.findOne(id);
  }

  async remove(id: number) {
    const fight = await this.findOne(id);
    await this.fightRepo.delete(id);
    return fight;
  }
}
