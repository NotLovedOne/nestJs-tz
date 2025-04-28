import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1745839603786 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          -- SQL из ТЗ
          CREATE TABLE fighters (
            id SERIAL PRIMARY KEY,
            full_name VARCHAR(120) NOT NULL,
            weight_class VARCHAR(30) NOT NULL,
            wins INT DEFAULT 0,
            losses INT DEFAULT 0
          );
          CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(120) NOT NULL,
            event_date DATE NOT NULL,
            location VARCHAR(120)
          );
          CREATE TABLE fights (
            id SERIAL PRIMARY KEY,
            event_id INT REFERENCES events(id) ON DELETE CASCADE,
            weight_class VARCHAR(30),
            result_json JSONB,
            fight_order INT
          );
          CREATE TABLE fight_participants (
            fight_id INT REFERENCES fights(id) ON DELETE CASCADE,
            fighter_id INT REFERENCES fighters(id) ON DELETE CASCADE,
            PRIMARY KEY (fight_id, fighter_id)
          );
          CREATE TABLE rankings (
            id SERIAL PRIMARY KEY,
            weight_class VARCHAR(30) NOT NULL,
            fighter_id INT REFERENCES fighters(id) ON DELETE CASCADE,
            position INT NOT NULL,
            UNIQUE (weight_class, position)
          );
        `);
      }
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          DROP TABLE IF EXISTS rankings;
          DROP TABLE IF EXISTS fight_participants;
          DROP TABLE IF EXISTS fights;
          DROP TABLE IF EXISTS events;
          DROP TABLE IF EXISTS fighters;
        `);
      }

}
