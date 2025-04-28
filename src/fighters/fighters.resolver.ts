import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FightersService } from './fighters.service';
import { Fighter } from './entities/fighter.entity';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';

@Resolver(() => Fighter)
export class FightersResolver {
  constructor(private service: FightersService) {}

  @Mutation(() => Fighter)
  createFighter(@Args('input') input: CreateFighterInput) {
    return this.service.create(input);       
  }


  @Query(() => [Fighter])
  fighters() {
    return this.service.findAll();
  }
}