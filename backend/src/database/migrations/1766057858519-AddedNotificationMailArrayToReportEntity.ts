import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNotificationMailArrayToReportEntity1766057858519 implements MigrationInterface {
    name = 'AddedNotificationMailArrayToReportEntity1766057858519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" ADD "notificationEmails" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "notificationEmails"`);
    }

}
