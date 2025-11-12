import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStations1762962492608 implements MigrationInterface {
    name = 'CreateStations1762962492608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "stationName" character varying NOT NULL, CONSTRAINT "PK_f047974bd453c85b08bab349367" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stations"`);
    }

}
