import { Context } from 'telegraf';

import { IMessage, MediaModel, MessageType, Location } from '@core/providers';

export class TelegramMessage implements IMessage {
    private readonly _message: Context;

    constructor(message: Context) {
        this._message = message;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async delete(everyone: boolean | undefined): Promise<void> {
        await this._message.deleteMessage();
    }

    async downloadMedia(): Promise<MediaModel> {
        // TODO: Implement downloadMedia
        return new MediaModel('image/jpeg', '', 'media');
    }

    get from(): string {
        return this._message.from.id.toString();
    }

    get to(): string {
        return this._message.me;
    }

    get body(): string {
        return this._message.text;
    }

    get timestamp(): number {
        return this._message.message.date;
    }

    get hasMedia(): boolean {
        return false;
    }

    get type(): MessageType {
        const message = this._message.message;

        if (message && 'text' in message) {
            return MessageType.TEXT;
        } else if (message && 'photo' in message) {
            return MessageType.IMAGE;
        } else if (message && 'video' in message) {
            return MessageType.VIDEO;
        } else if (message && 'audio' in message) {
            return MessageType.AUDIO;
        } else if (message && 'document' in message) {
            return MessageType.DOCUMENT;
        } else if (message && 'sticker' in message) {
            return MessageType.STICKER;
        } else if (message && 'animation' in message) {
            return MessageType.UNKNOWN;
        } else if (message && 'voice' in message) {
            return MessageType.VOICE;
        } else if (message && 'video_note' in message) {
            return MessageType.VIDEO;
        } else if (message && 'contact' in message) {
            return MessageType.CONTACT_CARD;
        } else if (message && 'location' in message) {
            return MessageType.LOCATION;
        }

        return MessageType.UNKNOWN;
    }

    get location(): Location {
        // TODO: Implement location
        return new Location(0, 0);
    }

    get mentionedIds(): [] {
        return [];
    }

    get isEphemeral(): boolean {
        return false;
    }

    get forwardingScore(): number {
        return 0;
    }

    get fromMe(): boolean {
        return this._message.from.username === this._message.me;
    }

    get links(): Array<{ link: string; isSuspicious: boolean }> {
        const text = this._message.text || '';
        const linkRegex = /(https?:\/\/[^\s]+)/g;
        const links = text.match(linkRegex) || [];

        const isSuspicious = (link: string): boolean => {
            return link.startsWith('http://');
        };

        return links.map((link) => ({
            link,
            isSuspicious: isSuspicious(link),
        }));
    }

    get isForwarded(): boolean {
        return false;
    }

    get id(): string {
        return this._message.inlineMessageId;
    }

    get rawData(): object {
        return this._message;
    }

    get vCards(): string[] {
        return [];
    }

    async getChat(): Promise<string> {
        const chat = await this._message.getChat();
        return chat.id.toString();
    }
}
