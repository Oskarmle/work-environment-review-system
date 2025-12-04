import { MigrationInterface, QueryRunner } from "typeorm";

export class SaveImageInDB1764849094329 implements MigrationInterface {
    name = 'SaveImageInDB1764849094329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_field_response" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "section_field_response" ADD "imageData" bytea`);
        await queryRunner.query(`ALTER TABLE "section_field_response" ADD "imageMimeType" character varying`);
        await queryRunner.query(`ALTER TABLE "section_field_response" ADD "imageFileName" character varying`);
        await queryRunner.query(`ALTER TABLE "section_field_response" ADD "imageSize" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section_field_response" DROP COLUMN "imageSize"`);
        await queryRunner.query(`ALTER TABLE "section_field_response" DROP COLUMN "imageFileName"`);
        await queryRunner.query(`ALTER TABLE "section_field_response" DROP COLUMN "imageMimeType"`);
        await queryRunner.query(`ALTER TABLE "section_field_response" DROP COLUMN "imageData"`);
        await queryRunner.query(`ALTER TABLE "section_field_response" ADD "imageUrl" character varying`);
    }

}
