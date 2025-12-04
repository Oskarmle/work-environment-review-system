import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSectionFieldResponseToAcceptNullValues1764254537347 implements MigrationInterface {
    name = 'UpdateSectionFieldResponseToAcceptNullValues1764254537347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_field_response" ALTER COLUMN "imageUrl" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_field_response" ALTER COLUMN "imageUrl" SET NOT NULL`);
    }

}
