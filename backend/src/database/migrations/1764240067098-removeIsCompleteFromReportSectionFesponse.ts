import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveIsCompleteFromReportSectionFesponse1764240067098 implements MigrationInterface {
    name = 'RemoveIsCompleteFromReportSectionFesponse1764240067098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_field_response" DROP COLUMN "isCompleted"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_field_response" ADD "isCompleted" boolean NOT NULL`);
    }

}
