import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReport1763029220045 implements MigrationInterface {
    name = 'CreateReport1763029220045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "report" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "doesAmgKnowTasks" boolean NOT NULL, "reportAccidents" boolean NOT NULL, "workWithRelevantAmgAreas" boolean NOT NULL, "followUpApvAndWellBeing" boolean NOT NULL, "actionPlanMade" boolean NOT NULL, "comment" boolean NOT NULL, "revisedAt" TIMESTAMP NOT NULL, "isCompleted" boolean NOT NULL, "focusAreaId" uuid, "stationId" uuid, CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_effe38c8ae54d94a801c8864473" FOREIGN KEY ("focusAreaId") REFERENCES "focus_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_1bbdc71ac9e22c4d6b005656b66" FOREIGN KEY ("stationId") REFERENCES "station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_1bbdc71ac9e22c4d6b005656b66"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_effe38c8ae54d94a801c8864473"`);
        await queryRunner.query(`DROP TABLE "report"`);
    }

}
