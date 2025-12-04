import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFocusArea1763027941078 implements MigrationInterface {
    name = 'CreateFocusArea1763027941078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "focus_area" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "year" TIMESTAMP NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "PK_483e49c3f933de099ce8ea4621e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "focus_area"`);
    }

}
