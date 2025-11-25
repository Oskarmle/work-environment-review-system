import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReportWithInitialCheckEntity1764087142283 implements MigrationInterface {
    name = 'UpdateReportWithInitialCheckEntity1764087142283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "initial_check" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "checkName" character varying NOT NULL, CONSTRAINT "PK_e4a0b5c2e110f8898360e27b7b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "report_initial_checks_initial_check" ("reportId" uuid NOT NULL, "initialCheckId" uuid NOT NULL, CONSTRAINT "PK_e6e9f883031b204ea0db7912216" PRIMARY KEY ("reportId", "initialCheckId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_267b29c346880c058a61711dc6" ON "report_initial_checks_initial_check" ("reportId") `);
        await queryRunner.query(`CREATE INDEX "IDX_245b3f834208d5c39af57a6f04" ON "report_initial_checks_initial_check" ("initialCheckId") `);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "doesAmgKnowTasks"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "reportAccidents"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "workWithRelevantAmgAreas"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "followUpApvAndWellBeing"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "actionPlanMade"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "revisedAt"`);
        await queryRunner.query(`ALTER TABLE "report_initial_checks_initial_check" ADD CONSTRAINT "FK_267b29c346880c058a61711dc68" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "report_initial_checks_initial_check" ADD CONSTRAINT "FK_245b3f834208d5c39af57a6f04d" FOREIGN KEY ("initialCheckId") REFERENCES "initial_check"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report_initial_checks_initial_check" DROP CONSTRAINT "FK_245b3f834208d5c39af57a6f04d"`);
        await queryRunner.query(`ALTER TABLE "report_initial_checks_initial_check" DROP CONSTRAINT "FK_267b29c346880c058a61711dc68"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "revisedAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ADD "actionPlanMade" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ADD "followUpApvAndWellBeing" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ADD "workWithRelevantAmgAreas" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ADD "reportAccidents" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ADD "doesAmgKnowTasks" boolean NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_245b3f834208d5c39af57a6f04"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_267b29c346880c058a61711dc6"`);
        await queryRunner.query(`DROP TABLE "report_initial_checks_initial_check"`);
        await queryRunner.query(`DROP TABLE "initial_check"`);
    }

}
