import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveMailEntity1766058963903 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "mail"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Recreate the table if needed for rollback
        await queryRunner.query(`CREATE TABLE "mail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), /* add other columns if you remember them */, CONSTRAINT "PK_[id]" PRIMARY KEY ("id"))`);
    }
}