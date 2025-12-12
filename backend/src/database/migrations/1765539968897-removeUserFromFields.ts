import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserFromFields1765539968897 implements MigrationInterface {
    name = 'RemoveUserFromFields1765539968897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_1bbdc71ac9e22c4d6b005656b66"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_5292f0b97e29085e0bb96a2fe39"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "stationId"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "reportBeganAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "stationId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hashedPassword"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "report_users_user" DROP CONSTRAINT "FK_f7c3a1b08cd856906cabd67c7d7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "report_users_user" DROP CONSTRAINT "PK_2ecd0be00a5640a370d64a478be"`);
        await queryRunner.query(`ALTER TABLE "report_users_user" ADD CONSTRAINT "PK_79c91358396d475d5e763c3d0e8" PRIMARY KEY ("reportId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f7c3a1b08cd856906cabd67c7d"`);
        await queryRunner.query(`ALTER TABLE "report_users_user" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "report_users_user" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report_users_user" DROP CONSTRAINT "PK_79c91358396d475d5e763c3d0e8"`);
        await queryRunner.query(`ALTER TABLE "report_users_user" ADD CONSTRAINT "PK_2ecd0be00a5640a370d64a478be" PRIMARY KEY ("reportId", "userId")`);
        await queryRunner.query(`CREATE INDEX "IDX_f7c3a1b08cd856906cabd67c7d" ON "report_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "report_users_user" ADD CONSTRAINT "FK_f7c3a1b08cd856906cabd67c7d7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report_users_user" DROP CONSTRAINT "FK_f7c3a1b08cd856906cabd67c7d7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f7c3a1b08cd856906cabd67c7d"`);
        await queryRunner.query(`ALTER TABLE "report_users_user" DROP CONSTRAINT "PK_2ecd0be00a5640a370d64a478be"`);
        await queryRunner.query(`ALTER TABLE "report_users_user" ADD CONSTRAINT "PK_79c91358396d475d5e763c3d0e8" PRIMARY KEY ("reportId")`);
        await queryRunner.query(`ALTER TABLE "report_users_user" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "report_users_user" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_f7c3a1b08cd856906cabd67c7d" ON "report_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "report_users_user" DROP CONSTRAINT "PK_79c91358396d475d5e763c3d0e8"`);
        await queryRunner.query(`ALTER TABLE "report_users_user" ADD CONSTRAINT "PK_2ecd0be00a5640a370d64a478be" PRIMARY KEY ("reportId", "userId")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "report_users_user" ADD CONSTRAINT "FK_f7c3a1b08cd856906cabd67c7d7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "hashedPassword" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "stationId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roleId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ADD "reportBeganAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ADD "stationId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_5292f0b97e29085e0bb96a2fe39" FOREIGN KEY ("stationId") REFERENCES "station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_1bbdc71ac9e22c4d6b005656b66" FOREIGN KEY ("stationId") REFERENCES "station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
