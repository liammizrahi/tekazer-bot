import { Telegraf, Context } from 'telegraf';
import { TelegramClient, TelegramMessage } from '@core/providers';
import { SessionFactory } from '@core/conversation';
import { Bot } from './bot';
import { Webserver } from '@core/webserver';

/**
 * Telegram Bot
 * This class is responsible for handling the Telegram bot
 * @class TelegramBot
 */
export class TelegramBot extends Bot {
    private readonly client: Telegraf;

    constructor(name: string, webserver: Webserver) {
        super(name, webserver);

        this.client = new Telegraf(process.env.BOT_TOKEN || '');
    }

    /**
     * Initialize the bot
     * @returns {Promise<void>}
     */
    async initialize(): Promise<void> {
        console.log('Initializing Telegram Bot');
        this.setupListeners();
        await this.launchBot();
    }

    /**
     * Set up the listeners
     * @private
     */
    private setupListeners() {
        this.client.start(this.handleMessage.bind(this));
        this.client.on('message', this.handleMessage.bind(this));
    }

    /**
     * Handle the start of a chat
     * @param context
     * @private
     */
    private handleStart(context: Context) {
        /**
         * You can handle the start of a chat here
         * when the user sends /start
         */
        console.log('Chat started with user: ', context.from?.id);
    }

    /**
     * Handle any income message
     * @param context
     * @private
     */
    private async handleMessage(context: Context) {
        const client = this.instantiateTelegramClient();
        const message = this.instantiateMessage(context);

        const session = new SessionFactory(client, message);
        await session.process();
    }

    /**
     * Instantiate the WhatsApp client
     * @private
     * @returns {TelegramClient}
     */
    private instantiateTelegramClient(): TelegramClient {
        return new TelegramClient(this.client.telegram);
    }

    /**
     * Instantiate the message factory
     * @private
     * @param message
     * @returns {TelegramMessage}
     */
    private instantiateMessage(message: Context): TelegramMessage {
        return new TelegramMessage(message);
    }

    /**
     * Set up the web server
     * @private
     */
    private async launchBot() {
        await this.client.launch();
    }
}
