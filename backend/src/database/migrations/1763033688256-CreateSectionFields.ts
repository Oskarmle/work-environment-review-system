import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSectionFields1763033688256 implements MigrationInterface {
    name = 'CreateSectionFields1763033688256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "section_field" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "whatToCheck" character varying NOT NULL, "lawInspection" boolean NOT NULL, "internalControl" boolean NOT NULL, "howToCheck" character varying NOT NULL, "responsibility" character varying NOT NULL, "sectionId" uuid, CONSTRAINT "PK_51ac8f1ea277dbe91dd5c4826c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "section_field" ADD CONSTRAINT "FK_17effd767edebb0d16e9169c083" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_field" DROP CONSTRAINT "FK_17effd767edebb0d16e9169c083"`);
        await queryRunner.query(`DROP TABLE "section_field"`);
    }

}
