import { Conversation } from '@core/models';
import { IClient, IMessage } from '@core/providers';

import { ConversationDao } from './dao/conversation.dao';
import { ChatState } from '../../src/domain/chat-state.enum';
import { ConversationManager } from './conversation-manager';

/**
 * Session Factory
 * This class is responsible for creating and managing the conversation session
 * @class SessionFactory
 */
export class SessionFactory {
    private readonly client: IClient;
    private readonly message: IMessage;
    private conversation: Conversation | null = null;

    constructor(client: IClient, message: IMessage) {
        this.client = client;
        this.message = message;
    }

    /**
     * Process the incoming message and handle the conversation.
     */
    async process(): Promise<void> {
        if (this.message.from.endsWith('@g.us')) return;

        this.conversation = await this.findOrCreateConversation();

        if (!this.conversation) {
            throw new Error('Failed to create or retrieve conversation.');
        }

        const conversationManager = new ConversationManager(this.conversation, this.client, this.message);

        await conversationManager.processIncomeMessage();
    }

    /**
     * Find or create a conversation for the incoming message.
     */
    private async findOrCreateConversation(): Promise<Conversation> {
        const userPhoneNumber = this.message.from;
        let conversation = await ConversationDao.findConversationsByUserPhone(userPhoneNumber);

        if (!conversation) {
            conversation = new Conversation();
            conversation.phone = userPhoneNumber;
            conversation.state = ChatState.INITIAL_STATE;
            await ConversationDao.saveConversation(conversation);
        }

        return conversation;
    }
}
