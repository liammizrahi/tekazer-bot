import axios from 'axios';
import { Telegram } from 'telegraf';
import { IClient, MediaModel } from '@core/providers';
import { TempFile } from '@core/common';

export class TelegramClient implements IClient {
    private readonly client: Telegram;

    constructor(client: Telegram) {
        this.client = client;
    }

    getCoreClient(): any {
        return this.client;
    }

    async sendMedia(to: string, media: MediaModel): Promise<void> {
        const tempFile = new TempFile(Buffer.from(media.data, 'base64'), media.mimeType);

        const source = {
            source: tempFile.getFilePath(),
        };

        if (media.mimeType.startsWith('image/')) {
            await this.client.sendPhoto(to, source);
        } else if (media.mimeType.startsWith('video/')) {
            await this.client.sendVideo(to, source);
        } else if (media.mimeType.startsWith('audio/')) {
            await this.client.sendAudio(to, source);
        } else {
            await this.client.sendDocument(to, source);
        }

        tempFile.done();
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
     * Send a message to a specific number
     * @param to
     * @param message
     */
    async sendMessage(to: string, message: string): Promise<void> {
        await this.client.sendMessage(to, message);
    }
}
