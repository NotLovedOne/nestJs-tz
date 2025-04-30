import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FightsService } from './fights.service';
import { Fight } from './entities/fight.entity';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';

@Resolver(() => Fight)
export class FightsResolver {
  constructor(private readonly fightsService: FightsService) {}

  @Mutation(() => Fight)
  createFight(@Args('input') input: CreateFightInput) {
    return this.fightsService.create(input);
  }

  @Query(() => [Fight], { name: 'fights' })
  findAll() {
    return this.fightsService.findAll();
  }

  @Query(() => Fight, { name: 'fight' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.fightsService.findOne(id);
  }

  @Mutation(() => Fight)
  updateFight(@Args('updateFightInput') updateFightInput: UpdateFightInput) {
    return this.fightsService.update(updateFightInput.id, updateFightInput);
  }

  @Mutation(() => Fight)
  removeFight(@Args('id', { type: () => Int }) id: number) {
    return this.fightsService.remove(id);
  }
}
