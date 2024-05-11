import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Conversation } from '../models/conversation';
import { MessageRecord } from '../models/message-record';

export const MongodbDataSource = new DataSource({
    type: 'mongodb',
    url: process.env.MONGO_URL,
    synchronize: true,
    logging: false,
    entities: [Conversation, MessageRecord],
    migrations: ['./core/migrations/mongodb/**.ts'],
    subscribers: [],
});
