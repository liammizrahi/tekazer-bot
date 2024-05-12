import { Conversation, MessageRecord } from '@core/models';
import { IClient, IMessage, MediaModel } from '@core/providers';
import { TempFile } from '@core/common';

import { ConversationDao } from './dao/conversation.dao';
import { MessageHandler } from './message-handler.interface';
import { StateHandlerUtil } from './utils/state-handler.util';

/**
 * Conversation Manager
 * This class is responsible for managing the conversation
 * @class ConversationManager
 */
export class ConversationManager {
    private readonly _conversation: Conversation | null = null;
    private readonly _client: IClient;
    private readonly _message: IMessage;

    constructor(conversation: Conversation, client: IClient, message: IMessage) {
        this._conversation = conversation;
        this._client = client;
        this._message = message;
    }

    /**
     * Close the conversation
     */
    async closeConversation(): Promise<void> {
        if (!this._conversation) {
            return;
        }

        await ConversationDao.closeConversation(this._conversation);

        if (this.client.leaveChat) {
            await this.client.leaveChat();
        }
    }

    /**
     * Update the last message of the conversation
     * @param newMessage
     */
    async updateLastMessage(newMessage: string): Promise<void> {
        if (!this._conversation) {
            return;
        }

        await ConversationDao.updateLastMessage(this._conversation, newMessage);
    }

    /**
     * Record the message in the database
     */
    async recordMessage(): Promise<void> {
        if (!this._conversation) {
            return;
        }

        await ConversationDao.recordMessage(this._conversation, this._message);
    }

    /**
     * Set a setting for the conversation
     * @param key
     * @param value
     */
    async setSetting(key: string, value: any): Promise<void> {
        if (!this._conversation) {
            return;
        }

        await ConversationDao.setSetting(this._conversation, key, value);
    }

    /**
     * Get a setting for the conversation
     * @param key
     */
    async getSetting(key: string): Promise<any | null> {
        if (!this._conversation) {
            return null;
        }

        return await ConversationDao.getSetting(this._conversation, key);
    }

    /**
     * Get all settings for the conversation
     */
    async getAllSettings(): Promise<Record<string, any>> {
        if (!this._conversation) {
            return null;
        }

        return await ConversationDao.getAllSettings(this._conversation);
    }

    /**
     * Get all messages of the conversation
     */
    async getAllMessages(): Promise<MessageRecord[]> {
        if (!this._conversation) {
            return null;
        }

        return await ConversationDao.getAllMessages(this._conversation);
    }

    /**
     * Change the state of the conversation
     * @param newState
     */
    async changeState(newState: string): Promise<void> {
        if (!this._conversation) {
            return;
        }

        const handler: MessageHandler = StateHandlerUtil.getByState(newState);

        if (!handler) {
            if (process.env.APP_ENV !== 'production') {
                await this.sendMessage('`Error: Invalid state.`');
            }
            await this.closeConversation();
            return;
        }

        await ConversationDao.changeState(this._conversation, newState);

        if (handler.onEnterState) {
            await handler.onEnterState(this);
        }
    }

    /**
     * Send a message to the user
     * @param message
     */
    async sendMessage(message: string): Promise<void> {
        if (!this._conversation) {
            return;
        }

        await this.client.sendMessage(this._message.from, message);
    }

    /**
     * Send media by url
     * @param url
     */
    async sendMediaByUrl(url: string): Promise<void> {
        if (!this._conversation) {
            return;
        }

        await this.client.sendMediaByUrl(this._message.from, url);
    }

    /**
     * Send media by data
     * @param media
     */
    async sendMedia(media: MediaModel): Promise<void> {
        if (!this._conversation) {
            return;
        }

        await this.client.sendMedia(this._message.from, media);
    }

    /**
     * Process the income message
     */
    async processIncomeMessage(): Promise<void> {
        const state = this._conversation.state;

        const handler: MessageHandler = StateHandlerUtil.getByState(state);

        if (!handler) {
            if (process.env.APP_ENV !== 'production') {
                await this.sendMessage('`Error: Invalid state.`');
            }
            await this.closeConversation();
            return;
        }

        if (this._message.hasMedia && !handler.canProcessMedia) {
            return;
        }

        await this.updateLastMessage(this._message.body);
        await this.recordMessage();

        await handler.handleMessage(this);
    }

    /**
     * Download the media from the message
     * @deprecated
     */
    async downloadMediaToDisk(): Promise<void> {
        // try {
        //     const mediaBuffer = await this.message.downloadMedia();
        //     const storageService = new StorageService();
        //     await storageService.uploadToStorage(mediaBuffer);
        // } catch (error: any) {
        //     console.error('Error downloading media:', error.message);
        // }
    }

    /**
     * Download the media to a temp file
     */
    async downloadMediaToTempFile(): Promise<TempFile> {
        const media = await this.message.downloadMedia();
        return new TempFile(Buffer.from(media.data), media.mimeType);
    }

    get client(): IClient {
        return this._client;
    }

    get message(): IMessage {
        return this._message;
    }
}
