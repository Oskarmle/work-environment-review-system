import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserReportRelationship1765547630184 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints first
        await queryRunner.query(`ALTER TABLE "report_users_user" DROP CONSTRAINT "FK_f7c3a1b08cd856906cabd67c7d7"`);
        await queryRunner.query(`ALTER TABLE "report_users_user" DROP CONSTRAINT "FK_79c91358396d475d5e763c3d0e8"`);
        
        // Drop indexes
        await queryRunner.query(`DROP INDEX "public"."IDX_f7c3a1b08cd856906cabd67c7d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_79c91358396d475d5e763c3d0e"`);
        
        // Drop the junction table
        await queryRunner.query(`DROP TABLE "report_users_user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Recreate the junction table
        await queryRunner.query(`CREATE TABLE "report_users_user" ("reportId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_2ecd0be00a5640a370d64a478be" PRIMARY KEY ("reportId", "userId"))`);
        
        // Recreate indexes
        await queryRunner.query(`CREATE INDEX "IDX_79c91358396d475d5e763c3d0e" ON "report_users_user" ("reportId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f7c3a1b08cd856906cabd67c7d" ON "report_users_user" ("userId") `);
        
        // Recreate foreign key constraints
        await queryRunner.query(`ALTER TABLE "report_users_user" ADD CONSTRAINT "FK_79c91358396d475d5e763c3d0e8" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "report_users_user" ADD CONSTRAINT "FK_f7c3a1b08cd856906cabd67c7d7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
