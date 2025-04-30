import { DataSource } from 'typeorm';
import { Fighter } from './fighters/entities/fighter.entity';
import { Event }   from './events/entities/event.entity';
import { Fight }   from './fights/entities/fight.entity';
import { Ranking } from './rankings/entities/ranking.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url:  process.env.DATABASE_URL,
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
  
});

