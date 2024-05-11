import { MigrationInterface, QueryRunner } from 'typeorm';

export class LongMessage1703295796059 implements MigrationInterface {
    name = 'LongMessage1703295796059';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message_record\` DROP FOREIGN KEY \`FK_936ca933a0413a6f48dd831caf9\``);
        await queryRunner.query(`ALTER TABLE \`message_record\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`message_record\` ADD \`content\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`message_record\` CHANGE \`conversationId\` \`conversationId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`conversation\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`conversation\` ADD \`phone\` text NOT NULL`);
        await queryRunner.query(
            `ALTER TABLE \`conversation\` CHANGE \`lastMessage\` \`lastMessage\` varchar(255) NULL`,
        );
        await queryRunner.query(`ALTER TABLE \`conversation\` DROP COLUMN \`jsonData\``);
        await queryRunner.query(`ALTER TABLE \`conversation\` ADD \`jsonData\` json NULL`);
        await queryRunner.query(
            `ALTER TABLE \`message_record\` ADD CONSTRAINT \`FK_936ca933a0413a6f48dd831caf9\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message_record\` DROP FOREIGN KEY \`FK_936ca933a0413a6f48dd831caf9\``);
        await queryRunner.query(`ALTER TABLE \`conversation\` DROP COLUMN \`jsonData\``);
        await queryRunner.query(
            `ALTER TABLE \`conversation\` ADD \`jsonData\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(
            `ALTER TABLE \`conversation\` CHANGE \`lastMessage\` \`lastMessage\` varchar(255) NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(`ALTER TABLE \`conversation\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`conversation\` ADD \`phone\` varchar(255) NOT NULL`);
        await queryRunner.query(
            `ALTER TABLE \`message_record\` CHANGE \`conversationId\` \`conversationId\` int NULL DEFAULT 'NULL'`,
        );
        await queryRunner.query(`ALTER TABLE \`message_record\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`message_record\` ADD \`content\` varchar(255) NOT NULL`);
        await queryRunner.query(
            `ALTER TABLE \`message_record\` ADD CONSTRAINT \`FK_936ca933a0413a6f48dd831caf9\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
