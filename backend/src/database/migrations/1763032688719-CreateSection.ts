import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSection1763032688719 implements MigrationInterface {
    name = 'CreateSection1763032688719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "section" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "report_sections_section" ("reportId" uuid NOT NULL, "sectionId" uuid NOT NULL, CONSTRAINT "PK_fe0eb8794a9878c1a32bcb22b72" PRIMARY KEY ("reportId", "sectionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_51409c3ddf5af7025245222ca9" ON "report_sections_section" ("reportId") `);
        await queryRunner.query(`CREATE INDEX "IDX_673d9ae83a0930751d87563eaf" ON "report_sections_section" ("sectionId") `);
        await queryRunner.query(`ALTER TABLE "report_sections_section" ADD CONSTRAINT "FK_51409c3ddf5af7025245222ca94" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "report_sections_section" ADD CONSTRAINT "FK_673d9ae83a0930751d87563eafe" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report_sections_section" DROP CONSTRAINT "FK_673d9ae83a0930751d87563eafe"`);
        await queryRunner.query(`ALTER TABLE "report_sections_section" DROP CONSTRAINT "FK_51409c3ddf5af7025245222ca94"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_673d9ae83a0930751d87563eaf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_51409c3ddf5af7025245222ca9"`);
        await queryRunner.query(`DROP TABLE "report_sections_section"`);
        await queryRunner.query(`DROP TABLE "section"`);
    }

}
