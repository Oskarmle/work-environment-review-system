import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStation1763028178062 implements MigrationInterface {
    name = 'CreateStation1763028178062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "station" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "stationName" character varying NOT NULL, CONSTRAINT "PK_cad1b3e7182ef8df1057b82f6aa" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "station"`);
    }

}
