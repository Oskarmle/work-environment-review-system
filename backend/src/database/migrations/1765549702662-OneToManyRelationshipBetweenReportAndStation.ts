import { MigrationInterface, QueryRunner } from "typeorm";

export class OneToManyRelationshipBetweenReportAndStation1765549702662 implements MigrationInterface {
    name = 'OneToManyRelationshipBetweenReportAndStation1765549702662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" ADD "stationId" uuid`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_1bbdc71ac9e22c4d6b005656b66" FOREIGN KEY ("stationId") REFERENCES "station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_1bbdc71ac9e22c4d6b005656b66"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "stationId"`);
    }

}
