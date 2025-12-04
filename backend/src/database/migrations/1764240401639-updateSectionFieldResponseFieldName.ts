import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSectionFieldResponseFieldName1764240401639 implements MigrationInterface {
    name = 'UpdateSectionFieldResponseFieldName1764240401639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_field_response" RENAME COLUMN "isRelevant" TO "isNotRelevant"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_field_response" RENAME COLUMN "isNotRelevant" TO "isRelevant"`);
    }

}
