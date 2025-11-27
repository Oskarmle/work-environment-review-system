import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTypeOnReportEntity1764244616427 implements MigrationInterface {
    name = 'UpdateTypeOnReportEntity1764244616427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "comment"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "comment" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "comment"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "comment" boolean NOT NULL`);
    }

}
