import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateYearTypeInFocusArea1764153613925 implements MigrationInterface {
    name = 'UpdateYearTypeInFocusArea1764153613925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "focus_area" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "focus_area" ADD "year" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "focus_area" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "focus_area" ADD "year" TIMESTAMP NOT NULL`);
    }

}
