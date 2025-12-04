import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveManyToManyBetweenReportAndInitialCheck1764246002705 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints first
        await queryRunner.query(`ALTER TABLE "report_initial_checks_initial_check" DROP CONSTRAINT "FK_245b3f834208d5c39af57a6f04d"`);
        await queryRunner.query(`ALTER TABLE "report_initial_checks_initial_check" DROP CONSTRAINT "FK_267b29c346880c058a61711dc68"`);
        
        // Drop indexes
        await queryRunner.query(`DROP INDEX "public"."IDX_245b3f834208d5c39af57a6f04"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_267b29c346880c058a61711dc6"`);
        
        // Drop the join table
        await queryRunner.query(`DROP TABLE "report_initial_checks_initial_check"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Recreate the join table
        await queryRunner.query(`CREATE TABLE "report_initial_checks_initial_check" ("reportId" uuid NOT NULL, "initialCheckId" uuid NOT NULL, CONSTRAINT "PK_e6e9f883031b204ea0db7912216" PRIMARY KEY ("reportId", "initialCheckId"))`);
        
        // Recreate indexes
        await queryRunner.query(`CREATE INDEX "IDX_267b29c346880c058a61711dc6" ON "report_initial_checks_initial_check" ("reportId") `);
        await queryRunner.query(`CREATE INDEX "IDX_245b3f834208d5c39af57a6f04" ON "report_initial_checks_initial_check" ("initialCheckId") `);
        
        // Recreate foreign key constraints
        await queryRunner.query(`ALTER TABLE "report_initial_checks_initial_check" ADD CONSTRAINT "FK_267b29c346880c058a61711dc68" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "report_initial_checks_initial_check" ADD CONSTRAINT "FK_245b3f834208d5c39af57a6f04d" FOREIGN KEY ("initialCheckId") REFERENCES "initial_check"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
