import { Bot, WhatsAppBot } from '@core/bot';
import { bootstrap } from './bootstrap';
import { server } from './server';

async function main() {
    await bootstrap();

    const clients: Bot[] = [new WhatsAppBot('WhatsApp', server)];

    for (const client of clients) {
        await client.initialize();
    }
}

main();
