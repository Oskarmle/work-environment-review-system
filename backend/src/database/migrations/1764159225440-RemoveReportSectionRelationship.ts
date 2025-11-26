import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveReportSectionRelationship1764159225440
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key constraints first
    await queryRunner.query(
      `ALTER TABLE "report_sections_section" DROP CONSTRAINT "FK_673d9ae83a0930751d87563eafe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "report_sections_section" DROP CONSTRAINT "FK_51409c3ddf5af7025245222ca94"`,
    );

    // Drop the indexes
    await queryRunner.query(
      `DROP INDEX "public"."IDX_673d9ae83a0930751d87563eaf"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_51409c3ddf5af7025245222ca9"`,
    );

    // Drop the join table
    await queryRunner.query(`DROP TABLE "report_sections_section"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Recreate the join table
    await queryRunner.query(
      `CREATE TABLE "report_sections_section" ("reportId" uuid NOT NULL, "sectionId" uuid NOT NULL, CONSTRAINT "PK_fe0eb8794a9878c1a32bcb22b72" PRIMARY KEY ("reportId", "sectionId"))`,
    );

    // Recreate the indexes
    await queryRunner.query(
      `CREATE INDEX "IDX_51409c3ddf5af7025245222ca9" ON "report_sections_section" ("reportId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_673d9ae83a0930751d87563eaf" ON "report_sections_section" ("sectionId") `,
    );

    // Recreate the foreign keys
    await queryRunner.query(
      `ALTER TABLE "report_sections_section" ADD CONSTRAINT "FK_51409c3ddf5af7025245222ca94" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "report_sections_section" ADD CONSTRAINT "FK_673d9ae83a0930751d87563eafe" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
