import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FightersService } from './fighters.service';
import { Fighter } from './entities/fighter.entity';
import { FighterStats } from './entities/fighter-stats.entity';
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

  @Query(() => Fighter)
  fighter(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Query(() => FighterStats)
  fighterStats(@Args('id', { type: () => Int }) id: number) {
    return this.service.stats(id);
  }

  @Mutation(() => Fighter)
  updateFighter(@Args('input') input: UpdateFighterInput) {
    return this.service.update(input.id, input);
  }

  @Mutation(() => Fighter)
  removeFighter(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
