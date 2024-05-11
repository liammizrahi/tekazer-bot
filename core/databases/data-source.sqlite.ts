import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Conversation } from '../models/conversation';
import { MessageRecord } from '../models/message-record';

export const LocalDataSource = new DataSource({
    type: 'sqlite',
    database: './core/files/db.sqlite',
    synchronize: true,
    logging: false,
    entities: [Conversation, MessageRecord],
    migrations: ['./core/migrations/local/**.ts'],
    subscribers: [],
});
