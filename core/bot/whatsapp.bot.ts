import * as os from 'os';
import { Client, LocalAuth, Message } from 'whatsapp-web.js';

import { SessionFactory } from '@core/conversation';
import { WhatsAppClient, WhatsAppMessage } from '@core/providers';
import { Webserver } from '@core/webserver';
import { CountryUtil } from '../../src/utils/country.util';
import { Bot } from './bot';

/**
 * WhatsApp Bot
 * This class is responsible for handling the WhatsApp bot
 * @class WhatsAppBot
 */
export class WhatsAppBot extends Bot {
    private readonly client: Client;

    constructor(name: string, webserver: Webserver) {
        super(name, webserver);

        this.client = new Client({
            authStrategy: new LocalAuth({ clientId: this.name }),
            puppeteer: this.puppeteerConfig(),
            webVersionCache: {
                type: 'remote',
                remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
            },
        });
    }

    /**
     * Puppeteer Configuration based on the OS
     * @private
     */
    private puppeteerConfig() {
        const isLinux = os.platform() === 'linux';
        const isArm = os.arch() === 'arm' || os.arch().startsWith('arm');

        if (isLinux && isArm) {
            return {
                executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || '/usr/bin/chromium-browser',
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            };
        }

        return {
            args: ['--no-sandbox'],
        };
    }

    /**
     * Initialize the bot
     * @returns {Promise<void>}
     */
    async initialize(): Promise<void> {
        console.log('Initializing WhatsApp Bot');

        this.setupListeners();
        this.client.initialize();
    }

    /**
     * Set up the listeners
     * @private
     */
    private setupListeners() {
        this.client.on('qr', this.handleQRCode.bind(this));
        this.client.on('message', this.handleMessage.bind(this));
        this.client.on('ready', this.handleClientReady.bind(this));
    }

    /**
     * Handle the QR code event
     * @param qrCode
     * @private
     */
    private handleQRCode(qrCode: string) {
        const localIPv4 = Object.values(os.networkInterfaces())
            .flat()
            .find((iface) => !iface.internal && iface.family === 'IPv4')?.address;

        try {
            this.webserver.insertConnectionRequest(this.name, qrCode);
            console.log(
                `Qr Code Received. Visit http://${localIPv4}:${process.env.PORT || ''}/connect/${
                    this.name
                } to authenticate. `,
            );
        } catch (e: any) {
            console.error(e);
        }
    }

    /**
     * Handle the client ready event
     * @private
     */
    private handleClientReady() {
        console.log('Client is ready!');

        this.webserver.removeConnectionRequest(this.name);
        const clientInfo = this.client.info;
        this.client.getCountryCode(clientInfo.wid._serialized).then((countryCode) => {
            console.log(
                '--------------------',
                '\nClient Info:',
                '\nDisplay Name:',
                clientInfo.pushname,
                `\nCountry:`,
                `${CountryUtil.getNameByTelephone(countryCode)} ${CountryUtil.getEmojiByTelephone(countryCode)}`,
                '\nClient Phone:',
                clientInfo.wid.user,
                '\n--------------------',
            );
        });

        this.instantiateWhatsAppClient();
    }

    /**
     * Handle any income message
     * @param message
     * @private
     */
    private async handleMessage(message: Message) {
        const client = this.instantiateWhatsAppClient();
        const whatsappMessage = this.instantiateMessage(message);

        const session = new SessionFactory(client, whatsappMessage);
        await session.process();
    }

    /**
     * Instantiate the WhatsApp client
     * @private
     * @returns {WhatsAppClient}
     */
    private instantiateWhatsAppClient(): WhatsAppClient {
        return new WhatsAppClient(this.client);
    }

    /**
     * Instantiate the message factory
     * @private
     * @param message
     * @returns {WhatsAppMessage}
     */
    private instantiateMessage(message: Message): WhatsAppMessage {
        return new WhatsAppMessage(message);
    }
}
