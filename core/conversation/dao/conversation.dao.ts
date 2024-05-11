import { Repository } from 'typeorm';

import { AppDataSource } from '@core/data-source';
import { Conversation, MessageRecord } from '@core/models';
import { IMessage } from '@core/providers';

/**
 * Data access object for the conversation
 * This class is responsible for all the database operations related to the conversation
 * @class ConversationDao
 */
export class ConversationDao {
    private static dataSource = AppDataSource;
    private static conversationRepository: Repository<Conversation> = this.dataSource.getRepository(Conversation);

    /**
     * Change the state of the conversation
     * @param conversation
     * @param newState
     */
    static async changeState(conversation: Conversation, newState: string): Promise<void> {
        conversation.state = newState;
        await this.saveConversation(conversation);
    }

    /**
     * Close the conversation
     * @param conversation
     */
    static async closeConversation(conversation: Conversation): Promise<void> {
        conversation.closed = true;
        await this.saveConversation(conversation);
    }

    /**
     * Update the last message of the conversation
     * @param conversation
     * @param newMessage
     */
    static async updateLastMessage(conversation: Conversation, newMessage: string): Promise<void> {
        conversation.lastMessage = newMessage;
        await this.saveConversation(conversation);
    }

    /**
     * Record the message in the database
     * @param conversation
     * @param message
     */
    static async recordMessage(conversation: Conversation, message: IMessage): Promise<void> {
        const messageRecord = new MessageRecord();
        messageRecord.sender = message.from;
        messageRecord.content = message.body;
        messageRecord.conversation = conversation;

        await this.dataSource.getRepository(MessageRecord).save(messageRecord);
    }

    /**
     * Save the conversation
     * @param conversation
     */
    static async saveConversation(conversation: Conversation): Promise<void> {
        await this.conversationRepository.save(conversation);
    }

    /**
     * Set a setting for the conversation
     * @param conversation
     * @param key
     * @param value
     */
    static async setSetting(conversation: Conversation, key: string, value: any): Promise<void> {
        if (!conversation.jsonData) {
            conversation.jsonData = {};
        }
        conversation.jsonData[key] = value;
        await this.saveConversation(conversation);
    }

    /**
     * Get a setting for the conversation
     * @param conversation
     * @param key
     */
    static async getSetting(conversation: Conversation, key: string): Promise<any> {
        if (!conversation?.jsonData?.[key]) {
            return null;
        }

        return conversation.jsonData[key];
    }

    /**
     * Get all the settings for the conversation
     * @param conversation
     */
    static async getAllSettings(conversation: Conversation): Promise<Record<string, any>> {
        return conversation.jsonData;
    }

    /**
     * Get all the messages of the conversation
     * @param conversation
     */
    static async getAllMessages(conversation: Conversation): Promise<MessageRecord[]> {
        return this.dataSource.getRepository(MessageRecord).find({
            where: {
                conversation: conversation,
            },
        });
    }

    static async findConversationsByUserPhone(
        userPhoneNumber: string,
        closed: boolean = false,
    ): Promise<Conversation | null> {
        return this.conversationRepository.findOneBy({
            phone: userPhoneNumber,
            closed: closed,
        });
    }
}
