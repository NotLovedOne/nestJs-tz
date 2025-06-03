import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Fighter } from './entities/fighter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FightersService {
  constructor(
    @InjectRepository(Fighter)
    private readonly repo: Repository<Fighter>,
  ) {}

  create(dto: CreateFighterInput) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const fighter = await this.repo.findOneBy({ id });
    if (!fighter)
      throw new NotFoundException(`Fighter with id ${id} not found`);
    return fighter;
  }

  async update(id: number, dto: UpdateFighterInput) {
    const fighter = await this.findOne(id);
    Object.assign(fighter, dto);
    return this.repo.save(fighter);
  }

  async remove(id: number) {
    const fighter = await this.findOne(id);
    await this.repo.delete(id);
    return fighter;
  }

  async stats(id: number) {
    const fighter = await this.findOne(id);
    return {
      wins: fighter.wins,
      losses: fighter.losses,
      knockouts: fighter.knockouts,
      submissions: fighter.submissions,
    };
  }
}
