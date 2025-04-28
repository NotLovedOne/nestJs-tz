import { Module } from '@nestjs/common';
import { FightersService } from './fighters.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { FightersResolver } from './fighters.resolver';
import { Fighter } from './entities/fighter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter])],
  providers: [FightersResolver, FightersService],
  exports: [],                          
})
export class FightersModule {}
