import { MigrationInterface, QueryRunner } from "typeorm";

export class UdpateSectionFieldEntityWithNullForResponsibility1764173092585 implements MigrationInterface {
    name = 'UdpateSectionFieldEntityWithNullForResponsibility1764173092585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_field" ALTER COLUMN "howToCheck" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_field" ALTER COLUMN "howToCheck" SET NOT NULL`);
    }

}
