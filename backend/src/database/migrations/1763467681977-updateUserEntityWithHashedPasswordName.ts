import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntityWithHashedPasswordName1763467681977 implements MigrationInterface {
    name = 'UpdateUserEntityWithHashedPasswordName1763467681977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "password" TO "hashedPassword"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "hashedPassword" TO "password"`);
    }

}
