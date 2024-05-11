import axios from 'axios';

import { Client, MessageMedia } from 'whatsapp-web.js';
import { IClient } from '../interface/client.interface';
import { MediaModel } from '../domain-model/media.model';

export class WhatsAppClient implements IClient {
    private readonly client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async setDisplayName(displayName: string): Promise<void> {
        await this.client.setDisplayName(displayName);
    }

    /**
     * Send a message to a specific number
     * @param to
     * @param message
     */
    async sendMessage(to: string, message: string): Promise<void> {
        await this.client.sendMessage(to, message);
    }

    /**
     * Send a media message to a specific number by URL
     * @param to
     * @param url
     */
    async sendMediaByUrl(to: string, url: string): Promise<void> {
        let mimetype;
        const attachment = await axios
            .get(url, {
                responseType: 'arraybuffer',
            })
            .then((response) => {
                mimetype = response.headers['content-type'];
                return response.data.toString('base64');
            });

        const mediaModel = new MediaModel(mimetype, attachment, 'Media');

        await this.sendMedia(to, mediaModel);
    }

    /**
     * Send a media message to a specific number by data
     * @param to
     * @param media
     */
    async sendMedia(to: string, media: MediaModel): Promise<void> {
        await this.client.sendMessage(to, new MessageMedia(media.mimeType, media.data, media.filename));
    }

    /**
     * Get the core client
     */
    getCoreClient(): any {
        return this.client;
    }
}
