import { Injectable } from '@nestjs/common';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';

@Injectable()
export class FightsService {
  create(createFightInput: CreateFightInput) {
    return 'This action adds a new fight';
  }

  findAll() {
    return `This action returns all fights`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fight`;
  }

  update(id: number, updateFightInput: UpdateFightInput) {
    return `This action updates a #${id} fight`;
  }

  remove(id: number) {
    return `This action removes a #${id} fight`;
  }
}
