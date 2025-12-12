import { MigrationInterface, QueryRunner } from "typeorm";

export class SetUserIdToKeyCloakUserSub1765548177751 implements MigrationInterface {
    name = 'SetUserIdToKeyCloakUserSub1765548177751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" ADD "userId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "userId"`);
    }

}
