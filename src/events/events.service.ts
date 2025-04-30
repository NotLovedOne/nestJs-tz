import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
  ) {}

  create(createEventInput: CreateEventInput) {
    const entity: Partial<Event> = {
      title:       createEventInput.title,
      eventDate:   new Date(createEventInput.eventDate), 
      location:    createEventInput.location,
    };
  
    return this.repo.save(entity);          
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    return this.repo.findOneBy({ id });
  }  

  async update(id: number, updateEventInput: UpdateEventInput) {
    const event = await this.repo.findOne({ where: { id } });
  
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
  
    // Обновляем только обычные поля
    if (updateEventInput.title !== undefined) {
      event.title = updateEventInput.title;
    }
    if (updateEventInput.location !== undefined) {
      event.location = updateEventInput.location;
    }
    if (updateEventInput.eventDate !== undefined) {
      event.eventDate = new Date(updateEventInput.eventDate);
    }
  
    await this.repo.save(event);
    return event;
  }

  async remove(id: number) {
    const event = await this.findOne(id);
    await this.repo.delete(id);
    return event;
  }

  async upcoming(): Promise<Event[]> {
    return this.repo.find({
      where: { eventDate: MoreThanOrEqual(new Date()) },
      order: { eventDate: 'ASC' },
    });
  }
  
}
