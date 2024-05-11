import { Message, MessageTypes } from 'whatsapp-web.js';
import { IMessage, MessageType, Location, MediaModel } from '@core/providers';

export class WhatsAppMessage implements IMessage {
    private readonly _message: Message;

    constructor(message: Message) {
        this._message = message;
    }

    async delete(everyone: boolean | undefined): Promise<void> {
        await this._message.delete(everyone);
    }

    async downloadMedia(): Promise<MediaModel> {
        const media = await this._message.downloadMedia();
        return new MediaModel(media.mimetype, media.data, media.filename);
    }

    get from(): string {
        return this._message.from;
    }

    get to(): string {
        return this._message.to;
    }

    get body(): string {
        return this._message.body;
    }

    get timestamp(): number {
        return this._message.timestamp;
    }

    get hasMedia(): boolean {
        return this._message.hasMedia;
    }

    get location(): Location {
        return new Location(Number(this._message.location.latitude), Number(this._message.location.longitude));
    }

    get mentionedIds(): [] {
        return this._message.mentionedIds;
    }

    get isEphemeral(): boolean {
        return this._message.isEphemeral;
    }

    get forwardingScore(): number {
        return this._message.forwardingScore;
    }

    get fromMe(): boolean {
        return this._message.fromMe;
    }

    get links(): Array<{ link: string; isSuspicious: boolean }> {
        return this._message.links;
    }

    get isForwarded(): boolean {
        return this._message.isForwarded;
    }

    get id(): string {
        return this._message.id.id;
    }

    get rawData(): object {
        return this._message;
    }

    get vCards(): string[] {
        return this._message.vCards;
    }

    async getChat(): Promise<string> {
        const chat = await this._message.getChat();
        return chat.id._serialized;
    }

    get type(): MessageType {
        // Not sure if this is the best way to do this
        // return MessageType[this._message.type.toLowerCase() as keyof typeof MessageTypes] || MessageType.UNKNOWN;

        switch (this._message.type) {
            case 'chat':
                return MessageType.TEXT;
            case 'image':
                return MessageType.IMAGE;
            case 'video':
                return MessageType.VIDEO;
            case 'audio':
                return MessageType.AUDIO;
            case 'document':
                return MessageType.DOCUMENT;
            case 'sticker':
                return MessageType.STICKER;
            case 'location':
                return MessageType.LOCATION;
            case 'ptt':
                return MessageType.VOICE;
            case 'vcard':
                return MessageType.CONTACT_CARD;
            case 'multi_vcard':
                return MessageType.CONTACT_CARD_MULTI;
            case 'revoked':
                return MessageType.REVOKED;
            case 'groups_v4_invite':
                return MessageType.GROUP_INVITE;
            case 'list':
                return MessageType.LIST;
            case 'list_response':
                return MessageType.LIST_RESPONSE;
            case 'buttons_response':
                return MessageType.BUTTONS_RESPONSE;
            case 'broadcast_notification':
                return MessageType.BROADCAST_NOTIFICATION;
            case 'call_log':
                return MessageType.CALL_LOG;
            case 'ciphertext':
                return MessageType.CIPHERTEXT;
            case 'debug':
                return MessageType.DEBUG;
            case 'e2e_notification':
                return MessageType.E2E_NOTIFICATION;
            case 'gp2':
                return MessageType.GP2;
            case 'group_notification':
                return MessageType.GROUP_NOTIFICATION;
            case 'hsm':
                return MessageType.HSM;
            case 'interactive':
                return MessageType.INTERACTIVE;
            case 'native_flow':
                return MessageType.NATIVE_FLOW;
            case 'notification':
                return MessageType.NOTIFICATION;
            case 'notification_template':
                return MessageType.NOTIFICATION_TEMPLATE;
            case 'oversized':
                return MessageType.OVERSIZED;
            case 'protocol':
                return MessageType.PROTOCOL;
            case 'reaction':
                return MessageType.REACTION;
            case 'template_button_reply':
                return MessageType.TEMPLATE_BUTTON_REPLY;
            case 'poll_creation':
                return MessageType.POLL_CREATION;

            default:
                return MessageType.UNKNOWN;
        }
    }
}
