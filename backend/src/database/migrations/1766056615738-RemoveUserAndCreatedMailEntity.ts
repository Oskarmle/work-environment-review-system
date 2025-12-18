import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserAndCreatedMailEntity1766056615738 implements MigrationInterface {
    name = 'RemoveUserAndCreatedMailEntity1766056615738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "mail" character varying NOT NULL, CONSTRAINT "PK_5407da42b983ba54c6c62d462d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "mail"`);
    }

}
