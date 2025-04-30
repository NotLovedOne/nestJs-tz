import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFighterExtraFields1746000123456 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE fighters
        ADD COLUMN knockouts   INT DEFAULT 0,
        ADD COLUMN submissions INT DEFAULT 0,
        ADD COLUMN nationality VARCHAR(120),
        ADD COLUMN team        VARCHAR(120);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE fighters
        DROP COLUMN IF EXISTS team,
        DROP COLUMN IF EXISTS nationality,
        DROP COLUMN IF EXISTS submissions,
        DROP COLUMN IF EXISTS knockouts;
    `);
  }
}

