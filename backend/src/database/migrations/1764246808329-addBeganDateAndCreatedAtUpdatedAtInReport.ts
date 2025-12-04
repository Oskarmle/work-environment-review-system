import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBeganDateAndCreatedAtUpdatedAtInReport1764246808329 implements MigrationInterface {
    name = 'AddBeganDateAndCreatedAtUpdatedAtInReport1764246808329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" ADD "reportBeganAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "report" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "reportBeganAt"`);
    }

}
