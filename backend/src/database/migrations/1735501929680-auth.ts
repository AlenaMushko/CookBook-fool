import { MigrationInterface, QueryRunner } from "typeorm";

export class Auth1735501929680 implements MigrationInterface {
    name = 'Auth1735501929680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dishes" RENAME COLUMN "category" TO "categoryId"`);
        await queryRunner.query(`ALTER TYPE "public"."dishes_category_enum" RENAME TO "dishes_categoryid_enum"`);
        await queryRunner.query(`CREATE TABLE "dish-categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, CONSTRAINT "PK_a609e698eede05825dd2a17de70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dishes" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "dishes" ADD "categoryId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dishes" ADD CONSTRAINT "FK_9491dfcdc274899d7c73722987b" FOREIGN KEY ("categoryId") REFERENCES "dish-categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dishes" DROP CONSTRAINT "FK_9491dfcdc274899d7c73722987b"`);
        await queryRunner.query(`ALTER TABLE "dishes" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "dishes" ADD "categoryId" "public"."dishes_categoryid_enum" NOT NULL`);
        await queryRunner.query(`DROP TABLE "dish-categories"`);
        await queryRunner.query(`ALTER TYPE "public"."dishes_categoryid_enum" RENAME TO "dishes_category_enum"`);
        await queryRunner.query(`ALTER TABLE "dishes" RENAME COLUMN "categoryId" TO "category"`);
    }

}
