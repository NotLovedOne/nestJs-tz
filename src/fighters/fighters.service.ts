import { Injectable } from '@nestjs/common';
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
}
