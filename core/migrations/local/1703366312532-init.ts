import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1703366312532 implements MigrationInterface {
    name = 'Init1703366312532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message_record" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sender" varchar NOT NULL, "content" text NOT NULL, "conversationId" integer)`);
        await queryRunner.query(`CREATE TABLE "conversation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "phone" text NOT NULL, "state" varchar NOT NULL DEFAULT ('initial_state'), "lastMessage" varchar, "jsonData" json, "closed" boolean NOT NULL DEFAULT (0))`);
        await queryRunner.query(`CREATE TABLE "temporary_message_record" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sender" varchar NOT NULL, "content" text NOT NULL, "conversationId" integer, CONSTRAINT "FK_936ca933a0413a6f48dd831caf9" FOREIGN KEY ("conversationId") REFERENCES "conversation" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_message_record"("id", "sender", "content", "conversationId") SELECT "id", "sender", "content", "conversationId" FROM "message_record"`);
        await queryRunner.query(`DROP TABLE "message_record"`);
        await queryRunner.query(`ALTER TABLE "temporary_message_record" RENAME TO "message_record"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message_record" RENAME TO "temporary_message_record"`);
        await queryRunner.query(`CREATE TABLE "message_record" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sender" varchar NOT NULL, "content" text NOT NULL, "conversationId" integer)`);
        await queryRunner.query(`INSERT INTO "message_record"("id", "sender", "content", "conversationId") SELECT "id", "sender", "content", "conversationId" FROM "temporary_message_record"`);
        await queryRunner.query(`DROP TABLE "temporary_message_record"`);
        await queryRunner.query(`DROP TABLE "conversation"`);
        await queryRunner.query(`DROP TABLE "message_record"`);
    }

}
