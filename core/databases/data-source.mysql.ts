import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Conversation } from '../models/conversation';
import { MessageRecord } from '../models/message-record';

export const MySqlDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'whatsappbot',
    synchronize: true,
    logging: false,
    entities: [Conversation, MessageRecord],
    migrations: ['./core/migrations/mysql/**.ts'],
    subscribers: [],
});
