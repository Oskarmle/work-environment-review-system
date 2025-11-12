import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFocusArea1762963842864 implements MigrationInterface {
    name = 'CreateFocusArea1762963842864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "focus_areas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "year" TIMESTAMP NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "PK_317abcba4c7147c28f58c875870" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "focus_areas"`);
    }

}
