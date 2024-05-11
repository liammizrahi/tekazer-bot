import * as dotenv from 'dotenv';

import { AppDataSource } from '@core/data-source';
import { server } from './server';

export async function bootstrap() {
    dotenv.config();

    await AppDataSource.initialize();

    await server.initialize();
}
