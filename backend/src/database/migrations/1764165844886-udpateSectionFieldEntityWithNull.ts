import { MigrationInterface, QueryRunner } from "typeorm";

export class UdpateSectionFieldEntityWithNull1764165844886 implements MigrationInterface {
    name = 'UdpateSectionFieldEntityWithNull1764165844886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_field" ALTER COLUMN "responsibility" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_field" ALTER COLUMN "responsibility" SET NOT NULL`);
    }

}
