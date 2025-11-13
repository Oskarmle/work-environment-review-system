import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSectionFieldsResponse1763035127694 implements MigrationInterface {
    name = 'CreateSectionFieldsResponse1763035127694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "section_field_response" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying NOT NULL, "imageUrl" character varying NOT NULL, "isCompleted" boolean NOT NULL, "isRelevant" boolean NOT NULL, "isOkay" boolean NOT NULL, "sectionFieldId" uuid, "reportId" uuid, CONSTRAINT "PK_a8fd1a8debae87b71a75088c215" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "section_field_response" ADD CONSTRAINT "FK_d6d972d309e322fdbae63782bd9" FOREIGN KEY ("sectionFieldId") REFERENCES "section_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "section_field_response" ADD CONSTRAINT "FK_aeedc25f15bb98652f1fd03d171" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_field_response" DROP CONSTRAINT "FK_aeedc25f15bb98652f1fd03d171"`);
        await queryRunner.query(`ALTER TABLE "section_field_response" DROP CONSTRAINT "FK_d6d972d309e322fdbae63782bd9"`);
        await queryRunner.query(`DROP TABLE "section_field_response"`);
    }

}
