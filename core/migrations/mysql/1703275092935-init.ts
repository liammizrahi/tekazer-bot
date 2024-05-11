import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1703275092935 implements MigrationInterface {
    name = 'Init1703275092935';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`message_record\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sender\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`conversationId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`conversation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phone\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL DEFAULT 'initial_state', \`lastMessage\` varchar(255) NULL, \`jsonData\` json NULL, \`closed\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`message_record\` ADD CONSTRAINT \`FK_936ca933a0413a6f48dd831caf9\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message_record\` DROP FOREIGN KEY \`FK_936ca933a0413a6f48dd831caf9\``);
        await queryRunner.query(`DROP TABLE \`conversation\``);
        await queryRunner.query(`DROP TABLE \`message_record\``);
    }
}
