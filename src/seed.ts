import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { Fighter } from './fighters/entities/fighter.entity';
import { Event } from './events/entities/event.entity';
import { Fight } from './fights/entities/fight.entity';

async function run() {
  await AppDataSource.initialize();

  const fighterRepo = AppDataSource.getRepository(Fighter);
  const eventRepo   = AppDataSource.getRepository(Event);
  const fightRepo   = AppDataSource.getRepository(Fight);

  const jon  = await fighterRepo.save({ fullName: 'Jon Jones', weightClass: 'Light Heavyweight' });
  const izzy = await fighterRepo.save({ fullName: 'Israel Adesanya', weightClass: 'Middleweight' });

  const ufc300 = await eventRepo.save({
    title: 'UFC 300',
    eventDate: new Date('2025-05-12'),
    location: 'Las Vegas',
  });

  await fightRepo.save({
    weightClass: 'Light Heavyweight',
    event: ufc300,
    participants: [jon, izzy],
    resultJson: { winner: jon.fullName, method: 'KO', round: 2 },
  });

  console.log('Seed complete');
  await AppDataSource.destroy();
}

run().catch(console.error);