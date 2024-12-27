import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1735329828529 implements MigrationInterface {
    name = 'SecondMigration1735329828529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "dishId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."dishes_category_enum" AS ENUM('Soup', 'Main - Meat', 'Main - Fish', 'Main - Vegetarian', 'Snack - Cold', 'Snack - Hot', 'Snack - Canape', 'Salad - Vegetable', 'Salad - Meat', 'Salad - Fruit', 'Sauce - Meat', 'Sauce - Fish', 'Sauce - Salad', 'Dessert', 'Bakery - Cakes', 'Bakery - Cookies', 'Bakery - Pies', 'Drink - Alcoholic', 'Drink - Non-Alcoholic', 'Preservation - Fruit', 'Preservation - Vegetable')`);
        await queryRunner.query(`CREATE TABLE "dishes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "isConfident" boolean NOT NULL, "title" text NOT NULL, "subtitle" text, "image" text, "description" text NOT NULL, "note" text, "category" "public"."dishes_category_enum" NOT NULL, "preparationTime" TIME, "difficulty" smallint, "ingredient" jsonb NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_f4748c8e8382ad34ef517520b7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh-tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "refreshToken" text NOT NULL, "deviceId" text NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_8c3ca3e3f1ad4fb45ec6b793aa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstName" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastName" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" text`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_db2d9273f9fcc5289c9dcd627d9" FOREIGN KEY ("dishId") REFERENCES "dishes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dishes" ADD CONSTRAINT "FK_45a5930372fa85e7d33306153e5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" ADD CONSTRAINT "FK_88bd85554c3fa712cd505ec7b1b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh-tokens" DROP CONSTRAINT "FK_88bd85554c3fa712cd505ec7b1b"`);
        await queryRunner.query(`ALTER TABLE "dishes" DROP CONSTRAINT "FK_45a5930372fa85e7d33306153e5"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_db2d9273f9fcc5289c9dcd627d9"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" text NOT NULL`);
        await queryRunner.query(`DROP TABLE "refresh-tokens"`);
        await queryRunner.query(`DROP TABLE "dishes"`);
        await queryRunner.query(`DROP TYPE "public"."dishes_category_enum"`);
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
